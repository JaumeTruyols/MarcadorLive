// MatchCard.jsx — football-data.org v4
// Diseño tipo SofaScore/FlashScore con panel expandible de detalles

import { useState } from 'react';

const STATUS_CONFIG = {
  SCHEDULED:  { label: null,         color: 'text-gray-400',   bg: '' },
  TIMED:      { label: null,         color: 'text-gray-400',   bg: '' },
  IN_PLAY:    { label: 'EN VIVO',    color: 'text-red-400',    bg: 'bg-red-500/10' },
  PAUSED:     { label: 'DESCANSO',   color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  FINISHED:   { label: 'FIN',        color: 'text-gray-500',   bg: '' },
  POSTPONED:  { label: 'APLAZADO',   color: 'text-orange-400', bg: '' },
  CANCELLED:  { label: 'CANCELADO',  color: 'text-red-600',    bg: '' },
  SUSPENDED:  { label: 'SUSPENDIDO', color: 'text-orange-400', bg: '' },
  AWARDED:    { label: 'CONCEDIDO',  color: 'text-blue-400',   bg: '' },
};

const DURATION_TAG = {
  EXTRA_TIME:        '(P.E.)',
  PENALTY_SHOOTOUT:  '(Pen.)',
};

function toMadrid(utcStr) {
  if (!utcStr) return '';
  return new Date(utcStr).toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  });
}

function Crest({ src, name, size = 'w-8 h-8' }) {
  const [err, setErr] = useState(false);
  if (err || !src) return (
    <span className={`${size} rounded-full bg-[#1f2937] border border-[#374151] flex items-center justify-center text-xs text-gray-600 shrink-0 font-bold`}>
      {name?.[0] ?? '?'}
    </span>
  );
  return <img src={src} alt={name} className={`${size} object-contain shrink-0`} onError={() => setErr(true)} />;
}

function GoalEvent({ goal, homeId }) {
  const isHome = goal.team?.id === homeId;
  const min = goal.minute + (goal.injuryTime ? `+${goal.injuryTime}` : '') + "'";
  return (
    <div className={`flex items-center gap-1.5 text-xs ${isHome ? '' : 'flex-row-reverse'}`}>
      <span className="text-gray-500 w-9 text-center shrink-0">{min}</span>
      <span>⚽</span>
      <span className="text-gray-300">{goal.scorer?.name?.split(' ').pop()}</span>
      {goal.assist && <span className="text-gray-600">({goal.assist.name?.split(' ').pop()})</span>}
      {goal.type === 'OWN_GOAL' && <span className="text-red-400 text-xs">(p.p.)</span>}
    </div>
  );
}

export default function MatchCard({ match: init }) {
  const [open, setOpen] = useState(false);
  const m = init;

  const { homeTeam: home, awayTeam: away, score, status, utcDate, goals = [], matchday, stage } = m;

  const cfg       = STATUS_CONFIG[status] ?? STATUS_CONFIG.SCHEDULED;
  const isLive    = status === 'IN_PLAY' || status === 'PAUSED';
  const isEnd     = status === 'FINISHED';
  const isUpcoming= status === 'SCHEDULED' || status === 'TIMED';

  const hScore = score?.fullTime?.home;
  const aScore = score?.fullTime?.away;
  const hasScore = hScore !== null && hScore !== undefined;

  const homeWon = score?.winner === 'HOME_TEAM';
  const awayWon = score?.winner === 'AWAY_TEAM';

  const homeGoals = goals.filter(g => g.team?.id === home?.id);
  const awayGoals = goals.filter(g => g.team?.id === away?.id);

  const durTag = DURATION_TAG[score?.duration] ?? '';

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200
      ${isLive
        ? 'border-red-500/30 bg-[#0f1a12]'
        : 'border-[#1f2937] bg-[#111827] hover:border-[#374151]'}`}>

      {/* ── FILA PRINCIPAL ── */}
      <button onClick={() => setOpen(o => !o)}
        className="w-full px-3 py-3 flex items-center gap-2 hover:bg-white/[0.02] transition text-left">

        {/* Equipo local */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Crest src={home?.crest} name={home?.shortName} />
          <span className={`text-sm truncate leading-tight
            ${homeWon ? 'font-bold text-white' : isEnd ? 'text-gray-400' : 'text-gray-200'}`}>
            {home?.shortName ?? home?.name ?? '—'}
          </span>
        </div>

        {/* Centro */}
        <div className={`flex flex-col items-center shrink-0 w-24 rounded-lg py-1 ${cfg.bg}`}>
          {/* Estado / hora */}
          {isLive ? (
            <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {cfg.label}
            </span>
          ) : isUpcoming ? (
            <span className="text-green-400 text-xs mb-0.5">{toMadrid(utcDate)}</span>
          ) : (
            <span className={`text-[10px] font-semibold mb-0.5 ${cfg.color}`}>
              {cfg.label}{durTag ? ' ' + durTag : ''}
            </span>
          )}
          {/* Marcador */}
          <span className={`text-lg font-black tracking-widest
            ${isEnd || isLive ? 'text-white' : 'text-gray-500'}`}>
            {hasScore ? `${hScore} - ${aScore}` : 'vs'}
          </span>
          {/* Descanso */}
          {isEnd && score?.halfTime?.home !== null && score?.halfTime?.home !== undefined && (
            <span className="text-[10px] text-gray-600">
              ({score.halfTime.home}-{score.halfTime.away})
            </span>
          )}
        </div>

        {/* Equipo visitante */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className={`text-sm truncate text-right leading-tight
            ${awayWon ? 'font-bold text-white' : isEnd ? 'text-gray-400' : 'text-gray-200'}`}>
            {away?.shortName ?? away?.name ?? '—'}
          </span>
          <Crest src={away?.crest} name={away?.shortName} />
        </div>
      </button>

      {/* ── PANEL EXPANDIDO ── */}
      {open && (
        <div className="border-t border-[#1f2937] px-3 py-3 space-y-3">

          {/* Goles */}
          {goals.length > 0 ? (
            <div className="space-y-1.5">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2">Goles</p>
              <div className="grid grid-cols-2 gap-x-4">
                {/* Local */}
                <div className="space-y-1">
                  {homeGoals.map((g, i) => <GoalEvent key={i} goal={g} homeId={home?.id} />)}
                </div>
                {/* Visitante */}
                <div className="space-y-1">
                  {awayGoals.map((g, i) => <GoalEvent key={i} goal={g} homeId={home?.id} />)}
                </div>
              </div>
            </div>
          ) : (isEnd || isLive) ? (
            <p className="text-gray-600 text-xs text-center">Sin goles registrados</p>
          ) : null}

          {/* Info extra */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 pt-1 border-t border-[#1f2937]">
            {utcDate && <span>🕐 {toMadrid(utcDate)}</span>}
            {matchday && <span>📅 Jornada {matchday}</span>}
            {stage && stage !== 'REGULAR_SEASON' && (
              <span>🏆 {stage.replace(/_/g,' ').toLowerCase()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
