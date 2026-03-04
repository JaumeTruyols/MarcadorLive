import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BVI5uupt.mjs';
import 'piccolore';
import { h as getDateOffset, $ as $$Layout, i as getMatchesByDate } from '../chunks/endpoints_C8zJpIpY.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useMemo } from 'react';
import { M as MatchCard } from '../chunks/MatchCard_8_PTCg03.mjs';
export { renderers } from '../renderers.mjs';

function CompLogo({ src, name }) {
  const [err, setErr] = useState(false);
  if (err || !src) return /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-[#374151] shrink-0" });
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: name,
      className: "w-4 h-4 object-contain shrink-0",
      onError: () => setErr(true)
    }
  );
}
function LeagueRow({ code, name, emblem, matches, onStandings }) {
  const ref = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);
  function check() {
    const el = ref.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }
  useEffect(() => {
    check();
    const el = ref.current;
    el?.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el?.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [matches]);
  const slide = (d) => ref.current?.scrollBy({ left: d * 320, behavior: "smooth" });
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2 px-1", children: [
      /* @__PURE__ */ jsx(CompLogo, { src: emblem, name }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-200 flex-1 truncate", children: name }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-600 text-xs", children: [
        matches.length,
        " partidos"
      ] }),
      code && onStandings && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onStandings(code),
          className: "text-[10px] text-gray-500 hover:text-green-400 transition border border-[#374151] hover:border-green-500/40 px-2 py-0.5 rounded-full",
          children: "Tabla →"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hidden sm:flex gap-1 ml-1", children: [[-1, "‹"], [1, "›"]].map(([d, lbl]) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => slide(d),
          className: `w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold border transition
                ${(d === -1 ? canL : canR) ? "bg-[#1f2937] border-[#374151] text-white hover:bg-[#374151]" : "bg-transparent border-transparent text-gray-700 cursor-default"}`,
          children: lbl
        },
        d
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      canL && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => slide(-1),
          className: "sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0a0f1a]/90 border border-[#374151] text-white flex items-center justify-center shadow-lg",
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsx("div", { ref, className: "flex gap-2 overflow-x-auto pb-1", style: { scrollbarWidth: "none" }, children: matches.map((m) => /* @__PURE__ */ jsx("div", { className: "shrink-0 w-[300px] sm:w-[320px]", children: /* @__PURE__ */ jsx(MatchCard, { match: m }) }, m.id)) }),
      canR && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => slide(1),
          className: "sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0a0f1a]/90 border border-[#374151] text-white flex items-center justify-center shadow-lg",
          children: "›"
        }
      ),
      canR && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0a0f1a] to-transparent" }),
      canL && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0a0f1a] to-transparent" })
    ] })
  ] });
}

function LeagueFilter({ leagues = [], activeId, onSelect }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const safeLeagues = Array.isArray(leagues) ? leagues : [];
  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [safeLeagues]);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || activeId === "all") return;
    const btn = el.querySelector(`[data-id="${activeId}"]`);
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);
  function slide(dir) {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-1 mb-6", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => slide(-1),
        className: `shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          bg-[#1f2937] border border-[#374151] text-gray-400 transition-all
          ${canLeft ? "opacity-100 hover:text-white" : "opacity-0 pointer-events-none"}`,
        children: "‹"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-2 overflow-x-auto scroll-smooth flex-1",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              "data-id": "all",
              onClick: () => onSelect("all"),
              className: `shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
            border transition-all whitespace-nowrap
            ${activeId === "all" ? "bg-green-500/20 border-green-500/60 text-green-400" : "bg-[#1f2937] border-[#374151] text-gray-400 hover:text-white"}`,
              children: "⚽ Todos"
            }
          ),
          safeLeagues.map(({ id, name, logo, count }) => /* @__PURE__ */ jsxs(
            "button",
            {
              "data-id": id,
              onClick: () => onSelect(id),
              className: `shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              border transition-all whitespace-nowrap
              ${String(activeId) === String(id) ? "bg-white/10 border-white/30 text-white" : "bg-[#1f2937] border-[#374151] text-gray-400 hover:text-white"}`,
              children: [
                logo && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: logo,
                    alt: "",
                    className: "w-4 h-4 object-contain",
                    onError: (e) => e.target.style.display = "none"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: name ?? `Liga ${id}` }),
                count != null && /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-xs", children: count })
              ]
            },
            id
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => slide(1),
        className: `shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          bg-[#1f2937] border border-[#374151] text-gray-400 transition-all
          ${canRight ? "opacity-100 hover:text-white" : "opacity-0 pointer-events-none"}`,
        children: "›"
      }
    )
  ] });
}

