import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_Cq0U3tm5.mjs';
import 'piccolore';
import { b as getCompetitionMatches, a as getStandings, $ as $$Layout } from '../../../../chunks/endpoints_DdBpewqL.mjs';
import { M as MatchCard } from '../../../../chunks/MatchCard_8_PTCg03.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://marcador.live");
const $$day = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$day;
  const { code, day } = Astro2.params;
  const dayNum = parseInt(day);
  let matches = [], standings = null, error = null;
  try {
    [matches, standings] = await Promise.all([
      getCompetitionMatches(code, `matchday=${dayNum}`),
      getStandings(code).catch(() => null)
    ]);
  } catch (e) {
    error = e?.message ?? "Error desconocido";
  }
  const competition = standings?.competition ?? {};
  const season = standings?.season ?? {};
  const totalMatchdays = season?.currentMatchday ?? dayNum;
  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < totalMatchdays ? dayNum + 1 : null;
  const maxJ = Math.max(totalMatchdays, dayNum);
  const jornadaOptions = Array.from({ length: maxJ }, (_, i) => i + 1);
  const finished = matches.filter((m) => m.status === "FINISHED");
  const liveMatches = matches.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED");
  const totalGoals = finished.reduce((sum, m) => {
    return sum + (m.score?.fullTime?.home ?? 0) + (m.score?.fullTime?.away ?? 0);
  }, 0);
  const statCards = [
    { label: "Partidos", value: matches.length, color: "text-white", icon: "\u{1F4C5}" },
    { label: "Jugados", value: finished.length, color: "text-gray-300", icon: "\u2705" },
    { label: "En vivo", value: liveMatches.length, color: "text-red-400", icon: "\u{1F534}" },
    { label: "Goles", value: totalGoals, color: "text-green-400", icon: "\u26BD" }
  ];
  function dayLabel(utc) {
    return new Date(utc).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "Europe/Madrid"
    });
  }
  const byDay = matches.reduce((acc, m) => {
    const k = m.utcDate ? dayLabel(m.utcDate) : "Sin fecha";
    (acc[k] ??= []).push(m);
    return acc;
  }, {});
  const dayGroups = Object.entries(byDay);
  const resultadosRapidos = finished.map((m) => ({
    homeShort: m.homeTeam?.shortName ?? m.homeTeam?.name ?? "\u2014",
    homeCrest: m.homeTeam?.crest,
    awayShort: m.awayTeam?.shortName ?? m.awayTeam?.name ?? "\u2014",
    awayCrest: m.awayTeam?.crest,
    homeScore: m.score?.fullTime?.home ?? 0,
    awayScore: m.score?.fullTime?.away ?? 0,
    homeWon: m.score?.winner === "HOME_TEAM",
    awayWon: m.score?.winner === "AWAY_TEAM"
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `J${dayNum} ${competition?.name ?? code} \xB7 FutbolLive` }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<div class="bg-red-950/40 border border-red-500/30 rounded-2xl p-8 text-center"> <p class="text-red-400 font-bold">Error: ${error}</p> </div>` : renderTemplate`<div class="space-y-6"> <!-- ════ CABECERA ════ --> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"> <div class="flex items-center gap-3"> ${competition?.emblem && renderTemplate`<img${addAttribute(competition.emblem, "src")} alt="" class="w-10 h-10 object-contain drop-shadow-lg shrink-0">`} <div> <h1 class="text-xl font-black text-white"> ${competition?.name ?? code} <span class="text-green-400 ml-2">· Jornada ${dayNum}</span> </h1> ${season?.startDate && renderTemplate`<p class="text-gray-600 text-xs mt-0.5">
Temporada ${season.startDate.slice(0, 4)}/${season.endDate?.slice(2, 4)} </p>`} </div> </div> <!-- Navegación: botones + selector --> <div class="flex items-center gap-2"> ${prevDay ? renderTemplate`<a${addAttribute(`/clasificacion/${code}/jornada/${prevDay}`, "href")} class="px-3 py-2 text-sm text-gray-400 hover:text-white
              bg-[#111827] border border-[#1a2540] hover:border-[#374151] rounded-xl transition">
← J${prevDay} </a>` : renderTemplate`<span class="px-3 py-2 text-sm text-gray-700
            bg-[#0d1526] border border-[#1a2540] rounded-xl cursor-not-allowed">
←
</span>`} <!-- Selector de jornada (reemplaza los 38 botones) --> <select${addAttribute(`window.location='/clasificacion/${code}/jornada/'+this.value`, "onchange")} class="bg-[#111827] border border-[#1a2540] text-white text-sm
            rounded-xl px-3 py-2 focus:outline-none focus:border-green-400/50
            cursor-pointer hover:border-[#374151] transition"> ${jornadaOptions.map((j) => renderTemplate`<option${addAttribute(j, "value")}${addAttribute(j === dayNum, "selected")}>Jornada ${j}</option>`)} </select> ${nextDay ? renderTemplate`<a${addAttribute(`/clasificacion/${code}/jornada/${nextDay}`, "href")} class="px-3 py-2 text-sm text-gray-400 hover:text-white
              bg-[#111827] border border-[#1a2540] hover:border-[#374151] rounded-xl transition">
J${nextDay} →
</a>` : renderTemplate`<span class="px-3 py-2 text-sm text-gray-700
            bg-[#0d1526] border border-[#1a2540] rounded-xl cursor-not-allowed">
→
</span>`} </div> </div> <!-- ════ STAT CARDS ════ --> <div class="grid grid-cols-2 sm:grid-cols-4 gap-3"> ${statCards.map((s) => renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-xl px-4 py-3"> <p class="text-[10px] text-gray-600 uppercase tracking-widest mb-1">${s.icon} ${s.label}</p> <p${addAttribute(`text-2xl font-black ${s.color}`, "class")}>${s.value}</p> </div>`)} </div> <!-- ════ PARTIDOS + LATERAL ════ --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <!-- Columna principal: MatchCards --> <div class="lg:col-span-2 space-y-5"> ${dayGroups.length === 0 ? renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-2xl p-8 text-center"> <p class="text-gray-600 text-3xl mb-2">📭</p> <p class="text-gray-500">No hay partidos para la jornada ${dayNum}</p> </div>` : dayGroups.map(([label, dayMs]) => renderTemplate`<div> <div class="flex items-center gap-3 mb-3"> <span class="text-xs font-bold text-gray-500 capitalize">${label}</span> <div class="flex-1 h-px bg-[#1a2540]"></div> <span class="text-xs text-gray-700">${dayMs.length} partido${dayMs.length !== 1 ? "s" : ""}</span> </div> <div class="space-y-2"> ${dayMs.map((m) => renderTemplate`${renderComponent($$result2, "MatchCard", MatchCard, { "match": m, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/visual proyectos/partidos/src/components/MatchCard", "client:component-export": "default" })}`)} </div> </div>`)} </div> <!-- Columna lateral --> <div class="space-y-4"> <!-- Resultados rápidos --> ${resultadosRapidos.length > 0 && renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-2xl overflow-hidden"> <div class="px-4 py-2.5 border-b border-[#0f1520]"> <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest">Resultados</h3> </div> <div class="divide-y divide-[#0f1520]"> ${resultadosRapidos.map((r) => renderTemplate`<div class="flex items-center gap-2 px-3 py-2.5 hover:bg-white/[0.02] transition"> <div class="flex items-center gap-1.5 flex-1 min-w-0"> ${r.homeCrest && renderTemplate`<img${addAttribute(r.homeCrest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} <span${addAttribute(`text-xs truncate ${r.homeWon ? "font-bold text-white" : "text-gray-400"}`, "class")}> ${r.homeShort} </span> </div> <span class="text-sm font-black text-white shrink-0 w-10 text-center"> ${r.homeScore} - ${r.awayScore} </span> <div class="flex items-center gap-1.5 flex-1 min-w-0 justify-end"> <span${addAttribute(`text-xs truncate text-right ${r.awayWon ? "font-bold text-white" : "text-gray-400"}`, "class")}> ${r.awayShort} </span> ${r.awayCrest && renderTemplate`<img${addAttribute(r.awayCrest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} </div> </div>`)} </div> </div>`} <!-- Links útiles --> <div class="bg-[#111827] border border-[#1a2540] rounded-2xl p-4 space-y-1"> <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Ver también</h3> <a${addAttribute(`/clasificacion/${code}`, "href")} class="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition py-1.5">
📊 Clasificación
</a> <a${addAttribute(`/clasificacion/${code}/goleadores`, "href")} class="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition py-1.5">
⚽ Goleadores
</a> ${prevDay && renderTemplate`<a${addAttribute(`/clasificacion/${code}/jornada/${prevDay}`, "href")} class="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition py-1.5">
← Jornada ${prevDay} </a>`} ${nextDay && renderTemplate`<a${addAttribute(`/clasificacion/${code}/jornada/${nextDay}`, "href")} class="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition py-1.5">
Jornada ${nextDay} →
</a>`} </div> </div> </div> </div>`}` })}`;
}, "C:/visual proyectos/partidos/src/pages/clasificacion/[code]/jornada/[day].astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/clasificacion/[code]/jornada/[day].astro";
const $$url = "/clasificacion/[code]/jornada/[day]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$day,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
