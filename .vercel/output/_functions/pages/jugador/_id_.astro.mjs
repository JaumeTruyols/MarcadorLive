import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BVI5uupt.mjs';
import 'piccolore';
import { e as getPerson, f as getPersonMatches, $ as $$Layout } from '../../chunks/endpoints_C8zJpIpY.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let person = null, rawMatches = [], error = null;
  try {
    [person, rawMatches] = await Promise.all([
      getPerson(id),
      getPersonMatches(id, "limit=15").catch(() => [])
    ]);
  } catch (e) {
    error = e?.message ?? "Error desconocido";
  }
  function age(dob) {
    if (!dob) return "\u2014";
    return Math.floor((Date.now() - new Date(dob)) / (365.25 * 24 * 3600 * 1e3));
  }
  function fmtDate(utc, opts = {}) {
    if (!utc) return "\u2014";
    return new Date(utc).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Madrid",
      ...opts
    });
  }
  function fmtTime(utc) {
    if (!utc) return "";
    return new Date(utc).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid"
    });
  }
  const POS_ES = {
    Goalkeeper: "Portero",
    Defence: "Defensa",
    Midfield: "Centrocampista",
    Offence: "Delantero",
    Midfielder: "Centrocampista",
    Forward: "Delantero",
    Defender: "Defensa",
    Attacker: "Delantero",
    "Left Back": "Lateral Izquierdo",
    "Right Back": "Lateral Derecho",
    "Centre-Back": "Defensa Central"
  };
  const posLabel = POS_ES[person?.position] ?? person?.position ?? "Jugador";
  const initials = (person?.name ?? "??").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const myTeamId = person?.currentTeam?.id ?? null;
  function computeResult(m) {
    if (m.status !== "FINISHED") return null;
    const h = m.score?.fullTime?.home;
    const a = m.score?.fullTime?.away;
    if (h == null || a == null || !myTeamId) return null;
    const isHome = m.homeTeam?.id === myTeamId;
    const myG = isHome ? h : a;
    const rivG = isHome ? a : h;
    if (myG > rivG) return { label: "V", cls: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (myG < rivG) return { label: "D", cls: "bg-red-500/20   text-red-400   border-red-500/30" };
    return { label: "E", cls: "bg-gray-500/20  text-gray-400  border-gray-500/30" };
  }
  const matches = rawMatches.map((m) => {
    const isHome = m.homeTeam?.id === myTeamId;
    const rival = isHome ? m.awayTeam : m.homeTeam;
    const h = m.score?.fullTime?.home;
    const a = m.score?.fullTime?.away;
    const hasScore = h != null && a != null && m.status === "FINISHED";
    const isLive = m.status === "IN_PLAY" || m.status === "PAUSED";
    const isUpcoming = m.status === "SCHEDULED" || m.status === "TIMED";
    const result = computeResult(m);
    const scoreStr = hasScore ? isHome ? `${h} - ${a}` : `${a} - ${h}` : null;
    const sideLabel = hasScore ? isHome ? "local" : "visitante" : null;
    const dateStr = fmtDate(m.utcDate, { year: void 0, month: "short" });
    const timeStr = isUpcoming ? fmtTime(m.utcDate) : null;
    return {
      ...m,
      _rival: rival,
      _isHome: isHome,
      _isLive: isLive,
      _isUpcoming: isUpcoming,
      _hasScore: hasScore,
      _result: result,
      _scoreStr: scoreStr,
      _sideLabel: sideLabel,
      _dateStr: dateStr,
      _timeStr: timeStr
    };
  });
  const finished = matches.filter((m) => m.status === "FINISHED");
  const wins = finished.filter((m) => m._result?.label === "V").length;
  const draws = finished.filter((m) => m._result?.label === "E").length;
  const losses = finished.filter((m) => m._result?.label === "D").length;
  const ficha = [
    { label: "Nombre completo", value: person?.name },
    { label: "Posici\xF3n", value: posLabel },
    { label: "Dorsal", value: person?.shirtNumber ? `#${person.shirtNumber}` : null },
    { label: "Nacimiento", value: person?.dateOfBirth ? fmtDate(person.dateOfBirth) : null },
    { label: "Edad", value: person?.dateOfBirth ? `${age(person.dateOfBirth)} a\xF1os` : null },
    { label: "Nacionalidad", value: person?.nationality },
    { label: "Secci\xF3n", value: person?.section },
    { label: "Actualizado", value: person?.lastUpdated ? fmtDate(person.lastUpdated) : null }
  ].filter((d) => d.value);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${person?.name ?? "Jugador"} \xB7 FutbolLive` }, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<div class="bg-red-950/40 border border-red-500/30 rounded-2xl p-8 text-center"> <p class="text-4xl mb-3">😕</p> <p class="text-red-400 font-bold text-lg mb-1">No se pudo cargar el jugador</p> <p class="text-gray-600 text-sm font-mono">${error}</p> </div>` : person ? renderTemplate`<div class="space-y-6"> <!-- ════ HERO ════ --> <div class="relative overflow-hidden rounded-2xl border border-[#1a2540] bg-[#0d1526]"> <div class="absolute inset-0 opacity-20" style="background: radial-gradient(ellipse at 80% 50%, #22c55e22 0%, transparent 70%)"></div> <div class="relative px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"> <!-- Avatar --> <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/30 to-green-900/50
          border border-green-500/20 flex items-center justify-center shrink-0"> <span class="text-2xl font-black text-green-300">${initials}</span> </div> <!-- Info --> <div class="flex-1 min-w-0"> <div class="flex items-center gap-3 flex-wrap mb-1"> <h1 class="text-2xl font-black text-white">${person.name}</h1> ${person.shirtNumber && renderTemplate`<span class="text-sm font-black text-green-400 bg-green-400/10
                border border-green-400/20 px-2 py-0.5 rounded-lg">
#${person.shirtNumber} </span>`} </div> <div class="flex flex-wrap gap-2 mb-3"> <span class="text-xs font-semibold bg-[#1a2540] border border-[#1f2937]
              text-gray-300 px-2.5 py-1 rounded-lg"> ${posLabel} </span> ${person.nationality && renderTemplate`<span class="text-xs text-gray-400 bg-[#1a2540] border border-[#1f2937]
                px-2.5 py-1 rounded-lg"> ${person.nationality} </span>`} ${person.dateOfBirth && renderTemplate`<span class="text-xs text-gray-400 bg-[#1a2540] border border-[#1f2937]
                px-2.5 py-1 rounded-lg"> ${age(person.dateOfBirth)} años · ${fmtDate(person.dateOfBirth)} </span>`} </div> ${person.currentTeam && renderTemplate`<a${addAttribute(`/equipo/${person.currentTeam.id}`, "href")} class="inline-flex items-center gap-2 bg-[#111827] border border-[#1f2937]
                hover:border-green-400/30 hover:bg-green-400/5 transition rounded-xl px-3 py-2 group"> ${person.currentTeam.crest && renderTemplate`<img${addAttribute(person.currentTeam.crest, "src")} alt="" class="w-6 h-6 object-contain shrink-0">`} <div class="min-w-0"> <p class="text-sm font-bold text-gray-200 group-hover:text-white transition"> ${person.currentTeam.name} </p> ${person.currentTeam.contract?.until && renderTemplate`<p class="text-[10px] text-gray-600">
Contrato hasta ${person.currentTeam.contract.until.slice(0, 4)} </p>`} </div> <span class="text-gray-700 group-hover:text-green-400 transition text-sm ml-1">→</span> </a>`} </div> <!-- Resumen V/E/D --> ${finished.length > 0 && renderTemplate`<div class="flex sm:flex-col gap-4 sm:gap-2 sm:items-end shrink-0"> <p class="text-[10px] text-gray-600 uppercase tracking-widest">
Últimos ${finished.length} </p> <div class="flex gap-1.5"> <span class="text-xs font-black px-2 py-1 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30"> ${wins}V
</span> <span class="text-xs font-black px-2 py-1 rounded-lg bg-gray-500/20 text-gray-400 border border-gray-500/30"> ${draws}E
</span> <span class="text-xs font-black px-2 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30"> ${losses}D
</span> </div> </div>`} </div> </div> <!-- ════ ÚLTIMOS PARTIDOS ════ --> <div> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Últimos partidos</h2> ${matches.length === 0 ? renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-2xl p-8 text-center"> <p class="text-gray-600">Sin partidos registrados</p> </div>` : renderTemplate`<div class="bg-[#111827] border border-[#1a2540] rounded-2xl overflow-hidden"> <!-- Cabecera --> <div class="grid px-4 py-2 border-b border-[#0f1520]
            text-[10px] text-gray-600 uppercase tracking-widest font-bold" style="grid-template-columns: 2.5rem 1fr 3rem 4.5rem 3rem"> <span>Res.</span> <span>Partido</span> <span class="text-center">Liga</span> <span class="text-center">Fecha</span> <span class="text-center">J</span> </div> <!-- Filas: todo pre-calculado, sin lógica en el template --> ${matches.map((m) => renderTemplate`<div class="grid items-center px-4 py-3 border-b border-[#0f1520] last:border-0
              hover:bg-white/[0.02] transition" style="grid-template-columns: 2.5rem 1fr 3rem 4.5rem 3rem"> <!-- Resultado --> <div> ${m._result ? renderTemplate`<span${addAttribute(`text-[10px] font-black px-1.5 py-0.5 rounded border ${m._result.cls}`, "class")}> ${m._result.label} </span>` : m._isLive ? renderTemplate`<span class="text-[10px] font-black text-red-400 flex items-center gap-1"> <span class="w-1.5 h-1.5 rounded-full bg-red-500 live-dot"></span>EN
</span>` : renderTemplate`<span class="text-[10px] text-gray-600">—</span>`} </div> <!-- Rival + marcador --> <div class="min-w-0"> <div class="flex items-center gap-1.5"> <span class="text-[10px] text-gray-600 shrink-0">${m._isHome ? "vs" : "@"}</span> ${m._rival?.crest && renderTemplate`<img${addAttribute(m._rival.crest, "src")} alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.display='none'">`} <span class="text-sm text-gray-200 truncate"> ${m._rival?.shortName ?? m._rival?.name ?? "\u2014"} </span> </div> ${m._hasScore && renderTemplate`<p class="text-xs font-black text-white mt-0.5"> ${m._scoreStr} <span class="text-gray-600 font-normal text-[10px] ml-1">(${m._sideLabel})</span> </p>`} ${m._timeStr && renderTemplate`<p class="text-xs text-green-400 font-semibold mt-0.5">${m._timeStr}</p>`} </div> <!-- Liga --> <div class="flex justify-center"> ${m.competition?.emblem ? renderTemplate`<img${addAttribute(m.competition.emblem, "src")}${addAttribute(m.competition.name, "alt")}${addAttribute(m.competition.name, "title")} class="w-5 h-5 object-contain" onerror="this.style.display='none'">` : renderTemplate`<span class="text-xs text-gray-700">${m.competition?.code ?? "\u2014"}</span>`} </div> <!-- Fecha --> <div class="text-center"> <span class="text-xs text-gray-500">${m._dateStr}</span> </div> <!-- Jornada --> <div class="text-center"> ${m.matchday ? renderTemplate`<a${addAttribute(`/clasificacion/${m.competition?.code}/jornada/${m.matchday}`, "href")} class="text-xs text-gray-600 hover:text-green-400 transition">
J${m.matchday} </a>` : renderTemplate`<span class="text-xs text-gray-700">—</span>`} </div> </div>`)} </div>`} </div> <!-- ════ FICHA TÉCNICA ════ --> <div class="bg-[#111827] border border-[#1a2540] rounded-2xl p-5"> <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Ficha técnica</h2> <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3"> ${ficha.map((d) => renderTemplate`<div class="flex flex-col gap-0.5"> <dt class="text-[10px] text-gray-600 uppercase tracking-widest font-bold">${d.label}</dt> <dd class="text-sm text-gray-200">${d.value}</dd> </div>`)} </dl> </div> </div>` : renderTemplate`<div class="text-center py-20 text-gray-600"> <p class="text-4xl mb-3">🔍</p> <p>Jugador no encontrado</p> </div>`}` })}`;
}, "C:/visual proyectos/partidos/src/pages/jugador/[id].astro", void 0);

const $$file = "C:/visual proyectos/partidos/src/pages/jugador/[id].astro";
const $$url = "/jugador/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
