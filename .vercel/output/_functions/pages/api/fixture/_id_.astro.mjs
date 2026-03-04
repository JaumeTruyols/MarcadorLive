export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  const { id } = params;
  const KEY = undefined                            ;
  const r = await fetch(
    `https://free-api-live-football-data.p.rapidapi.com/football-get-match-events?matchid=${id}`,
    {
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com"
      }
    }
  );
  const data = await r.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
