// lib/api.js — football-data.org v4
// IMPORTANTE: Usar process.env (no import.meta.env) porque este archivo
// se ejecuta en runtime del servidor (SSR/serverless), no en build time.

export const BASE = 'https://api.football-data.org/v4';

export function getHeaders() {
  // process.env funciona tanto en local como en Vercel serverless
  const key = process.env.FOOTBALL_API_KEY;
  if (!key) console.warn('[API] FOOTBALL_API_KEY no definida en las variables de entorno');
  return { 'X-Auth-Token': key ?? '' };
}

export const wait = (ms) => new Promise(res => setTimeout(res, ms));

export function getDateOffset(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export async function apiFetch(path) {
  const url = `${BASE}${path}`;
  let r, json;

  try {
    r    = await fetch(url, { headers: getHeaders() });
    json = await r.json();
  } catch(e) {
    throw new Error(`Error de red: ${e.message}`);
  }

  console.log(`[API] ${path} → HTTP ${r.status}`);

  if (r.status === 429) throw new Error('Rate limit alcanzado (10 req/min).');
  if (r.status === 403) throw new Error('Sin acceso. Verifica FOOTBALL_API_KEY en Vercel → Settings → Environment Variables.');
  if (!r.ok)            throw new Error(json?.message ?? `Error HTTP ${r.status}`);

  return json ?? {};
}
