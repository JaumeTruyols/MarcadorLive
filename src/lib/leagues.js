// lib/leagues.js — football-data.org v4
// Fuente oficial: https://www.football-data.org/coverage

export const COMPETITIONS = [
  // ── Top 5 Europa ──────────────────────────────────────────────────────────
  { code: 'PD',  name: 'LaLiga',          short: 'LaLiga',   country: 'España',      flag: '🇪🇸', priority: 1 },
  { code: 'PL',  name: 'Premier League',  short: 'Premier',  country: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', priority: 2 },
  { code: 'SA',  name: 'Serie A',         short: 'Serie A',  country: 'Italia',      flag: '🇮🇹', priority: 3 },
  { code: 'BL1', name: 'Bundesliga',      short: 'Bundes.',  country: 'Alemania',    flag: '🇩🇪', priority: 4 },
  { code: 'FL1', name: 'Ligue 1',         short: 'Ligue 1',  country: 'Francia',     flag: '🇫🇷', priority: 5 },
  // ── Otras ligas europeas ──────────────────────────────────────────────────
  { code: 'PPL', name: 'Primeira Liga',   short: 'Liga PT',  country: 'Portugal',    flag: '🇵🇹', priority: 6 },
  { code: 'DED', name: 'Eredivisie',      short: 'Erediv.',  country: 'Holanda',     flag: '🇳🇱', priority: 7 },
  { code: 'ELC', name: 'Championship',   short: 'Champ.',   country: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', priority: 8 },
  // ── Competiciones europeas ─────────────────────────────────────────────────
  { code: 'CL',  name: 'Champions League', short: 'UCL',    country: 'Europa',      flag: '🏆', priority: 1 },
  { code: 'EL',  name: 'Europa League',    short: 'UEL',    country: 'Europa',      flag: '🥈', priority: 2 },
  { code: 'EC',  name: 'Eurocopa',         short: 'EURO',   country: 'Europa',      flag: '🇪🇺', priority: 3 },
  // ── Mundial y América ─────────────────────────────────────────────────────
  { code: 'WC',  name: 'World Cup',        short: 'Mundial', country: 'Mundial',    flag: '🌍', priority: 1 },
  { code: 'BSA', name: 'Serie A Brasil',   short: 'Brasil',  country: 'Brasil',     flag: '🇧🇷', priority: 9 },
  { code: 'CLI', name: 'Copa Libertadores',short: 'Libert.', country: 'América',    flag: '🌎', priority: 10 },
];

// Mapa rápido code → competition
export const COMPETITION_BY_CODE = new Map(COMPETITIONS.map(c => [c.code, c]));

// Códigos para la carga de partidos del día
// Ordenados por prioridad para que Champions y ligas top salgan primero
export const FREE_COMPETITION_CODES = [
  'CL','PD','PL','SA','BL1','FL1','EL','PPL','DED','ELC','EC','WC','BSA','CLI'
];

export function teamCrest(teamId) {
  if (!teamId) return null;
  return `https://crests.football-data.org/${teamId}.png`;
}

export function competitionEmblem(code) {
  if (!code) return null;
  return `https://crests.football-data.org/${code}.png`;
}
