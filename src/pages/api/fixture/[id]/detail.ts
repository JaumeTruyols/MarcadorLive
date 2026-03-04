// src/pages/api/fixture/[id]/detail.ts
// Devuelve eventos, estadísticas y alineaciones de un partido
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const KEY  = import.meta.env.RAPIDAPI_KEY;

  const headers = {
    'X-RapidAPI-Key':  KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  };

  const BASE = 'https://api-football-v1.p.rapidapi.com/v3';
  const w    = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Hacemos 3 llamadas en paralelo (consumen 3 requests)
  const [eventsRes, statsRes, lineupsRes] = await Promise.all([
    fetch(`${BASE}/fixtures/events?fixture=${id}`,      { headers }),
    fetch(`${BASE}/fixtures/statistics?fixture=${id}`,  { headers }),
    fetch(`${BASE}/fixtures/lineups?fixture=${id}`,     { headers }),
  ]);

  const [eventsData, statsData, lineupsData] = await Promise.all([
    eventsRes.json(),
    statsRes.json(),
    lineupsRes.json(),
  ]);

  return new Response(
    JSON.stringify({
      events:     eventsData.response  ?? [],
      statistics: statsData.response   ?? [],
      lineups:    lineupsData.response ?? [],
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
