import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BVI5uupt.mjs';
import 'piccolore';
import { g as getScorers, a as getStandings, $ as $$Layout } from '../../../chunks/endpoints_C8zJpIpY.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Goleadores = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Goleadores;
  const { code } = Astro2.params;
  let data = null, competition = {}, error = null;
  try {
    [data] = await Promise.all([
      getScorers(code, 20),
      getStandings(code).catch(() => null)
    ]);
    competition = data?.competition ?? {};
  } catch (e) {
    error = e?.message ?? "Error desconocido";
  }
  const rawScorers = data?.scorers ?? [];
  const season = data?.season ?? {};
  const MEDALS = ["\u{1F947}", "\u{1F948}", "\u{1F949}"];
  const scorers = rawScorers.map((s, i) => {
    const pos = s.position ?? i + 1;
    const isTop3 = pos === 1 || pos === 2 || pos === 3;
    const medal = isTop3 ? MEDALS[pos - 1] : null;
    const goalsColor = pos === 1 ? "text-yellow-400" : pos === 2 || pos === 3 ? "text-white" : "text-gray-200";
    const rowBg = pos === 1 ? "bg-yellow-500/[0.03]" : "";
    return { ...s, pos, isTop3, medal, goalsColor, rowBg };
  });
  const top3 = scorers.length >= 3 ? [scorers[1], scorers[0], scorers[2]] : [];
  const podioConfig = [
    { rank: 2, height: "h-28", goalsColor: "text-gray-300" },
    // plata
    { rank: 1, height: "h-36", goalsColor: "text-yellow-400" },
    // oro
    { rank: 3, height: "h-24", goalsColor: "text-amber-600" }
    // bronce
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Goleadores ${competition?.name ?? code} \xB7 FutbolLive` }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<div class="bg-red-950/40 border border-red-500/30 rounded-2xl p-8 text-center"> <p class="text-red-400 font-bold">Error: ${error}</p> <p class="text-gray-600 text-sm mt-1 font-mono">${code}</p> </div>` : renderTemplate`<div class="space-y-6"> <!-- ════ CABECERA ════ --> <div class="flex items-center justify-between flex-wrap gap-4"> <div class="flex items-center gap-3"> ${competition?.emblem && renderTemplate`<img${addAttribute(competition.emblem, "src")} alt="" class="w-12 h-12 object-contain drop-shadow-lg shrink-0">`} <div> <h1 class="text-2xl font-black text-white">Goleadores</h1> <p class="text-gray-500 text-sm mt-0.5"> ${competition?.name ?? code} ${season?.startDate && renderTemplate`<span> · ${season.startDate.slice(0, 4)}/${season.endDate?.slice(2, 4)}</span>`} </p> </div> </div> <a${addAttribute(`/clasificacion/${code}`, "href")} class="flex items-center gap-2 text-sm text-gray-500 hover:text-green-400
          transition bg-[#111827] border border-[#1a2540] hover:border-green-400/30
          px-3 py-2 rounded-xl">
← Clasificación
</a> </div> <!-- ════ TOP 3 — PODIO ════ --> ${top3.length === 3 && renderTemplate`<div class="grid grid-cols-3 gap-3"> ${top3.map((s, visualIdx) => {
    const cfg = podioConfig[visualIdx];
    const borderClass = cfg.rank === 1 ? "border-yellow-500/40 bg-yellow-500/5" : "border-[#1a2540] bg-[#0d1526]";
    return renderTemplate`<div${addAttribute(`relative flex flex-col items-center justify-end rounded-2xl border px-3 pb-4 pt-6 ${borderClass} ${cfg.height}`, "class")}> <span class="absolute top-3 text-xl">${MEDALS[cfg.rank - 1]}</span> ${s?.team?.crest && renderTemplate`<img${addAttribute(s.team.crest, "src")} alt="" class="w-8 h-8 object-contain mb-1 shrink-0" onerror="this.style.display='none'">`} <a${addAttribute(`/jugador/${s?.player?.id}`, "href")} class="text-center text-xs font-bold text-white hover:text-green-400 transition leading-tight max-w-full"> ${s?.player?.name?.split(" ").pop()} </a> <div${addAttribute(`mt-1.5 text-2xl font-black ${cfg.goalsColor}`, "class")}> ${s?.goals ?? 0} </div> <p class="text-[10px] text-gray-600">goles</p> </div>`;
  })} </div>`} <!-- ════ TABLA COMPLETA ════ --> <div class="bg-[#111827] border border-[#1a2540] rounded-2xl overflow-hidden"> <!-- Cabecera --> <div class="grid px-4 py-2.5 border-b border-[#0f1520]
        text-[10px] text-gray-600 uppercase tracking-widest font-bold" style="grid-template-columns: 2.5rem 1fr 7rem 3rem 3rem 3rem"> <span class="text-center">#</span> <span>Jugador</span> <span>Equipo</span> <span class="text-center" title="Goles">⚽</span> <span class="text-center" title="Asistencias">🅰️</span> <span class="text-center" title="Penaltis">🎯</span> </div> ${scorers.length === 0 ? renderTemplate`<div class="py-12 text-center text-gray-600"> <p class="text-3xl mb-2">📊</p> <p>No hay datos de goleadores disponibles</p> </div>` : renderTemplate`<div> ${scorers.map((s) => renderTemplate`<div${addAttribute(`grid items-center px-4 py-3 border-b border-[#0f1520] last:border-0 hover:bg-white/[0.02] transition ${s.rowBg}`, "class")} style="grid-template-columns: 2.5rem 1fr 7rem 3rem 3rem 3rem"> <!-- Posición / Medalla --> <div class="text-center"> ${s.medal ? renderTemplate`<span class="text-lg">${s.medal}</span>` : renderTemplate`<span class="text-sm font-bold text-gray-600">${s.pos}</span>`} </div> <!-- Jugador --> <div class="min-w-0"> <a${addAttribute(`/jugador/${s.player?.id}`, "href")} class="text-sm font-semibold text-gray-200 hover:text-green-400 transition truncate block"> ${s.player?.name} </a> <p class="text-[10px] text-gray-600">${s.player?.nationality}</p> </div> <!-- Equipo --> <div class="flex items-center gap-1.5 min-w-0"> ${s.team?.crest && renderTemplate`<img${addAttribute(s.team.crest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} <a${addAttribute(`/equipo/${s.team?.id}`, "href")} class="text-xs text-gray-500 hover:text-gray-200 transition truncate"> ${s.team?.shortName ?? s.team?.name} </a> </div> <!-- Goles --> <div class="text-center"> <span${addAttribute(`text-sm font-black ${s.goalsColor}`, "class")}> ${s.goals ?? 0} </span> </div> <!-- Asistencias --> <div class="text-center"> <span class="text-sm text-gray-500">${s.assists ?? 0}</span> </div> <!-- Penaltis --> <div class="text-center"> <span class="text-sm text-gray-600">${s.penalties ?? 0}</span> </div> </div>`)} </div>`} </div> <!-- Leyenda --> <div class="flex flex-wrap gap-4 text-xs text-gray-700 px-1"> <span>⚽ Goles totales</span> <span>🅰️ Asistencias</span> <span>🎯 Penaltis marcados</span> </div> </div>`}` })}`;
}, "C:/visual proyectos/partidos/src/pages/clasificacion/[code]/goleadores.astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/clasificacion/[code]/goleadores.astro";
const $$url = "/clasificacion/[code]/goleadores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Goleadores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
