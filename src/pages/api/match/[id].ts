// src/pages/api/match/[id].ts
// Devuelve datos actualizados de un partido por ID — usado para polling en vivo
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const KEY = import.meta.env.FOOTBALL_API_KEY;

  try {
    const r = await fetch(
      `https://api.football-data.org/v4/matches/${id}`,
      { headers: { 'X-Auth-Token': KEY } }
    );
    const data = await r.json();
    return new Response(JSON.stringify({ match: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error fetching match' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