const arr = (v) => Array.isArray(v) ? v : [];
const LEAGUE_PRIORITY = { CL: 1, PD: 2, PL: 3, SA: 4, BL1: 5, FL1: 6, EL: 7, PPL: 8, DED: 9, ELC: 10 };
function EmptyState({ day }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "text-5xl mb-4", children: "⚽" }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-400 font-semibold", children: [
      "No hay partidos ",
      day === "today" ? "hoy" : day === "yesterday" ? "ayer" : "mañana"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mt-1", children: "Prueba con otro día" })
  ] });
}
function MatchesSection({ sections: rawSections = [], onStandingsRequest }) {
  const sections = arr(rawSections).map((s) => ({ ...s, matches: arr(s?.matches) }));
  const todayIdx = sections.findIndex((s) => s.key === "today");
  const [dayIdx, setDayIdx] = useState(todayIdx >= 0 ? todayIdx : 0);
  const [filterCode, setFilter] = useState("all");
  const current = sections[dayIdx] ?? { matches: [], key: "today" };
  const leagueGroups = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const m of arr(current.matches)) {
      const code = m.competition?.code ?? "OTR";
      if (!map.has(code)) {
        map.set(code, {
          code,
          name: m.competition?.name ?? code,
          emblem: m.competition?.emblem ?? null,
          matches: []
        });
      }
      map.get(code).matches.push(m);
    }
    return [...map.values()].sort(
      (a, b) => (LEAGUE_PRIORITY[a.code] ?? 99) - (LEAGUE_PRIORITY[b.code] ?? 99)
    );
  }, [current]);
  const visibleGroups = useMemo(
    () => filterCode === "all" ? leagueGroups : leagueGroups.filter((g) => g.code === filterCode),
    [leagueGroups, filterCode]
  );
  const filterLeagues = leagueGroups.map((g) => ({
    id: g.code,
    name: g.name,
    logo: g.emblem,
    count: g.matches.length
  }));
  arr(current.matches).length;
  const liveCount = arr(current.matches).filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED").length;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 bg-[#111827] border border-[#1f2937] rounded-xl p-1", children: sections.map((s, i) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setDayIdx(i);
            setFilter("all");
          },
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all
                ${i === dayIdx ? "bg-white/10 text-white shadow" : "text-gray-500 hover:text-gray-300"}`,
          children: [
            /* @__PURE__ */ jsx("span", { children: s.emoji }),
            /* @__PURE__ */ jsx("span", { children: s.label }),
            /* @__PURE__ */ jsx("span", { className: `text-xs px-1.5 py-0.5 rounded-full font-bold
                ${i === dayIdx ? "bg-white/10 text-gray-300" : "text-gray-600"}`, children: s.matches.length })
          ]
        },
        s.key
      )) }),
      liveCount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }),
        /* @__PURE__ */ jsxs("span", { className: "text-red-400 text-xs font-bold", children: [
          liveCount,
          " en vivo"
        ] })
      ] })
    ] }),
    leagueGroups.length > 1 && /* @__PURE__ */ jsx(LeagueFilter, { leagues: filterLeagues, activeId: filterCode, onSelect: setFilter }),
    visibleGroups.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { day: current.key }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: visibleGroups.map((g) => /* @__PURE__ */ jsx(
      LeagueRow,
      {
        code: g.code,
        name: g.name,
        emblem: g.emblem,
        matches: g.matches,
        onStandings: onStandingsRequest
      },
      g.code
    )) })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const arr = (v) => Array.isArray(v) ? v : [];
  const [yesterday, today, tomorrow] = [getDateOffset(-1), getDateOffset(0), getDateOffset(1)];
  let sections = [];
  const errors = {};
  async function safeFetch(label, date) {
    try {
      return arr(await getMatchesByDate(date));
    } catch (e) {
      errors[label] = e?.message ?? "Error";
      return [];
    }
  }
  const [yM, tM, tmM] = await Promise.all([
    safeFetch("ayer", yesterday),
    safeFetch("hoy", today),
    safeFetch("ma\xF1ana", tomorrow)
  ]);
  if (yM.length) sections.push({ key: "yesterday", label: "Ayer", emoji: "\u{1F4CB}", matches: yM });
  if (tM.length) sections.push({ key: "today", label: "Hoy", emoji: "\u{1F4C5}", matches: tM });
  if (tmM.length) sections.push({ key: "tomorrow", label: "Ma\xF1ana", emoji: "\u{1F51C}", matches: tmM });
  if (!sections.length) sections = [{ key: "today", label: "Hoy", emoji: "\u{1F4C5}", matches: [] }];
  const hasErrors = Object.keys(errors).length > 0;
  const todayLabel = (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Madrid"
  });
  const liveCount = tM.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED").length;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FutbolLive \u2014 Resultados" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex items-center justify-between mb-6 flex-wrap gap-3"> <div> <h1 class="text-xl font-black text-white">Resultados</h1> <p class="text-gray-500 text-sm capitalize mt-0.5">${todayLabel}</p> </div> ${liveCount > 0 && renderTemplate`<div class="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full animate-pulse"> <span class="w-2 h-2 rounded-full bg-red-500"></span> <span class="text-red-400 text-sm font-bold">${liveCount} en vivo</span> </div>`} </div>  ${hasErrors && renderTemplate`<div class="bg-orange-950/40 border border-orange-500/30 rounded-xl p-4 mb-5 text-orange-300 text-sm"> <p class="font-bold mb-1">⚠️ Error parcial cargando datos</p> ${Object.entries(errors).map(([l, msg]) => renderTemplate`<p class="text-xs font-mono text-orange-400">[${l}] ${msg}</p>`)} </div>`} ${renderComponent($$result2, "MatchesSection", MatchesSection, { "sections": sections, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/visual proyectos/partidos/src/components/MatchesSection", "client:component-export": "default" })} ` })}`;
}, "C:/visual proyectos/partidos/src/pages/index.astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
