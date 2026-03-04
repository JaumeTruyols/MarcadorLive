export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  const { id } = params;
  const KEY = "f3ff2f9d263c434b952481bd39181dc2";
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/matches/${id}`,
      { headers: { "X-Auth-Token": KEY } }
    );
    const data = await r.json();
    return new Response(JSON.stringify({ match: data }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error fetching match" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
