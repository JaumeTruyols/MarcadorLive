// LeagueRow.jsx — football-data.org v4
import { useRef, useState, useEffect } from 'react';
import MatchCard from './MatchCard';

function CompLogo({ src, name }) {
  const [err, setErr] = useState(false);
  if (err || !src) return <span className="w-4 h-4 rounded-full bg-[#374151] shrink-0" />;
  return <img src={src} alt={name} className="w-4 h-4 object-contain shrink-0"
    onError={() => setErr(true)} />;
}

export default function LeagueRow({ code, name, emblem, matches, onStandings }) {
  const ref = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  function check() {
    const el = ref.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    check();
    const el = ref.current;
    el?.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { el?.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [matches]);

  const slide = (d) => ref.current?.scrollBy({ left: d * 320, behavior: 'smooth' });

  return (
    <div className="mb-6">
      {/* Cabecera */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <CompLogo src={emblem} name={name} />
        <span className="text-sm font-bold text-gray-200 flex-1 truncate">{name}</span>
        <span className="text-gray-600 text-xs">{matches.length} partidos</span>
        {/* Botón clasificación */}
        {code && onStandings && (
          <button onClick={() => onStandings(code)}
            className="text-[10px] text-gray-500 hover:text-green-400 transition border border-[#374151] hover:border-green-500/40 px-2 py-0.5 rounded-full">
            Tabla →
          </button>
        )}
        {/* Flechas desktop */}
        <div className="hidden sm:flex gap-1 ml-1">
          {[[-1,'‹'],[1,'›']].map(([d,lbl]) => (
            <button key={d} onClick={() => slide(d)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold border transition
                ${(d === -1 ? canL : canR)
                  ? 'bg-[#1f2937] border-[#374151] text-white hover:bg-[#374151]'
                  : 'bg-transparent border-transparent text-gray-700 cursor-default'}`}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative">
        {canL && <button onClick={() => slide(-1)}
          className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0a0f1a]/90 border border-[#374151] text-white flex items-center justify-center shadow-lg">‹</button>}

        <div ref={ref} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
          {matches.map(m => (
            <div key={m.id} className="shrink-0 w-[300px] sm:w-[320px]">
              <MatchCard match={m} />
            </div>
          ))}
        </div>

        {canR && <button onClick={() => slide(1)}
          className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0a0f1a]/90 border border-[#374151] text-white flex items-center justify-center shadow-lg">›</button>}
        {canR && <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0a0f1a] to-transparent" />}
        {canL && <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0a0f1a] to-transparent" />}
      </div>
    </div>
  );
}
