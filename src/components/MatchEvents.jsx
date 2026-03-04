// MatchEvents.jsx — estructura API-Football v3
const TYPE_MAP = {
  'Goal':       { icon: '⚽', color: 'text-green-400',  label: 'Gol' },
  'Own Goal':   { icon: '⚽', color: 'text-red-400',    label: 'Gol en propia' },
  'Yellow Card':{ icon: '🟨', color: 'text-yellow-400', label: 'Amarilla' },
  'Red Card':   { icon: '🟥', color: 'text-red-500',    label: 'Roja' },
  'Yellow-Red': { icon: '🟥', color: 'text-orange-400', label: 'Doble amarilla' },
  'subst':      { icon: '🔄', color: 'text-blue-400',   label: 'Sustitución' },
  'Var':        { icon: '📺', color: 'text-purple-400', label: 'VAR' },
};

function getCfg(ev) {
  if (ev.type === 'subst') return TYPE_MAP['subst'];
  return TYPE_MAP[ev.detail] ?? TYPE_MAP[ev.type] ?? { icon: '•', color: 'text-gray-400', label: ev.type };
}

export default function MatchEvents({ events = [], homeTeamId }) {
  if (!events.length) return (
    <p className="text-gray-500 text-sm text-center py-4 mt-3">Sin eventos registrados</p>
  );

  return (
    <div className="mt-4">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Eventos</p>
      <ul className="space-y-2">
        {events.map((ev, i) => {
          const cfg    = getCfg(ev);
          const isHome = ev.team?.id === homeTeamId;
          const min    = ev.time?.elapsed ?? '?';
          const extra  = ev.time?.extra ? `+${ev.time.extra}` : '';

          return (
            <li key={i} className={`flex items-start gap-2 text-sm ${isHome ? '' : 'flex-row-reverse'}`}>
              <span className="text-gray-500 w-9 shrink-0 text-right">{min}{extra}'</span>
              <span className={`shrink-0 ${cfg.color}`}>{cfg.icon}</span>
              <div className={isHome ? 'text-left' : 'text-right'}>
                <span className="text-white font-medium">{ev.player?.name}</span>
                {ev.type === 'subst' && ev.assist?.name && (
                  <span className="text-gray-400 text-xs ml-1">↓ {ev.assist.name}</span>
                )}
                {ev.type !== 'subst' && ev.assist?.name && (
                  <span className="text-gray-400 text-xs ml-1">({ev.assist.name})</span>
                )}
                <span className="text-gray-600 text-xs block">{cfg.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
