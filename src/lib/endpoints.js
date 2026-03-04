// lib/endpoints.js — football-data.org v4
import { apiFetch, wait } from './api.js';
import { cached, TTL }    from './cache.js';
import { FREE_COMPETITION_CODES, COMPETITION_BY_CODE } from './leagues.js';

const arr = v => Array.isArray(v) ? v : [];

// ─── PARTIDOS ─────────────────────────────────────────────────────────────────

/**
 * Partidos de un día para TODAS las competiciones gratuitas.
 * Plan TIER_ONE: no permite /matches?competitions= múltiple.
 * Solución: una llamada por liga, resultado unificado y cacheado.
 */
export async function getMatchesByDate(date) {
  return cached(`matches-${date}`, async () => {
    const all = [];
    for (const code of FREE_COMPETITION_CODES) {
      try {
        const comp = COMPETITION_BY_CODE.get(code);
        const res  = await apiFetch(`/competitions/${code}/matches?dateFrom=${date}&dateTo=${date}`);
        const matches = arr(res.matches).map(m => ({
          ...m,
          competition: {
            code,
            name:   m.competition?.name   ?? comp?.name ?? code,
            emblem: m.competition?.emblem ?? `https://crests.football-data.org/${code}.png`,
            ...m.competition,
          },
        }));
        all.push(...matches);
      } catch {}
      await wait(120); // respetamos 10 req/min
    }
    return all.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
  }, TTL.TODAY);
}

/**
 * Partidos en vivo de todas las ligas.
 */
export async function getLiveMatches() {
  return cached('live', async () => {
    const all = [];
    for (const code of FREE_COMPETITION_CODES) {
      try {
        const res = await apiFetch(`/competitions/${code}/matches?status=IN_PLAY,PAUSED`);
        all.push(...arr(res.matches));
      } catch {}
      await wait(120);
    }
    return all;
  }, TTL.LIVE);
}

/**
 * Detalle completo de un partido (incluye goals, odds, etc.)
 */
export async function getMatchDetail(matchId) {
  return cached(`match-${matchId}`, async () => {
    return await apiFetch(`/matches/${matchId}`) ?? {};
  }, TTL.LIVE);
}

// ─── COMPETICIONES ────────────────────────────────────────────────────────────

export async function getCompetitions() {
  return cached('competitions', async () => {
    const res = await apiFetch('/competitions');
    return arr(res.competitions);
  }, TTL.STANDINGS);
}

/**
 * Clasificación. Devuelve standings[].table[]
 * table[i]: { position, team, playedGames, won, draw, lost,
 *             points, goalsFor, goalsAgainst, goalDifference, form }
 */
export async function getStandings(code) {
  return cached(`standings-${code}`, async () => {
    return await apiFetch(`/competitions/${code}/standings`) ?? {};
  }, TTL.STANDINGS);
}

/**
 * Partidos de una competición con filtros opcionales.
 * params: 'matchday=5' | 'status=SCHEDULED' | 'dateFrom=...&dateTo=...'
 */
export async function getCompetitionMatches(code, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`comp-matches-${code}-${params}`, async () => {
    const res = await apiFetch(`/competitions/${code}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}

/**
 * Goleadores de una competición.
 * scorers[i]: { position, player: { id, name, nationality, dateOfBirth },
 *               team: { id, name, crest }, goals, assists, penalties }
 */
export async function getScorers(code, limit = 20) {
  return cached(`scorers-${code}-${limit}`, async () => {
    const res = await apiFetch(`/competitions/${code}/scorers?limit=${limit}`);
    return {
      scorers:     arr(res.scorers),
      competition: res.competition ?? {},
      season:      res.season ?? {},
    };
  }, TTL.STANDINGS);
}

/**
 * Equipos de una competición.
 * teams[i]: { id, name, shortName, tla, crest, address, website,
 *             founded, clubColors, venue, coach, squad[] }
 */
export async function getCompetitionTeams(code) {
  return cached(`teams-${code}`, async () => {
    const res = await apiFetch(`/competitions/${code}/teams`);
    return arr(res.teams);
  }, TTL.STANDINGS);
}

// ─── EQUIPOS ──────────────────────────────────────────────────────────────────

/**
 * Info de un equipo: nombre, escudo, estadio, colores, entrenador, plantilla.
 * team.squad[]: { id, name, position, dateOfBirth, nationality, shirtNumber }
 * team.coach:   { id, name, nationality, dateOfBirth, contract }
 */
export async function getTeam(teamId) {
  return cached(`team-${teamId}`, async () => {
    return await apiFetch(`/teams/${teamId}`) ?? {};
  }, TTL.PLAYERS);
}

/**
 * Partidos de un equipo.
 * params: 'status=FINISHED&limit=10' | 'status=SCHEDULED&limit=5'
 */
export async function getTeamMatches(teamId, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`team-matches-${teamId}-${params}`, async () => {
    const res = await apiFetch(`/teams/${teamId}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}

// ─── JUGADORES / PERSONAS ─────────────────────────────────────────────────────

/**
 * Info de un jugador:
 * { id, name, firstName, lastName, dateOfBirth, nationality,
 *   section, position, shirtNumber, lastUpdated,
 *   currentTeam: { id, name, shortName, tla, crest, contract } }
 */
export async function getPerson(personId) {
  return cached(`person-${personId}`, async () => {
    return await apiFetch(`/persons/${personId}`) ?? {};
  }, TTL.PLAYERS);
}

/**
 * Partidos de un jugador.
 * params: 'limit=20' | 'competitions=PD,CL'
 */
export async function getPersonMatches(personId, params = '') {
  const qs = params ? `?${params}` : '';
  return cached(`person-matches-${personId}-${params}`, async () => {
    const res = await apiFetch(`/persons/${personId}/matches${qs}`);
    return arr(res.matches);
  }, TTL.TODAY);
}
