import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

const STATUS_CONFIG = {
  SCHEDULED: { label: null, color: "text-gray-400", bg: "" },
  TIMED: { label: null, color: "text-gray-400", bg: "" },
  IN_PLAY: { label: "EN VIVO", color: "text-red-400", bg: "bg-red-500/10" },
  PAUSED: { label: "DESCANSO", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  FINISHED: { label: "FIN", color: "text-gray-500", bg: "" },
  POSTPONED: { label: "APLAZADO", color: "text-orange-400", bg: "" },
  CANCELLED: { label: "CANCELADO", color: "text-red-600", bg: "" },
  SUSPENDED: { label: "SUSPENDIDO", color: "text-orange-400", bg: "" },
  AWARDED: { label: "CONCEDIDO", color: "text-blue-400", bg: "" }
};
const DURATION_TAG = {
  EXTRA_TIME: "(P.E.)",
  PENALTY_SHOOTOUT: "(Pen.)"
};
function toMadrid(utcStr) {
  if (!utcStr) return "";
  return new Date(utcStr).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid"
  });
}
function Crest({ src, name, size = "w-8 h-8" }) {
  const [err, setErr] = useState(false);
  if (err || !src) return /* @__PURE__ */ jsx("span", { className: `${size} rounded-full bg-[#1f2937] border border-[#374151] flex items-center justify-center text-xs text-gray-600 shrink-0 font-bold`, children: name?.[0] ?? "?" });
  return /* @__PURE__ */ jsx("img", { src, alt: name, className: `${size} object-contain shrink-0`, onError: () => setErr(true) });
}
function GoalEvent({ goal, homeId }) {
  const isHome = goal.team?.id === homeId;
  const min = goal.minute + (goal.injuryTime ? `+${goal.injuryTime}` : "") + "'";
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-1.5 text-xs ${isHome ? "" : "flex-row-reverse"}`, children: [
    /* @__PURE__ */ jsx("span", { className: "text-gray-500 w-9 text-center shrink-0", children: min }),
    /* @__PURE__ */ jsx("span", { children: "⚽" }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: goal.scorer?.name?.split(" ").pop() }),
    goal.assist && /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
      "(",
      goal.assist.name?.split(" ").pop(),
      ")"
    ] }),
    goal.type === "OWN_GOAL" && /* @__PURE__ */ jsx("span", { className: "text-red-400 text-xs", children: "(p.p.)" })
  ] });
}
function MatchCard({ match: init }) {
  const [open, setOpen] = useState(false);
  const m = init;
  const { homeTeam: home, awayTeam: away, score, status, utcDate, goals = [], matchday, stage } = m;
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.SCHEDULED;
  const isLive = status === "IN_PLAY" || status === "PAUSED";
  const isEnd = status === "FINISHED";
  const isUpcoming = status === "SCHEDULED" || status === "TIMED";
  const hScore = score?.fullTime?.home;
  const aScore = score?.fullTime?.away;
  const hasScore = hScore !== null && hScore !== void 0;
  const homeWon = score?.winner === "HOME_TEAM";
  const awayWon = score?.winner === "AWAY_TEAM";
  const homeGoals = goals.filter((g) => g.team?.id === home?.id);
  const awayGoals = goals.filter((g) => g.team?.id === away?.id);
  const durTag = DURATION_TAG[score?.duration] ?? "";
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border overflow-hidden transition-all duration-200
      ${isLive ? "border-red-500/30 bg-[#0f1a12]" : "border-[#1f2937] bg-[#111827] hover:border-[#374151]"}`, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "w-full px-3 py-3 flex items-center gap-2 hover:bg-white/[0.02] transition text-left",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx(Crest, { src: home?.crest, name: home?.shortName }),
            /* @__PURE__ */ jsx("span", { className: `text-sm truncate leading-tight
            ${homeWon ? "font-bold text-white" : isEnd ? "text-gray-400" : "text-gray-200"}`, children: home?.shortName ?? home?.name ?? "—" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center shrink-0 w-24 rounded-lg py-1 ${cfg.bg}`, children: [
            isLive ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-red-400 text-[10px] font-bold mb-0.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" }),
              cfg.label
            ] }) : isUpcoming ? /* @__PURE__ */ jsx("span", { className: "text-green-400 text-xs mb-0.5", children: toMadrid(utcDate) }) : /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-semibold mb-0.5 ${cfg.color}`, children: [
              cfg.label,
              durTag ? " " + durTag : ""
            ] }),
            /* @__PURE__ */ jsx("span", { className: `text-lg font-black tracking-widest
            ${isEnd || isLive ? "text-white" : "text-gray-500"}`, children: hasScore ? `${hScore} - ${aScore}` : "vs" }),
            isEnd && score?.halfTime?.home !== null && score?.halfTime?.home !== void 0 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-600", children: [
              "(",
              score.halfTime.home,
              "-",
              score.halfTime.away,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0 justify-end", children: [
            /* @__PURE__ */ jsx("span", { className: `text-sm truncate text-right leading-tight
            ${awayWon ? "font-bold text-white" : isEnd ? "text-gray-400" : "text-gray-200"}`, children: away?.shortName ?? away?.name ?? "—" }),
            /* @__PURE__ */ jsx(Crest, { src: away?.crest, name: away?.shortName })
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "border-t border-[#1f2937] px-3 py-3 space-y-3", children: [
      goals.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2", children: "Goles" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: homeGoals.map((g, i) => /* @__PURE__ */ jsx(GoalEvent, { goal: g, homeId: home?.id }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: awayGoals.map((g, i) => /* @__PURE__ */ jsx(GoalEvent, { goal: g, homeId: home?.id }, i)) })
        ] })
      ] }) : isEnd || isLive ? /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs text-center", children: "Sin goles registrados" }) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 pt-1 border-t border-[#1f2937]", children: [
        utcDate && /* @__PURE__ */ jsxs("span", { children: [
          "🕐 ",
          toMadrid(utcDate)
        ] }),
        matchday && /* @__PURE__ */ jsxs("span", { children: [
          "📅 Jornada ",
          matchday
        ] }),
        stage && stage !== "REGULAR_SEASON" && /* @__PURE__ */ jsxs("span", { children: [
          "🏆 ",
          stage.replace(/_/g, " ").toLowerCase()
        ] })
      ] })
    ] })
  ] });
}

export { MatchCard as M };
