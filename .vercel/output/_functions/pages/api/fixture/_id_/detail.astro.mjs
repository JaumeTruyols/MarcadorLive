export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params }) => {
  const { id } = params;
  const KEY = undefined                            ;
  const headers = {
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
  };
  const BASE = "https://api-football-v1.p.rapidapi.com/v3";
  const [eventsRes, statsRes, lineupsRes] = await Promise.all([
    fetch(`${BASE}/fixtures/events?fixture=${id}`, { headers }),
    fetch(`${BASE}/fixtures/statistics?fixture=${id}`, { headers }),
    fetch(`${BASE}/fixtures/lineups?fixture=${id}`, { headers })
  ]);
  const [eventsData, statsData, lineupsData] = await Promise.all([
    eventsRes.json(),
    statsRes.json(),
    lineupsRes.json()
  ]);
  return new Response(
    JSON.stringify({
      events: eventsData.response ?? [],
      statistics: statsData.response ?? [],
      lineups: lineupsData.response ?? []
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
