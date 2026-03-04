// lib/cache.js — Caché en memoria + archivo (solo local)
//
// EN LOCAL:   memoria + .cache/futbol.json
// EN VERCEL:  solo memoria (sin disco)
//
// Sin top-level await ni import() dinámico para máxima compatibilidad.

import fs   from 'node:fs';
import path from 'node:path';

const IS_VERCEL = !!process.env.VERCEL;
const USE_FILE  = !IS_VERCEL;
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE= path.join(CACHE_DIR, 'futbol.json');

// ── Memoria ──────────────────────────────────────────────────────────────────
if (!globalThis.__futbolCache) globalThis.__futbolCache = new Map();
const mem = globalThis.__futbolCache;

// ── Inicializar archivo (solo local, una sola vez) ───────────────────────────
if (USE_FILE && !globalThis.__futbolCacheLoaded) {
  globalThis.__futbolCacheLoaded = true;
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    if (fs.existsSync(CACHE_FILE)) {
      const entries = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      let n = 0;
      for (const [k, v] of Object.entries(entries)) {
        if (Date.now() < v.expiresAt) { mem.set(k, v); n++; }
      }
      if (n) console.log(`[CACHE] Archivo: ${n} entradas cargadas`);
    }
  } catch(e) {
    console.warn('[CACHE] No se pudo leer el archivo:', e.message);
  }
}

function persistFile() {
  if (!USE_FILE) return;
  try {
    const obj = {};
    for (const [k, v] of mem.entries()) obj[k] = v;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj), 'utf-8');
  } catch(e) {
    console.warn('[CACHE] Error escribiendo en disco:', e.message);
  }
}

// ── API pública ──────────────────────────────────────────────────────────────

export function cacheGet(key) {
  const entry = mem.get(key);
  if (!entry) return null;
  if (Date.now() < entry.expiresAt) return entry.data;
  mem.delete(key);
  return null;
}

export function cacheSet(key, data, ttlSeconds = 60) {
  const entry = { data, expiresAt: Date.now() + ttlSeconds * 1000 };
  mem.set(key, entry);
  if (USE_FILE && ttlSeconds >= 60) persistFile();
}

export async function cached(key, fetchFn, ttlSeconds = 60) {
  const hit = cacheGet(key);
  if (hit !== null) {
    console.log(`[CACHE] HIT  ${key}`);
    return hit;
  }
  console.log(`[CACHE] MISS ${key}${IS_VERCEL ? ' [vercel]' : ''}`);
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
