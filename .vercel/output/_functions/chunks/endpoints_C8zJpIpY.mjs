import { e as createComponent, l as renderHead, g as addAttribute, r as renderTemplate, p as renderSlot, o as renderScript, h as createAstro } from './astro/server_BVI5uupt.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "FutbolLive" } = Astro2.props;
  const p = Astro2.url.pathname;
  const SECTIONS = [
    {
      label: "\u2B50 Destacadas",
      links: [
        { href: "/clasificacion/CL", label: "Champions", icon: "\u{1F3C6}" },
        { href: "/clasificacion/EL", label: "Europa Lg", icon: "\u{1F948}" },
        { href: "/clasificacion/PD", label: "LaLiga", icon: "\u{1F1EA}\u{1F1F8}" },
        { href: "/clasificacion/PL", label: "Premier", icon: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}" },
        { href: "/clasificacion/SA", label: "Serie A", icon: "\u{1F1EE}\u{1F1F9}" },
        { href: "/clasificacion/BL1", label: "Bundesliga", icon: "\u{1F1E9}\u{1F1EA}" },
        { href: "/clasificacion/FL1", label: "Ligue 1", icon: "\u{1F1EB}\u{1F1F7}" }
      ]
    },
    {
      label: "\u{1F30D} M\xE1s ligas",
      links: [
        { href: "/clasificacion/PPL", label: "Portugal", icon: "\u{1F1F5}\u{1F1F9}" },
        { href: "/clasificacion/DED", label: "Eredivisie", icon: "\u{1F1F3}\u{1F1F1}" },
        { href: "/clasificacion/ELC", label: "Championship", icon: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}" },
        { href: "/clasificacion/BSA", label: "Brasil", icon: "\u{1F1E7}\u{1F1F7}" },
        { href: "/clasificacion/CLI", label: "Libertadores", icon: "\u{1F30E}" },
        { href: "/clasificacion/WC", label: "Mundial", icon: "\u{1F30D}" },
        { href: "/clasificacion/EC", label: "Eurocopa", icon: "\u{1F1EA}\u{1F1FA}" }
      ]
    }
  ];
  function isActive(href) {
    if (href === "/") return p === "/";
    return p === href || p.startsWith(href + "/") || p.startsWith(href);
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="theme-color" content="#0a0f1a">${renderHead()}</head> <body class="bg-[#0a0f1a] text-white min-h-screen font-sans antialiased"> <!-- ══════════════ HEADER ══════════════ --> <header class="h-14 bg-[#0d1526]/95 border-b border-[#1a2540] sticky top-0 z-50
    backdrop-blur-md flex items-center px-4 gap-3"> <!-- Botón hamburguesa — solo en móvil --> <button id="sidebar-toggle" aria-label="Abrir menú" class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition shrink-0"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> </button> <!-- Logo --> <a href="/" class="flex items-center gap-2 font-black text-lg tracking-tight shrink-0"> <span class="text-xl">⚽</span> <span>Futbol<span class="text-green-400">Live</span></span> </a> <div class="flex-1"></div> <!-- Dev tool — oculto en móvil --> <a href="/explorador" class="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-600
        hover:text-yellow-400 transition border border-[#1a2540]
        hover:border-yellow-500/30 px-2.5 py-1.5 rounded-lg">
🔬 <span>Dev</span> </a> </header> <!-- ══════════════ CUERPO (sidebar + contenido) ══════════════ --> <div class="flex"> <!-- ── SIDEBAR ── --> <aside id="sidebar" class="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 shrink-0
        bg-[#0d1526] border-r border-[#1a2540] overflow-y-auto z-40
        transition-transform duration-300 ease-in-out
        -translate-x-full lg:translate-x-0"> <nav class="py-4 flex flex-col gap-0.5"> <!-- Partidos hoy --> <a href="/"${addAttribute(`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-semibold transition-all
            ${p === "/" ? "text-green-400 bg-green-400/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`, "class")}> <span class="text-base">⚽</span> <span>Partidos hoy</span> ${p === "/" && renderTemplate`<span class="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"></span>`} </a> <!-- Secciones de ligas --> ${SECTIONS.map((section) => renderTemplate`<div class="mt-3"> <p class="px-4 pb-1 text-[10px] font-bold text-gray-700 uppercase tracking-widest"> ${section.label} </p> ${section.links.map((link) => {
    const active = isActive(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-all
                    ${active ? "text-green-400 bg-green-400/10 font-semibold" : "text-gray-500 hover:text-gray-200 hover:bg-white/5"}`, "class")}> <span class="text-base leading-none w-5 text-center">${link.icon}</span> <span class="flex-1">${link.label}</span> ${active && renderTemplate`<span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>`} </a>`;
  })} </div>`)} <!-- Dev en móvil --> <div class="mt-6 mx-2 lg:hidden"> <a href="/explorador" class="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-gray-600
              hover:text-yellow-400 hover:bg-white/5 transition"> <span>🔬</span> Dev Explorer
</a> </div> </nav> </aside> <!-- Overlay para cerrar sidebar en móvil --> <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-30 hidden lg:hidden"></div> <!-- ── CONTENIDO PRINCIPAL ── --> <main class="flex-1 lg:ml-56 min-h-[calc(100vh-3.5rem)]"> <div class="max-w-5xl mx-auto px-4 py-6"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> <!-- Footer --> <footer class="lg:ml-56 text-center text-gray-700 text-xs py-8 border-t border-[#1a2540]">
Datos via football-data.org &middot; FutbolLive ${(/* @__PURE__ */ new Date()).getFullYear()} </footer> <!-- JS para toggle del sidebar en móvil --> ${renderScript($$result, "C:/visual proyectos/partidos/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/visual proyectos/partidos/src/layouts/Layout.astro", void 0);

const BASE = "https://api.football-data.org/v4";
function getHeaders() {
  return {
    "X-Auth-Token": "f3ff2f9d263c434b952481bd39181dc2"
  };
}
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
function getDateOffset(offset = 0) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
async function apiFetch(path) {
  const url = `${BASE}${path}`;
  let r, json;
  try {
    r = await fetch(url, { headers: getHeaders() });
    json = await r.json();
  } catch (e) {
    throw new Error(`Error de red: ${e.message}`);
  }
  console.log(`[API] ${path} → HTTP ${r.status}`, String(JSON.stringify(json) ?? "").slice(0, 200));
  if (r.status === 429) {
    throw new Error("Rate limit alcanzado (10 req/min). Espera un momento.");
  }
  if (r.status === 403) {
    throw new Error(`Sin acceso a este endpoint. Verifica tu API key en .env`);
  }
  if (!r.ok) {
    throw new Error(json?.message ?? `Error HTTP ${r.status}`);
  }
  return json ?? {};
}

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

function cacheGet(key) {
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

function cacheSet(key, data, ttlSeconds = 60) {
  const entry = { data, expiresAt: Date.now() + ttlSeconds * 1000 };
  memStore.set(key, entry);

  if (USE_FILE && ttlSeconds >= 60 && globalThis.__futbolFileStore) {
    globalThis.__futbolFileStore[key] = entry;
    persistFile();
  }
}

async function cached(key, fetchFn, ttlSeconds = 60) {
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
const TTL = {
  TODAY:     120,
  STANDINGS: 3600,
  PLAYERS:   86400,
};

// lib/leagues.js — football-data.org v4
// Fuente oficial: https://www.football-data.org/coverage

const COMPETITIONS = [
  // ── Top 5 Europa ──────────────────────────────────────────────────────────
  { code: 'PD',  name: 'LaLiga',          short: 'LaLiga',   country: 'España',      flag: '🇪🇸', priority: 1 },
  { code: 'PL',  name: 'Premier League',  short: 'Premier',  country: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', priority: 2 },
  { code: 'SA',  name: 'Serie A',         short: 'Serie A',  country: 'Italia',      flag: '🇮🇹', priority: 3 },
  { code: 'BL1', name: 'Bundesliga',      short: 'Bundes.',  country: 'Alemania',    flag: '🇩🇪', priority: 4 },
  { code: 'FL1', name: 'Ligue 1',         short: 'Ligue 1',  country: 'Francia',     flag: '🇫🇷', priority: 5 },
  // ── Otras ligas europeas ──────────────────────────────────────────────────
  { code: 'PPL', name: 'Primeira Liga',   short: 'Liga PT',  country: 'Portugal',    flag: '🇵🇹', priority: 6 },
  { code: 'DED', name: 'Eredivisie',      short: 'Erediv.',  country: 'Holanda',     flag: '🇳🇱', priority: 7 },
  { code: 'ELC', name: 'Championship',   short: 'Champ.',   country: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', priority: 8 },
  // ── Competiciones europeas ─────────────────────────────────────────────────
  { code: 'CL',  name: 'Champions League', short: 'UCL',    country: 'Europa',      flag: '🏆', priority: 1 },
  { code: 'EL',  name: 'Europa League',    short: 'UEL',    country: 'Europa',      flag: '🥈', priority: 2 },
  { code: 'EC',  name: 'Eurocopa',         short: 'EURO',   country: 'Europa',      flag: '🇪🇺', priority: 3 },
  // ── Mundial y América ─────────────────────────────────────────────────────
  { code: 'WC',  name: 'World Cup',        short: 'Mundial', country: 'Mundial',    flag: '🌍', priority: 1 },
  { code: 'BSA', name: 'Serie A Brasil',   short: 'Brasil',  country: 'Brasil',     flag: '🇧🇷', priority: 9 },
  { code: 'CLI', name: 'Copa Libertadores',short: 'Libert.', country: 'América',    flag: '🌎', priority: 10 },
];

// Mapa rápido code → competition
const COMPETITION_BY_CODE = new Map(COMPETITIONS.map(c => [c.code, c]));

// Códigos para la carga de partidos del día
// Ordenados por prioridad para que Champions y ligas top salgan primero
const FREE_COMPETITION_CODES = [
  'CL','PD','PL','SA','BL1','FL1','EL','PPL','DED','ELC','EC','WC','BSA','CLI'
];

// lib/endpoints.js — football-data.org v4

const arr = v => Array.isArray(v) ? v : [];

// ─── PARTIDOS ─────────────────────────────────────────────────────────────────

/**
 * Partidos de un día para TODAS las competiciones gratuitas.
 * Plan TIER_ONE: no permite /matches?competitions= múltiple.
 * Solución: una llamada por liga, resultado unificado y cacheado.
 */
async function getMatchesByDate(date) {
  return cached(`matches-${date}`, async () => {
    const all = [];
    for (const code of FREE_COMPETITION_CODES) {
      try {
        const comp = COMPETITION_BY_CODE.get(code);
        const res  = await apiFetch(`/competitions/${code}/matches?dateFrom=${date}&dateTo=${date}`);
        const matches = arr(res.matches).map(m => ({
          ...m,
          competition: {
            code,
            name:   m.competition?.name   ?? comp?.name ?? code,
            emblem: m.competition?.emblem ?? `https://crests.football-data.org/${code}.png`,
            ...m.competition,
          },
        }));
        all.push(...matches);
      } catch {}
      await wait(120); // respetamos 10 req/min
    }
    return all.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
  }, TTL.TODAY);
}

