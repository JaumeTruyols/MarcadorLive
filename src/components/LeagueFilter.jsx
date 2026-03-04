// components/LeagueFilter.jsx
import { useState, useRef, useEffect } from 'react';

export default function LeagueFilter({ leagues = [], activeId, onSelect }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  const safeLeagues = Array.isArray(leagues) ? leagues : [];

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [safeLeagues]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || activeId === 'all') return;
    const btn = el.querySelector(`[data-id="${activeId}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  function slide(dir) {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  }

  return (
    <div className="relative flex items-center gap-1 mb-6">

      <button
        onClick={() => slide(-1)}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          bg-[#1f2937] border border-[#374151] text-gray-400 transition-all
          ${canLeft ? 'opacity-100 hover:text-white' : 'opacity-0 pointer-events-none'}`}
      >‹</button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          data-id="all"
          onClick={() => onSelect('all')}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
            border transition-all whitespace-nowrap
            ${activeId === 'all'
              ? 'bg-green-500/20 border-green-500/60 text-green-400'
              : 'bg-[#1f2937] border-[#374151] text-gray-400 hover:text-white'}`}
        >
          ⚽ Todos
        </button>

        {safeLeagues.map(({ id, name, logo, count }) => (
          <button
            key={id}
            data-id={id}
            onClick={() => onSelect(id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              border transition-all whitespace-nowrap
              ${String(activeId) === String(id)
                ? 'bg-white/10 border-white/30 text-white'
                : 'bg-[#1f2937] border-[#374151] text-gray-400 hover:text-white'}`}
          >
            {logo && (
              <img src={logo} alt="" className="w-4 h-4 object-contain"
                onError={e => e.target.style.display = 'none'} />
            )}
            <span>{name ?? `Liga ${id}`}</span>
            {count != null && (
              <span className="text-gray-600 text-xs">{count}</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => slide(1)}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          bg-[#1f2937] border border-[#374151] text-gray-400 transition-all
          ${canRight ? 'opacity-100 hover:text-white' : 'opacity-0 pointer-events-none'}`}
      >›</button>
    </div>
  );
}
