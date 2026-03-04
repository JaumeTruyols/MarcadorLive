// MatchesSection.jsx — diseño completo tipo SofaScore
import { useState, useMemo, useCallback } from 'react';
import LeagueRow from './LeagueRow';
import LeagueFilter from './LeagueFilter';

const arr = v => Array.isArray(v) ? v : [];

// Orden de prioridad de ligas
const LEAGUE_PRIORITY = { CL:1, PD:2, PL:3, SA:4, BL1:5, FL1:6, EL:7, PPL:8, DED:9, ELC:10 };

function EmptyState({ day }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">⚽</span>
      <p className="text-gray-400 font-semibold">No hay partidos {day === 'today' ? 'hoy' : day === 'yesterday' ? 'ayer' : 'mañana'}</p>
      <p className="text-gray-600 text-sm mt-1">Prueba con otro día</p>
    </div>
  );
}

export default function MatchesSection({ sections: rawSections = [], onStandingsRequest }) {
  const sections = arr(rawSections).map(s => ({ ...s, matches: arr(s?.matches) }));

  const todayIdx = sections.findIndex(s => s.key === 'today');
  const [dayIdx, setDayIdx]       = useState(todayIdx >= 0 ? todayIdx : 0);
  const [filterCode, setFilter]   = useState('all');

  const current = sections[dayIdx] ?? { matches: [], key: 'today' };

  // Agrupar partidos por competición
  const leagueGroups = useMemo(() => {
    const map = new Map();
    for (const m of arr(current.matches)) {
      const code = m.competition?.code ?? 'OTR';
      if (!map.has(code)) {
        map.set(code, {
          code,
          name:    m.competition?.name   ?? code,
          emblem:  m.competition?.emblem ?? null,
          matches: [],
        });
      }
      map.get(code).matches.push(m);
    }
    // Ordenar por prioridad
    return [...map.values()].sort((a, b) =>
      (LEAGUE_PRIORITY[a.code] ?? 99) - (LEAGUE_PRIORITY[b.code] ?? 99)
    );
  }, [current]);

  const visibleGroups = useMemo(() =>
    filterCode === 'all'
      ? leagueGroups
      : leagueGroups.filter(g => g.code === filterCode),
    [leagueGroups, filterCode]
  );

  // Para el LeagueFilter (formato que espera)
  const filterLeagues = leagueGroups.map(g => ({
    id:    g.code,
    name:  g.name,
    logo:  g.emblem,
    count: g.matches.length,
  }));

  const totalMatches = arr(current.matches).length;
  const liveCount    = arr(current.matches).filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED').length;

  return (
    <div>
      {/* ── Selector de día ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1 bg-[#111827] border border-[#1f2937] rounded-xl p-1">
          {sections.map((s, i) => (
            <button key={s.key} onClick={() => { setDayIdx(i); setFilter('all'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all
                ${i === dayIdx
                  ? 'bg-white/10 text-white shadow'
                  : 'text-gray-500 hover:text-gray-300'}`}>
              <span>{s.emoji}</span>
              <span>{s.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                ${i === dayIdx ? 'bg-white/10 text-gray-300' : 'text-gray-600'}`}>
                {s.matches.length}
              </span>
            </button>
          ))}
        </div>

        {/* Contador en vivo */}
        {liveCount > 0 && (
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-bold">{liveCount} en vivo</span>
          </div>
        )}
      </div>

      {/* ── Filtro de competiciones ── */}
      {leagueGroups.length > 1 && (
        <LeagueFilter leagues={filterLeagues} activeId={filterCode} onSelect={setFilter} />
      )}

      {/* ── Contenido ── */}
      {visibleGroups.length === 0 ? (
        <EmptyState day={current.key} />
      ) : (
        <div className="space-y-2">
          {visibleGroups.map(g => (
            <LeagueRow
              key={g.code}
              code={g.code}
              name={g.name}
              emblem={g.emblem}
              matches={g.matches}
              onStandings={onStandingsRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
}
