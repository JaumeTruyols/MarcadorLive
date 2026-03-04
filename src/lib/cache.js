// lib/cache.js — Caché inteligente con detección de entorno
//
// EN LOCAL (npm run dev):
//   Capa 1 → Memoria (globalThis) — ultra rápida
//   Capa 2 → Archivo .cache/futbol.json — persiste entre reinicios del servidor
//
// EN VERCEL (producción serverless):
//   Solo Capa 1 → Memoria — cada función serverless tiene su propia memoria,
//   no hay disco compartido entre instancias. El caché vive mientras la función
//   esté "caliente" (unos minutos tras el último acceso).
//
// En ambos casos el comportamiento es transparente: llamas a cached() igual.

// ── Detectar si estamos en Vercel ───────────────────────────────────────────
const IS_VERCEL  = !!process.env.VERCEL;
const IS_PROD    = process.env.NODE_ENV === 'production';
const USE_FILE   = !IS_VERCEL && !IS_PROD; // solo usamos archivo en local

// ── Capa 1: Memoria (globalThis) ────────────────────────────────────────────
if (!globalThis.__futbolCache) globalThis.__futbolCache = new Map();
const memStore = globalThis.__futbolCache;

// ── Capa 2: Archivo JSON (solo en local) ────────────────────────────────────
let fileStore = {};

if (USE_FILE) {
  // Importamos fs de forma dinámica para que Vercel no intente compilarlo
  try {
    const { readFileSync, writeFileSync, mkdirSync, existsSync } = await import('node:fs');
    const { join } = await import('node:path');

    const CACHE_DIR  = join(process.cwd(), '.cache');
    const CACHE_FILE = join(CACHE_DIR, 'futbol.json');

    // Guardamos las referencias para usarlas en cacheSet
    globalThis.__futbolCacheFs = { readFileSync, writeFileSync, mkdirSync, existsSync, CACHE_DIR, CACHE_FILE };

    if (!globalThis.__futbolCacheLoaded) {
      globalThis.__futbolCacheLoaded = true;
      if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
      if (existsSync(CACHE_FILE)) {
        try {
          fileStore = JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
          // Cargar entradas válidas en memoria
          let loaded = 0;
          for (const [k, v] of Object.entries(fileStore)) {
            if (Date.now() < v.expiresAt) {
              memStore.set(k, v);
              loaded++;
            }
          }
          console.log(`[CACHE] Archivo cargado: ${loaded} entradas vigentes`);
        } catch { fileStore = {}; }
      }
    }

    if (!globalThis.__futbolFileStore) globalThis.__futbolFileStore = fileStore;
    fileStore = globalThis.__futbolFileStore;

  } catch(e) {
    console.warn('[CACHE] No se pudo inicializar caché de archivo:', e.message);
  }
}

function persistFile() {
  if (!USE_FILE || !globalThis.__futbolCacheFs) return;
  try {
    const { writeFileSync, CACHE_FILE } = globalThis.__futbolCacheFs;
    writeFileSync(CACHE_FILE, JSON.stringify(globalThis.__futbolFileStore ?? {}), 'utf-8');
  } catch(e) {
    console.warn('[CACHE] Error escribiendo en disco:', e.message);
  }
}

// ── API pública ──────────────────────────────────────────────────────────────

export function cacheGet(key) {
  const mem = memStore.get(key);
  if (mem) {
    if (Date.now() < mem.expiresAt) return mem.data;
    memStore.delete(key);
  }

  // En local: intentar desde archivo
  if (USE_FILE && globalThis.__futbolFileStore) {
    const file = globalThis.__futbolFileStore[key];
    if (file && Date.now() < file.expiresAt) {
      memStore.set(key, file); // promover a memoria
      return file.data;
    }
    if (file) delete globalThis.__futbolFileStore[key];
  }

  return null;
}

export function cacheSet(key, data, ttlSeconds = 60) {
  const entry = { data, expiresAt: Date.now() + ttlSeconds * 1000 };
  memStore.set(key, entry);

  if (USE_FILE && ttlSeconds >= 60 && globalThis.__futbolFileStore) {
    globalThis.__futbolFileStore[key] = entry;
    persistFile();
  }
}

export async function cached(key, fetchFn, ttlSeconds = 60) {
  const hit = cacheGet(key);
  if (hit !== null) {
    console.log(`[CACHE] HIT  ${key}`);
    return hit;
  }
  console.log(`[CACHE] MISS ${key}${IS_VERCEL ? ' [Vercel]' : ''} — llamando API`);
  const data = await fetchFn();
  cacheSet(key, data, ttlSeconds);
  return data;
}

// ── TTLs en segundos ─────────────────────────────────────────────────────────
export const TTL = {
  LIVE:      30,
  TODAY:     120,
  PAST:      3600,
  STANDINGS: 3600,
  PLAYERS:   86400,
};
