import { e as createComponent, l as renderHead, k as renderComponent, n as Fragment, r as renderTemplate, g as addAttribute, o as renderScript, h as createAstro } from '../chunks/astro/server_BVI5uupt.mjs';
import 'piccolore';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Explorador = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Explorador;
  const KEY = "f3ff2f9d263c434b952481bd39181dc2";
  const BASE = "https://api.football-data.org/v4";
  const hdrs = { "X-Auth-Token": KEY };
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
  new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const ENDPOINTS = [
    // ── Partidos ──
    // ⚠️ Plan TIER_ONE: /matches global no filtra por competitions=
    // Usar /competitions/{CODE}/matches por cada liga
    { group: "⚽ Partidos", label: "✅ Champions hoy", path: `/competitions/CL/matches?dateFrom=${today}&dateTo=${today}` },
    { group: "⚽ Partidos", label: "✅ LaLiga hoy", path: `/competitions/PD/matches?dateFrom=${today}&dateTo=${today}` },
    { group: "⚽ Partidos", label: "✅ Premier hoy", path: `/competitions/PL/matches?dateFrom=${today}&dateTo=${today}` },
    { group: "⚽ Partidos", label: "✅ Bundesliga hoy", path: `/competitions/BL1/matches?dateFrom=${today}&dateTo=${today}` },
    { group: "⚽ Partidos", label: "✅ Champions mañana", path: `/competitions/CL/matches?dateFrom=${tomorrow}&dateTo=${tomorrow}` },
    { group: "⚽ Partidos", label: "✅ Premier mañana", path: `/competitions/PL/matches?dateFrom=${tomorrow}&dateTo=${tomorrow}` },
    { group: "⚽ Partidos", label: "❌ Global hoy (no funciona en free)", path: `/matches?dateFrom=${today}&dateTo=${today}` },
    // ── Clasificaciones ──
    { group: "📊 Standings", label: "LaLiga (PD)", path: "/competitions/PD/standings" },
    { group: "📊 Standings", label: "Premier League (PL)", path: "/competitions/PL/standings" },
    { group: "📊 Standings", label: "Bundesliga (BL1)", path: "/competitions/BL1/standings" },
    { group: "📊 Standings", label: "Serie A (SA)", path: "/competitions/SA/standings" },
    { group: "📊 Standings", label: "Ligue 1 (FL1)", path: "/competitions/FL1/standings" },
    { group: "📊 Standings", label: "Champions League (CL)", path: "/competitions/CL/standings" },
    // ── Competiciones ──
    { group: "🏆 Competiciones", label: "Todas disponibles", path: "/competitions" },
    { group: "🏆 Competiciones", label: "Detalle LaLiga", path: "/competitions/PD" },
    { group: "🏆 Competiciones", label: "Detalle Champions", path: "/competitions/CL" },
    { group: "🏆 Competiciones", label: "Goleadores LaLiga", path: "/competitions/PD/scorers?limit=10" },
    { group: "🏆 Competiciones", label: "Goleadores CL", path: "/competitions/CL/scorers?limit=10" },
    { group: "🏆 Competiciones", label: "Equipos LaLiga", path: "/competitions/PD/teams" },
    { group: "🏆 Competiciones", label: "Partidos CL", path: "/competitions/CL/matches" },
    // ── Equipos ──
    { group: "🏟 Equipos", label: "Real Madrid (86)", path: "/teams/86" },
    { group: "🏟 Equipos", label: "Barcelona (81)", path: "/teams/81" },
    { group: "🏟 Equipos", label: "Manchester City (65)", path: "/teams/65" },
    { group: "🏟 Equipos", label: "Partidos R.Madrid", path: "/teams/86/matches?limit=10" },
    // ── Jugadores ──
    { group: "👤 Jugadores", label: "Mbappé (44)", path: "/persons/44" },
    { group: "👤 Jugadores", label: "Vinicius Jr (1246)", path: "/persons/1246" }
  ];
  const groups = ENDPOINTS.reduce((acc, ep) => {
    (acc[ep.group] ??= []).push(ep);
    return acc;
  }, {});
  const reqPath = Astro2.url.searchParams.get("path") ?? "";
  let apiResult = null;
  let apiError = null;
  let apiStatus = null;
  let callTime = null;
  if (reqPath) {
    const t0 = Date.now();
    try {
      const r = await fetch(`${BASE}${reqPath}`, { headers: hdrs });
      apiStatus = r.status;
      apiResult = await r.json();
      callTime = Date.now() - t0;
    } catch (e) {
      apiError = e.message;
      callTime = Date.now() - t0;
    }
  }
  function getHints(obj) {
    if (!obj || typeof obj !== "object") return [];
    return Object.keys(obj).map((k) => {
      const val = obj[k];
      const type = Array.isArray(val) ? `array[${val.length}]` : typeof val;
      return `${k} → ${type}`;
    });
  }
  const hints = apiResult ? getHints(apiResult) : [];
  return renderTemplate`<html lang="es" data-astro-cid-patswa4q> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>🔬 Explorador API — FutbolLive</title>${renderHead()}</head> <body data-astro-cid-patswa4q> <div class="header" data-astro-cid-patswa4q> <div data-astro-cid-patswa4q> <h1 data-astro-cid-patswa4q>🔬 Explorador — football-data.org v4</h1> <p data-astro-cid-patswa4q>Testa cualquier endpoint en tiempo real · <strong style="color:#22c55e" data-astro-cid-patswa4q>Sin límite diario ✅</strong></p> </div> <span class="badge" data-astro-cid-patswa4q>DEV</span> </div> <div class="layout" data-astro-cid-patswa4q> <aside class="sidebar" data-astro-cid-patswa4q> ${Object.entries(groups).map(([group, eps]) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-patswa4q": true }, { "default": async ($$result2) => renderTemplate` <div class="group-label" data-astro-cid-patswa4q>${group}</div> ${eps.map((ep) => renderTemplate`<a${addAttribute(`/explorador?path=${encodeURIComponent(ep.path)}`, "href")}${addAttribute(`ep-btn${reqPath === ep.path ? " active" : ""}`, "class")} data-astro-cid-patswa4q> ${ep.label} </a>`)}` })}`)} </aside> <div class="result-panel" data-astro-cid-patswa4q> <div class="url-bar" data-astro-cid-patswa4q> <span class="method-badge" data-astro-cid-patswa4q>GET</span> <form method="get" action="/explorador" style="display:contents" data-astro-cid-patswa4q> <input class="url-input" type="text" name="path"${addAttribute(reqPath, "value")} placeholder="/matches?dateFrom=2025-03-01&dateTo=2025-03-01" autocomplete="off" spellcheck="false" data-astro-cid-patswa4q> <button class="send-btn" type="submit" data-astro-cid-patswa4q>▶ Enviar</button> </form> </div> ${reqPath && renderTemplate`<div class="meta-bar" data-astro-cid-patswa4q> <div class="meta-item" data-astro-cid-patswa4q>URL: <span data-astro-cid-patswa4q>${BASE}${reqPath}</span></div> ${apiStatus && renderTemplate`<span${addAttribute(apiStatus < 400 ? "ok" : "err", "class")} data-astro-cid-patswa4q>● HTTP ${apiStatus}</span>`} ${callTime != null && renderTemplate`<div class="meta-item" data-astro-cid-patswa4q>Tiempo: <span data-astro-cid-patswa4q>${callTime}ms</span></div>`} ${apiResult?.count != null && renderTemplate`<div class="meta-item" data-astro-cid-patswa4q>Resultados: <span data-astro-cid-patswa4q>${apiResult.count}</span></div>`} </div>`} ${hints.length > 0 && renderTemplate`<div class="hints-bar" data-astro-cid-patswa4q> <span class="hints-title" data-astro-cid-patswa4q>🔑 Claves:</span> ${hints.map((h) => renderTemplate`<span class="hint-chip" data-astro-cid-patswa4q>${h}</span>`)} </div>`} ${apiError && renderTemplate`<div class="error-box" data-astro-cid-patswa4q>❌ Error: ${apiError}</div>`} ${apiResult && renderTemplate`<div class="json-container" data-astro-cid-patswa4q><pre id="json-out" data-astro-cid-patswa4q>${JSON.stringify(apiResult, null, 2)}</pre></div>`} ${!reqPath && renderTemplate`<div class="empty-state" data-astro-cid-patswa4q> <span class="icon" data-astro-cid-patswa4q>🔬</span> <h2 data-astro-cid-patswa4q>Selecciona un endpoint</h2> <p data-astro-cid-patswa4q>Haz click en el panel izquierdo o escribe un path personalizado</p> </div>`} </div> </div> ${renderScript($$result, "C:/visual proyectos/partidos/src/pages/explorador.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/visual proyectos/partidos/src/pages/explorador.astro", void 0);
const $$file = "C:/visual proyectos/partidos/src/pages/explorador.astro";
const $$url = "/explorador";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Explorador,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
