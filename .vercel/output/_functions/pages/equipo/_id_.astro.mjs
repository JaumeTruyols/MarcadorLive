import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Cq0U3tm5.mjs';
import 'piccolore';
import { c as getTeam, d as getTeamMatches, $ as $$Layout } from '../../chunks/endpoints_DdBpewqL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://marcador.live");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let team = null, pastMatches = [], nextMatches = [], error = null;
  try {
    [team, pastMatches, nextMatches] = await Promise.all([
      getTeam(id),
      getTeamMatches(id, "status=FINISHED&limit=10"),
      getTeamMatches(id, "status=SCHEDULED,TIMED&limit=8")
    ]);
  } catch (e) {
    error = e.message;
  }
  const POS_ORDER = { Goalkeeper: 0, Defence: 1, Midfield: 2, Offence: 3 };
  const POS_ES = { Goalkeeper: "Porteros", Defence: "Defensas", Midfield: "Centrocampistas", Offence: "Delanteros" };
  const squad = team?.squad ?? [];
  const byPos = squad.reduce((acc, p) => {
    const pos = p.position ?? "Offence";
    (acc[pos] ??= []).push(p);
    return acc;
  }, {});
  const posGroups = Object.entries(byPos).sort(([a], [b]) => (POS_ORDER[a] ?? 9) - (POS_ORDER[b] ?? 9));
  function age(dob) {
    if (!dob) return "\u2014";
    return Math.floor((Date.now() - new Date(dob)) / (365.25 * 24 * 3600 * 1e3));
  }
  function matchDate(utc) {
    return new Date(utc).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      timeZone: "Europe/Madrid"
    });
  }
  function matchTime(utc) {
    return new Date(utc).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid"
    });
  }
  function resultBadge(m, teamId) {
    const tid = parseInt(teamId);
    if (m.status !== "FINISHED") return "\u2013";
    const h = m.score?.fullTime?.home, a = m.score?.fullTime?.away;
    const isHome = m.homeTeam?.id === tid;
    const my = isHome ? h : a, their = isHome ? a : h;
    if (my > their) return "V";
    if (my < their) return "D";
    return "E";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${team?.name ?? "Equipo"} \xB7 FutbolLive` }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<div class="bg-red-950/40 border border-red-500/30 rounded-xl p-6 text-center"> <p class="text-red-400 font-bold">Error: ${error}</p> </div>` : team ? renderTemplate`<div> <!-- ── HERO del equipo ── --> <div class="relative overflow-hidden rounded-2xl border border-[#1a2540] mb-6"${addAttribute(`background: linear-gradient(135deg, ${team.clubColors?.split("/")[0]?.trim()?.toLowerCase().replace(" ", "") ?? "#1a2540"}22 0%, #0d1526 100%)`, "style")}> <div class="px-6 py-6 flex items-center gap-5"> ${team.crest && renderTemplate`<img${addAttribute(team.crest, "src")}${addAttribute(team.name, "alt")} class="w-20 h-20 object-contain drop-shadow-lg shrink-0">`} <div class="min-w-0"> <h1 class="text-2xl font-black text-white truncate">${team.name}</h1> <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-400"> ${team.venue && renderTemplate`<span>🏟 ${team.venue}</span>`} ${team.founded && renderTemplate`<span>📅 Fundado ${team.founded}</span>`} ${team.clubColors && renderTemplate`<span>🎨 ${team.clubColors}</span>`} </div> ${team.coach && renderTemplate`<div class="mt-2 flex items-center gap-2"> <span class="text-xs text-gray-600">Entrenador:</span> <a${addAttribute(`/jugador/${team.coach.id}`, "href")} class="text-sm font-semibold text-gray-200 hover:text-green-400 transition"> ${team.coach.name} </a> <span class="text-xs text-gray-600">(${team.coach.nationality})</span> </div>`} </div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <!-- ── PLANTILLA ── --> <div class="lg:col-span-2"> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Plantilla</h2> ${posGroups.length === 0 ? renderTemplate`<p class="text-gray-600 text-sm">Plantilla no disponible</p>` : renderTemplate`<div class="space-y-4"> ${posGroups.map(([pos, players]) => renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-xl overflow-hidden"> <div class="px-4 py-2 bg-[#0d1526] border-b border-[#1a2540]"> <span class="text-xs font-bold text-gray-400 uppercase tracking-widest"> ${POS_ES[pos] ?? pos} </span> </div> <div class="divide-y divide-[#0f1520]"> ${players.sort((a, b) => (a.shirtNumber ?? 99) - (b.shirtNumber ?? 99)).map((p) => renderTemplate`<a${addAttribute(`/jugador/${p.id}`, "href")} class="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition group"> <!-- Dorsal --> <span class="w-7 text-right text-sm font-black text-gray-600 group-hover:text-gray-400 shrink-0"> ${p.shirtNumber ?? "\u2014"} </span> <!-- Nombre --> <span class="flex-1 text-sm text-gray-200 group-hover:text-white transition font-medium"> ${p.name} </span> <!-- Edad --> <span class="text-xs text-gray-600">${age(p.dateOfBirth)} años</span> <!-- Nac --> <span class="text-xs text-gray-600 hidden sm:block">${p.nationality}</span> <!-- Flecha --> <span class="text-gray-700 group-hover:text-green-400 transition text-xs">→</span> </a>`)} </div> </div>`)} </div>`} </div> <!-- ── LATERAL: partidos ── --> <div class="space-y-6"> <!-- Próximos --> <div> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Próximos</h2> ${nextMatches.length === 0 ? renderTemplate`<p class="text-gray-600 text-sm">No hay próximos partidos</p>` : renderTemplate`<div class="space-y-2"> ${nextMatches.map((m) => {
    const isHome = m.homeTeam?.id === parseInt(id);
    const rival = isHome ? m.awayTeam : m.homeTeam;
    return renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-xl px-3 py-2.5 hover:border-[#374151] transition"> <div class="flex items-center gap-2 mb-1"> ${m.competition?.emblem && renderTemplate`<img${addAttribute(m.competition.emblem, "src")} alt="" class="w-3 h-3 object-contain">`} <span class="text-[10px] text-gray-600">${m.competition?.name}</span> <span class="text-[10px] text-gray-700 ml-auto">${matchDate(m.utcDate)}</span> </div> <div class="flex items-center gap-2"> <span class="text-xs text-gray-500">${isHome ? "vs" : "@"}</span> ${rival?.crest && renderTemplate`<img${addAttribute(rival.crest, "src")} alt="" class="w-4 h-4 object-contain">`} <span class="text-sm text-gray-200 font-medium flex-1 truncate"> ${rival?.shortName ?? rival?.name} </span> <span class="text-xs text-green-400 font-bold">${matchTime(m.utcDate)}</span> </div> </div>`;
  })} </div>`} </div> <!-- Últimos resultados --> <div> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Últimos resultados</h2> ${pastMatches.length === 0 ? renderTemplate`<p class="text-gray-600 text-sm">Sin partidos recientes</p>` : renderTemplate`<div class="space-y-2"> ${pastMatches.slice(0, 8).map((m) => {
    const isHome = m.homeTeam?.id === parseInt(id);
    const rival = isHome ? m.awayTeam : m.homeTeam;
    const h = m.score?.fullTime?.home, a = m.score?.fullTime?.away;
    const myG = isHome ? h : a, theirG = isHome ? a : h;
    const badge = resultBadge(m, id);
    const bClass = {
      "V": "bg-green-500/20 text-green-400 border-green-500/30",
      "D": "bg-red-500/20 text-red-400 border-red-500/30",
      "E": "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }[badge] ?? "";
    return renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-xl px-3 py-2.5"> <div class="flex items-center gap-2 mb-1"> ${m.competition?.emblem && renderTemplate`<img${addAttribute(m.competition.emblem, "src")} alt="" class="w-3 h-3 object-contain">`} <span class="text-[10px] text-gray-600">${m.competition?.name}</span> <span class="text-[10px] text-gray-700 ml-auto">${matchDate(m.utcDate)}</span> </div> <div class="flex items-center gap-2"> <span${addAttribute(`text-[10px] font-black px-1.5 py-0.5 rounded border ${bClass} shrink-0`, "class")}>${badge}</span> ${rival?.crest && renderTemplate`<img${addAttribute(rival.crest, "src")} alt="" class="w-4 h-4 object-contain shrink-0">`} <span class="text-sm text-gray-300 flex-1 truncate"> ${rival?.shortName ?? rival?.name} </span> <span class="text-sm font-black text-white shrink-0">${myG} - ${theirG}</span> </div> </div>`;
  })} </div>`} </div> </div> </div> </div>` : null}` })}`;
}, "C:/visual proyectos/partidos/src/pages/equipo/[id].astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/equipo/[id].astro";
const $$url = "/equipo/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
