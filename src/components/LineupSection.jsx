// LineupSection.jsx — estructura API-Football v3
import { useState } from 'react';

function PlayerRow({ p, starter }) {
  const player = p.player ?? p;
  return (
    <div className={`flex items-center gap-2 text-sm ${starter ? 'text-white' : 'text-gray-500'}`}>
      <span className="w-6 text-right shrink-0 text-gray-600">{player.number}</span>
      <span className="flex-1 truncate">{player.name}</span>
      <span className="text-xs text-gray-600 shrink-0">{player.pos}</span>
    </div>
  );
}

function TeamLineup({ data }) {
  if (!data) return null;
  const starters = data.startXI ?? [];
  const subs     = data.substitutes ?? [];

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 mb-2">
        {data.team?.logo && <img src={data.team.logo} alt="" className="w-5 h-5 object-contain" />}
        <span className="font-semibold text-sm truncate">{data.team?.name}</span>
        {data.formation && <span className="text-gray-500 text-xs ml-auto">{data.formation}</span>}
      </div>

      <div className="space-y-1 mb-3">
        {starters.map((p, i) => <PlayerRow key={i} p={p} starter={true} />)}
        {!starters.length && <p className="text-gray-600 text-xs">No disponible</p>}
      </div>

      {subs.length > 0 && (
        <>
          <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Suplentes</p>
          <div className="space-y-1">
            {subs.map((p, i) => <PlayerRow key={i} p={p} starter={false} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default function LineupSection({ lineups = [] }) {
  const [open, setOpen] = useState(false);
  const [home, away]    = lineups;

  return (
    <div className="mt-4 border border-[#374151] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#1f2937] hover:bg-[#374151] transition text-sm font-semibold"
      >
        <span>📋 Alineaciones</span>
        <span className="text-gray-500 text-xs">{open ? '▲ cerrar' : '▼ ver'}</span>
      </button>

      {open && (
        <div className="p-4 bg-[#111827]">
          {!home && !away ? (
            <p className="text-gray-500 text-sm text-center">No disponibles aún</p>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <TeamLineup data={home} />
              <TeamLineup data={away} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
