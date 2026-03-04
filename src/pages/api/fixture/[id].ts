// src/pages/api/fixture/[id].ts
// Devuelve datos actualizados de un partido por ID (usado para polling en vivo)
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const KEY = import.meta.env.RAPIDAPI_KEY;

  const r = await fetch(
    `https://free-api-live-football-data.p.rapidapi.com/football-get-match-events?matchid=${id}`,
    {
      headers: {
        'X-RapidAPI-Key':  KEY,
        'X-RapidAPI-Host': 'free-api-live-football-data.p.rapidapi.com',
      },
    }
  );

  const data = await r.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
