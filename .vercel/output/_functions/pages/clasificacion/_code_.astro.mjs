import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Cq0U3tm5.mjs';
import 'piccolore';
import { a as getStandings, b as getCompetitionMatches, $ as $$Layout } from '../../chunks/endpoints_DdBpewqL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://marcador.live");
const $$code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$code;
  const { code } = Astro2.params;
  let standings = null;
  let nextMatches = [];
  let error = null;
  try {
    const [standData, matchData] = await Promise.all([
      getStandings(code),
      getCompetitionMatches(code, "status=SCHEDULED&limit=10").catch(() => [])
    ]);
    standings = standData;
    nextMatches = matchData ?? [];
  } catch (e) {
    error = e.message;
  }
  const competition = standings?.competition ?? {};
  const season = standings?.season ?? {};
  const tables = standings?.standings ?? [];
  function formColor(r) {
    if (r === "W") return "bg-green-500";
    if (r === "L") return "bg-red-500";
    if (r === "D") return "bg-gray-500";
    return "bg-gray-700";
  }
  function toMadrid(utcStr) {
    if (!utcStr) return "";
    return new Date(utcStr).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid"
    });
  }
  const processedTables = tables.map((t) => {
    const rows = (t.table ?? []).map((row, i) => {
      const len = t.table.length;
      const form = (row.form ?? "").split(",").filter(Boolean).slice(-5);
      const zone = i < 4 ? "champions" : i < 6 ? "europa" : i < 7 ? "conf" : i >= len - 3 ? "descenso" : "normal";
      const zoneBorder = {
        champions: "border-l-2 border-l-blue-500/50",
        europa: "border-l-2 border-l-orange-500/50",
        conf: "border-l-2 border-l-green-600/50",
        descenso: "border-l-2 border-l-red-500/50",
        normal: ""
      }[zone];
      const goalDiffStr = row.goalDifference > 0 ? `+${row.goalDifference}` : String(row.goalDifference ?? 0);
      const formBubbles = form.map((r) => ({ r, color: formColor(r) }));
      return { ...row, zone, zoneBorder, goalDiffStr, formBubbles };
    });
    return { ...t, processedRows: rows };
  });
  const nextProcessed = nextMatches.slice(0, 8).map((m) => ({
    ...m,
    dateLabel: toMadrid(m.utcDate)
  }));
  const hasMultipleTables = tables.length > 1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${competition?.name ?? code} \u2014 Clasificaci\xF3n \xB7 FutbolLive` }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<div class="bg-red-950/40 border border-red-500/30 rounded-xl p-6 text-center"> <p class="text-red-400 font-bold mb-1">Error cargando clasificación</p> <p class="text-gray-500 text-sm font-mono">${error}</p> </div>` : renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <!-- ════ COLUMNA PRINCIPAL: Clasificación ════ --> <div class="lg:col-span-2"> <!-- Cabecera competición --> <div class="flex items-center gap-3 mb-5"> ${competition?.emblem && renderTemplate`<img${addAttribute(competition.emblem, "src")} alt="" class="w-10 h-10 object-contain">`} <div> <h1 class="text-xl font-black text-white">${competition?.name ?? code}</h1> ${season?.startDate && renderTemplate`<p class="text-gray-500 text-xs">
Temporada ${season.startDate.slice(0, 4)}/${season.endDate?.slice(2, 4)} ${season?.currentMatchday && ` \xB7 Jornada ${season.currentMatchday}`} </p>`} <!-- Accesos rápidos --> <div class="flex gap-2 mt-2 flex-wrap"> <a${addAttribute(`/clasificacion/${code}/goleadores`, "href")} class="text-[10px] font-semibold text-gray-500 hover:text-green-400 transition
                bg-[#0d1526] border border-[#1a2540] hover:border-green-400/30 px-2 py-1 rounded-lg">
⚽ Goleadores
</a> ${season?.currentMatchday && renderTemplate`<a${addAttribute(`/clasificacion/${code}/jornada/${season.currentMatchday}`, "href")} class="text-[10px] font-semibold text-gray-500 hover:text-green-400 transition
                  bg-[#0d1526] border border-[#1a2540] hover:border-green-400/30 px-2 py-1 rounded-lg">
📅 J${season.currentMatchday} </a>`} </div> </div> </div> <!-- Selector de grupos (Champions) --> ${hasMultipleTables && renderTemplate`<div class="flex gap-2 flex-wrap mb-4"> ${processedTables.map((t, i) => renderTemplate`<a${addAttribute(`#tabla-${i}`, "href")} class="px-3 py-1 bg-[#111827] border border-[#1f2937] rounded-lg text-xs
                text-gray-400 hover:text-white hover:border-[#374151] transition"> ${t.group ?? t.stage ?? `Tabla ${i + 1}`} </a>`)} </div>`} <!-- Tablas de clasificación --> ${processedTables.map((t, idx) => renderTemplate`<div${addAttribute(`tabla-${idx}`, "id")} class="mb-6"> ${hasMultipleTables && renderTemplate`<h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1"> ${t.group ?? t.stage ?? `Grupo ${idx + 1}`} </h2>`} <div class="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden"> <!-- Cabecera columnas --> <div class="grid text-[10px] text-gray-600 uppercase tracking-widest font-bold
              px-3 py-2 border-b border-[#1f2937]" style="grid-template-columns: 2rem 1fr repeat(8, 2rem)"> <span class="text-center">#</span> <span>Equipo</span> <span class="text-center" title="Partidos jugados">PJ</span> <span class="text-center" title="Ganados">G</span> <span class="text-center" title="Empatados">E</span> <span class="text-center" title="Perdidos">P</span> <span class="text-center" title="Goles a favor">GF</span> <span class="text-center" title="Goles en contra">GC</span> <span class="text-center" title="Diferencia">DG</span> <span class="text-center font-black text-gray-400" title="Puntos">Pts</span> </div> <!-- Filas — sin ninguna comparación con < en el template --> ${t.processedRows.map((row) => renderTemplate`<div${addAttribute(`grid items-center px-3 py-2.5 border-b border-[#0f1520] last:border-0
                  hover:bg-white/[0.02] transition group ${row.zoneBorder}`, "class")} style="grid-template-columns: 2rem 1fr repeat(8, 2rem)"> <span class="text-center text-xs font-bold text-gray-500">${row.position}</span> <!-- Equipo + forma --> <div class="flex items-center gap-2 min-w-0"> ${row.team?.crest && renderTemplate`<img${addAttribute(row.team.crest, "src")} alt="" class="w-5 h-5 object-contain shrink-0" onerror="this.style.display='none'">`} <a${addAttribute(`/equipo/${row.team?.id}`, "href")} class="text-sm text-gray-200 truncate group-hover:text-white transition hover:text-green-400"> ${row.team?.shortName ?? row.team?.name} </a> <div class="hidden sm:flex gap-0.5 ml-1"> ${row.formBubbles.map((fb) => renderTemplate`<span${addAttribute(`w-3.5 h-3.5 rounded-sm text-[8px] font-black text-white
                        flex items-center justify-center ${fb.color}`, "class")}> ${fb.r} </span>`)} </div> </div> <span class="text-center text-xs text-gray-400">${row.playedGames}</span> <span class="text-center text-xs text-green-400">${row.won}</span> <span class="text-center text-xs text-gray-500">${row.draw}</span> <span class="text-center text-xs text-red-400">${row.lost}</span> <span class="text-center text-xs text-gray-400">${row.goalsFor}</span> <span class="text-center text-xs text-gray-400">${row.goalsAgainst}</span> <span class="text-center text-xs text-gray-400">${row.goalDiffStr}</span> <span class="text-center text-sm font-black text-white">${row.points}</span> </div>`)} </div> <!-- Leyenda zonas --> <div class="flex flex-wrap gap-3 mt-2 px-1"> <div class="flex items-center gap-1.5 text-xs text-gray-600"> <span class="w-2 h-2 rounded-sm bg-blue-500/50"></span> Champions
</div> <div class="flex items-center gap-1.5 text-xs text-gray-600"> <span class="w-2 h-2 rounded-sm bg-orange-500/50"></span> Europa
</div> <div class="flex items-center gap-1.5 text-xs text-gray-600"> <span class="w-2 h-2 rounded-sm bg-red-500/50"></span> Descenso
</div> </div> </div>`)} </div> <!-- ════ COLUMNA LATERAL: Próximos partidos ════ --> <div> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
Próximos partidos
</h2> ${nextProcessed.length === 0 ? renderTemplate`<p class="text-gray-600 text-sm">No hay próximos partidos</p>` : renderTemplate`<div class="space-y-2"> ${nextProcessed.map((m) => renderTemplate`<div class="bg-[#111827] border border-[#1f2937] rounded-xl px-3 py-3 hover:border-[#374151] transition"> <p class="text-[10px] text-gray-600 mb-2"> ${m.dateLabel} ${m.matchday && renderTemplate`<span> · J${m.matchday}</span>`} </p> <div class="flex items-center gap-2"> <div class="flex items-center gap-1.5 flex-1 min-w-0"> ${m.homeTeam?.crest && renderTemplate`<img${addAttribute(m.homeTeam.crest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} <span class="text-xs text-gray-300 truncate"> ${m.homeTeam?.shortName ?? m.homeTeam?.name} </span> </div> <span class="text-xs text-gray-600 shrink-0 font-bold">vs</span> <div class="flex items-center gap-1.5 flex-1 min-w-0 justify-end"> <span class="text-xs text-gray-300 truncate text-right"> ${m.awayTeam?.shortName ?? m.awayTeam?.name} </span> ${m.awayTeam?.crest && renderTemplate`<img${addAttribute(m.awayTeam.crest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} </div> </div> </div>`)} </div>`} </div> </div>`}` })}`;
}, "C:/visual proyectos/partidos/src/pages/clasificacion/[code].astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/clasificacion/[code].astro";
const $$url = "/clasificacion/[code]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$code,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