/**
 * Clasificación. Devuelve standings[].table[]
 * table[i]: { position, team, playedGames, won, draw, lost,
 *             points, goalsFor, goalsAgainst, goalDifference, form }
 */
async function getStandings(code) {
  return cached(`standings-${code}`, async () => {
    return await apiFetch(`/competitions/${code}/standings`) ?? {};
  }, TTL.STANDINGS);
}

/**
 * Partidos de una competición con filtros opcionales.
 * params: 'matchday=5' | 'status=SCHEDULED' | 'dateFrom=...&dateTo=...'
 */
async function getCompetitionMatches(code, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`comp-matches-${code}-${params}`, async () => {
    const res = await apiFetch(`/competitions/${code}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}

/**
 * Goleadores de una competición.
 * scorers[i]: { position, player: { id, name, nationality, dateOfBirth },
 *               team: { id, name, crest }, goals, assists, penalties }
 */
async function getScorers(code, limit = 20) {
  return cached(`scorers-${code}-${limit}`, async () => {
    const res = await apiFetch(`/competitions/${code}/scorers?limit=${limit}`);
    return {
      scorers:     arr(res.scorers),
      competition: res.competition ?? {},
      season:      res.season ?? {},
    };
  }, TTL.STANDINGS);
}

// ─── EQUIPOS ──────────────────────────────────────────────────────────────────

/**
 * Info de un equipo: nombre, escudo, estadio, colores, entrenador, plantilla.
 * team.squad[]: { id, name, position, dateOfBirth, nationality, shirtNumber }
 * team.coach:   { id, name, nationality, dateOfBirth, contract }
 */
async function getTeam(teamId) {
  return cached(`team-${teamId}`, async () => {
    return await apiFetch(`/teams/${teamId}`) ?? {};
  }, TTL.PLAYERS);
}

/**
 * Partidos de un equipo.
 * params: 'status=FINISHED&limit=10' | 'status=SCHEDULED&limit=5'
 */
async function getTeamMatches(teamId, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`team-matches-${teamId}-${params}`, async () => {
    const res = await apiFetch(`/teams/${teamId}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}

// ─── JUGADORES / PERSONAS ─────────────────────────────────────────────────────

/**
 * Info de un jugador:
 * { id, name, firstName, lastName, dateOfBirth, nationality,
 *   section, position, shirtNumber, lastUpdated,
 *   currentTeam: { id, name, shortName, tla, crest, contract } }
 */
async function getPerson(personId) {
  return cached(`person-${personId}`, async () => {
    return await apiFetch(`/persons/${personId}`) ?? {};
  }, TTL.PLAYERS);
}

/**
 * Partidos de un jugador.
 * params: 'limit=20' | 'competitions=PD,CL'
 */
async function getPersonMatches(personId, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`person-matches-${personId}-${params}`, async () => {
    const res = await apiFetch(`/persons/${personId}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}

export { $$Layout as $, getStandings as a, getCompetitionMatches as b, getTeam as c, getTeamMatches as d, getPerson as e, getPersonMatches as f, getScorers as g, getDateOffset as h, getMatchesByDate as i };
