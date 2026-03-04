// lib/api.js — football-data.org v4
// Docs: https://www.football-data.org/documentation/api
// Auth: header X-Auth-Token
// Rate limit FREE: 10 req/min, SIN límite diario ✅

export const BASE     = 'https://api.football-data.org/v4';
export const API_HOST = 'api.football-data.org';

export function getHeaders() {
  return {
    'X-Auth-Token': import.meta.env.FOOTBALL_API_KEY,
  };
}

export const wait = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Devuelve fecha en formato YYYY-MM-DD que usa esta API
 * offset = 0 → hoy, -1 → ayer, 1 → mañana
 */
export function getDateOffset(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10); // "2025-03-01"
}

/**
 * Función central de fetch. Todas las llamadas pasan por aquí.
 * Maneja errores de red, errores de la API y loguea en consola.
 */
export async function apiFetch(path) {
  const url = `${BASE}${path}`;
  let r, json;

  try {
    r    = await fetch(url, { headers: getHeaders() });
    json = await r.json();
  } catch (e) {
    throw new Error(`Error de red: ${e.message}`);
  }

  console.log(`[API] ${path} → HTTP ${r.status}`, String(JSON.stringify(json) ?? '').slice(0, 200));

  // 429 = demasiadas requests (>10/min)
  if (r.status === 429) {
    throw new Error('Rate limit alcanzado (10 req/min). Espera un momento.');
  }

  // 403 = key inválida o no autorizada para esa competición
  if (r.status === 403) {
    throw new Error(`Sin acceso a este endpoint. Verifica tu API key en .env`);
  }

  if (!r.ok) {
    throw new Error(json?.message ?? `Error HTTP ${r.status}`);
  }

  return json ?? {};
}
