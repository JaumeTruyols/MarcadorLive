import { e as createAstro, f as createComponent, h as addAttribute, r as renderTemplate, l as renderHead, p as renderSlot, o as renderScript } from './astro/server_Cq0U3tm5.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro("https://marcador.live");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Marcador \u2014 Resultados de f\xFAtbol en tiempo real",
    description = "Resultados, clasificaciones, goleadores y estad\xEDsticas de LaLiga, Champions League, Premier League y m\xE1s. Actualizado al minuto.",
    image = "/og-default.png",
    noIndex = false
  } = Astro2.props;
  const p = Astro2.url.pathname;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site ?? "https://marcador.live");
  const pageTitle = p === "/" ? title : title.includes("Marcador") ? title : `${title} \xB7 Marcador`;
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
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- ── SEO básico ── --><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}>${noIndex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- ── Open Graph (WhatsApp, Facebook, LinkedIn) ── --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="Marcador"><!-- ── Twitter / X Card ── --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(image, "content")}><!-- ── PWA / App ── --><meta name="theme-color" content="#0a0f1a"><meta name="application-name" content="Marcador"><meta name="apple-mobile-web-app-title" content="Marcador"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><!-- ── Favicon (emojis como SVG — funciona en todos los navegadores modernos) ── --><link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚽</text></svg>">${renderHead()}</head> <body class="bg-[#0a0f1a] text-white min-h-screen font-sans antialiased"> <!-- ══════════════ HEADER ══════════════ --> <header class="h-14 bg-[#0d1526]/95 border-b border-[#1a2540] sticky top-0 z-50
    backdrop-blur-md flex items-center px-4 gap-3"> <button id="sidebar-toggle" aria-label="Abrir menú" class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition shrink-0"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> </button> <a href="/" class="flex items-center gap-2 font-black text-lg tracking-tight shrink-0"> <span class="text-xl">⚽</span> <span>Marcador<span class="text-green-400">.live</span></span> </a> <div class="flex-1"></div> <a href="/explorador" class="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-600
        hover:text-yellow-400 transition border border-[#1a2540]
        hover:border-yellow-500/30 px-2.5 py-1.5 rounded-lg">
🔬 <span>Dev</span> </a> </header> <!-- ══════════════ LAYOUT ══════════════ --> <div class="flex"> <aside id="sidebar" class="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 shrink-0
        bg-[#0d1526] border-r border-[#1a2540] overflow-y-auto z-40
        transition-transform duration-300 ease-in-out
        -translate-x-full lg:translate-x-0"> <nav class="py-4 flex flex-col gap-0.5" aria-label="Ligas y competiciones"> <a href="/"${addAttribute(`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-semibold transition-all
            ${p === "/" ? "text-green-400 bg-green-400/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`, "class")}> <span class="text-base">⚽</span> <span>Partidos hoy</span> ${p === "/" && renderTemplate`<span class="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"></span>`} </a> ${SECTIONS.map((section) => renderTemplate`<div class="mt-3"> <p class="px-4 pb-1 text-[10px] font-bold text-gray-700 uppercase tracking-widest"> ${section.label} </p> ${section.links.map((link) => {
    const active = isActive(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-all
                    ${active ? "text-green-400 bg-green-400/10 font-semibold" : "text-gray-500 hover:text-gray-200 hover:bg-white/5"}`, "class")}> <span class="text-base leading-none w-5 text-center">${link.icon}</span> <span class="flex-1">${link.label}</span> ${active && renderTemplate`<span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>`} </a>`;
  })} </div>`)} <div class="mt-6 mx-2 lg:hidden"> <a href="/explorador" class="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-gray-600
              hover:text-yellow-400 hover:bg-white/5 transition"> <span>🔬</span> Dev Explorer
</a> </div> </nav> </aside> <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-30 hidden lg:hidden"></div> <main class="flex-1 lg:ml-56 min-h-[calc(100vh-3.5rem)]"> <div class="max-w-5xl mx-auto px-4 py-6"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> <footer class="lg:ml-56 border-t border-[#1a2540] py-8 px-4"> <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2"> <span class="text-gray-700 text-xs">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Marcador · Datos proporcionados por
<a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer" class="hover:text-gray-500 transition underline underline-offset-2">
football-data.org
</a> </span> <span class="text-gray-800 text-xs">
Construido con Astro · React · Tailwind · Vercel
</span> </div> </footer> ${renderScript($$result, "C:/visual proyectos/partidos/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/visual proyectos/partidos/src/layouts/Layout.astro", void 0);

const BASE = "https://api.football-data.org/v4";
function getHeaders() {
  const key = process.env.FOOTBALL_API_KEY;
  if (!key) console.warn("[API] FOOTBALL_API_KEY no definida en las variables de entorno");
  return { "X-Auth-Token": key ?? "" };
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
  console.log(`[API] ${path} → HTTP ${r.status}`);
  if (r.status === 429) throw new Error("Rate limit alcanzado (10 req/min).");
  if (r.status === 403) throw new Error("Sin acceso. Verifica FOOTBALL_API_KEY en Vercel → Settings → Environment Variables.");
  if (!r.ok) throw new Error(json?.message ?? `Error HTTP ${r.status}`);
  return json ?? {};
}

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

function cacheGet(key) {
  const entry = mem.get(key);
  if (!entry) return null;
  if (Date.now() < entry.expiresAt) return entry.data;
  mem.delete(key);
  return null;
}

function cacheSet(key, data, ttlSeconds = 60) {
  const entry = { data, expiresAt: Date.now() + ttlSeconds * 1000 };
  mem.set(key, entry);
  if (!IS_VERCEL && ttlSeconds >= 60) persistFile();
}

async function cached(key, fetchFn, ttlSeconds = 60) {
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
