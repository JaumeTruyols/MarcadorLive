// lib/cache.js — Solo memoria en Vercel, memoria+archivo en local
// Sin imports de node:fs a nivel de módulo (crash en Vercel serverless)

const IS_VERCEL = !!process.env.VERCEL;

// ── Memoria (globalThis persiste entre requests en la misma instancia) ───────
if (!globalThis.__futbolCache) globalThis.__futbolCache = new Map();
const mem = globalThis.__futbolCache;

// ── Archivo local (fs se importa solo si estamos en local) ───────────────────
async function initFileCache() {
  if (IS_VERCEL || globalThis.__futbolCacheLoaded) return;
  globalThis.__futbolCacheLoaded = true;
  try {
    const { default: fs }   = await import('node:fs');
    const { default: path } = await import('node:path');
    const dir  = path.join(process.cwd(), '.cache');
    const file = path.join(dir, 'futbol.json');
    globalThis.__futbolCacheFile = file;
    globalThis.__futbolCacheFs   = fs;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(file)) {
      const entries = JSON.parse(fs.readFileSync(file, 'utf-8'));
      let n = 0;
      for (const [k, v] of Object.entries(entries)) {
        if (Date.now() < v.expiresAt) { mem.set(k, v); n++; }
      }
      if (n) console.log(`[CACHE] Archivo: ${n} entradas cargadas`);
    }
  } catch(e) {
    console.warn('[CACHE] Sin caché de archivo:', e.message);
  }
}

function persistFile() {
  if (IS_VERCEL || !globalThis.__futbolCacheFs) return;
  try {
    const obj = {};
    for (const [k, v] of mem.entries()) obj[k] = v;
    globalThis.__futbolCacheFs.writeFileSync(
      globalThis.__futbolCacheFile,
      JSON.stringify(obj),
      'utf-8'
    );
  } catch {}
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
  if (!IS_VERCEL && ttlSeconds >= 60) persistFile();
}

export async function cached(key, fetchFn, ttlSeconds = 60) {
  // Inicializar archivo la primera vez (solo en local, no bloquea en Vercel)
  await initFileCache();

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
