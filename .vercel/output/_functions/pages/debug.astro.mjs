import { e as createComponent, l as renderHead, g as addAttribute, r as renderTemplate } from '../chunks/astro/server_BVI5uupt.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Debug = createComponent(async ($$result, $$props, $$slots) => {
  const KEY = undefined                            ;
  const BASE = "https://free-api-live-football-data.p.rapidapi.com";
  const hdrs = { "X-RapidAPI-Key": KEY, "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com" };
  const w = (ms) => new Promise((r) => setTimeout(r, ms));
  const sampleSeasonIds = [913550, 894202, 893033, 890035, 891311];
  const endpoints = [
    (id) => `/football-get-standings?leagueid=${id}`,
    (id) => `/football-get-league?leagueid=${id}`,
    (id) => `/football-get-league-season?leagueid=${id}`
  ];
  const results = [];
  for (const id of sampleSeasonIds) {
    for (const ep of endpoints) {
      const path = ep(id);
      try {
        const r = await fetch(`${BASE}${path}`, { headers: hdrs });
        const j = await r.json();
        const ok = j?.status === "success";
        const res = j?.response ?? {};
        const keys = Object.keys(res).join(", ");
        const name = res?.name ?? res?.leagueName ?? res?.league?.name ?? (Array.isArray(res?.table) ? res.table[0]?.leagueName : null) ?? (Array.isArray(res?.matches) ? res.matches[0]?.leagueName : null) ?? null;
        results.push({ id, path: path.split("?")[0], ok, name, keys });
      } catch (e) {
        results.push({ id, path: path.split("?")[0], ok: false, name: null, keys: e.message });
      }
      await w(300);
    }
  }
  const searchTerms = ["laliga", "premier league", "bundesliga", "serie a", "ligue 1"];
  const searchResults = [];
  for (const term of searchTerms) {
    try {
      const r = await fetch(`${BASE}/football-search?term=${encodeURIComponent(term)}`, { headers: hdrs });
      const j = await r.json();
      const all = j?.response?.suggestions ?? j?.response ?? [];
      const items = Array.isArray(all) ? all : [];
      searchResults.push({
        term,
        hits: items.slice(0, 4).map((i) => `[${i.type}] id:${i.id ?? i.leagueId} — ${i.name ?? i.title ?? i.leagueName ?? "?"}`)
      });
    } catch (e) {
      searchResults.push({ term, hits: [e.message] });
    }
    await w(300);
  }
  return renderTemplate`<html lang="es" data-astro-cid-6tqurwfq> <head><meta charset="UTF-8"><title>Debug</title>${renderHead()}</head> <body data-astro-cid-6tqurwfq> <h1 data-astro-cid-6tqurwfq>🔍 Debug — Nombres de ligas</h1> <h2 data-astro-cid-6tqurwfq>1. Endpoints por season ID</h2> <table data-astro-cid-6tqurwfq> <thead data-astro-cid-6tqurwfq><tr data-astro-cid-6tqurwfq><th data-astro-cid-6tqurwfq>Season ID</th><th data-astro-cid-6tqurwfq>Endpoint</th><th data-astro-cid-6tqurwfq>OK</th><th data-astro-cid-6tqurwfq>Nombre</th><th data-astro-cid-6tqurwfq>Keys en response</th></tr></thead> <tbody data-astro-cid-6tqurwfq> ${results.map((r) => renderTemplate`<tr data-astro-cid-6tqurwfq> <td data-astro-cid-6tqurwfq>${r.id}</td> <td data-astro-cid-6tqurwfq>${r.path}</td> <td${addAttribute(r.ok ? "ok" : "fail", "class")} data-astro-cid-6tqurwfq>${r.ok ? "✅" : "❌"}</td> <td${addAttribute(r.name ? "ok" : "warn", "class")} data-astro-cid-6tqurwfq>${r.name ?? "(no encontrado)"}</td> <td style="color:#6b7280" data-astro-cid-6tqurwfq>${r.keys}</td> </tr>`)} </tbody> </table> <h2 data-astro-cid-6tqurwfq>2. Búsqueda por nombre de liga</h2> <table data-astro-cid-6tqurwfq> <thead data-astro-cid-6tqurwfq><tr data-astro-cid-6tqurwfq><th data-astro-cid-6tqurwfq>Búsqueda</th><th data-astro-cid-6tqurwfq>Resultados</th></tr></thead> <tbody data-astro-cid-6tqurwfq> ${searchResults.map((r) => renderTemplate`<tr data-astro-cid-6tqurwfq> <td data-astro-cid-6tqurwfq>${r.term}</td> <td data-astro-cid-6tqurwfq> ${r.hits.map((h) => renderTemplate`<div class="ok" data-astro-cid-6tqurwfq>${h}</div>`)} </td> </tr>`)} </tbody> </table> </body></html>`;
}, "C:/visual proyectos/partidos/src/pages/debug.astro", void 0);
const $$file = "C:/visual proyectos/partidos/src/pages/debug.astro";
const $$url = "/debug";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Debug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
