# ⚽ Marcador

> Resultados, clasificaciones y estadísticas de fútbol en tiempo real.

Aplicación web construida con **Astro + React + Tailwind CSS**, conectada a la API de [football-data.org](https://www.football-data.org). Diseño oscuro estilo SofaScore/FlashScore, con sidebar fija, partidos en vivo, fichas de equipo y jugador, goleadores y navegación por jornadas.

---

## 🖥️ Demo

> Desplegado en Vercel → _añade aquí tu URL cuando lo subas_

---

## ✨ Funcionalidades

| Página | Ruta | Estado |
|---|---|---|
| Partidos del día | `/` | ✅ |
| Clasificación de liga | `/clasificacion/PD` | ✅ |
| Goleadores | `/clasificacion/PD/goleadores` | ✅ |
| Partidos de una jornada | `/clasificacion/PD/jornada/28` | ✅ |
| Ficha de equipo | `/equipo/86` | ✅ |
| Ficha de jugador | `/jugador/44` | ✅ |
| Explorador de API | `/explorador` | ✅ dev |

**Ligas disponibles:** Champions · Europa League · LaLiga · Premier League · Serie A · Bundesliga · Ligue 1 · Eredivisie · Championship · Primeira Liga · Libertadores · Mundial · Eurocopa · Serie A Brasil

---

## 🚀 Inicio rápido

### 1. Requisitos

- [Node.js](https://nodejs.org) v18 o superior
- Cuenta gratuita en [football-data.org](https://www.football-data.org/client/register)

### 2. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/marcador.git
cd marcador
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y añade tu API key:

```
FOOTBALL_API_KEY=pon_aqui_tu_api_key
```

### 4. Arrancar en local

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 🔑 API key gratuita

1. Regístrate en [football-data.org/client/register](https://www.football-data.org/client/register)
2. Recibirás la key por email
3. Plan gratuito incluye: **sin límite diario**, 10 peticiones/minuto, 14 competiciones

---

## 📁 Estructura del proyecto

```
marcador/
├── src/
│   ├── components/
│   │   ├── MatchCard.jsx        # Tarjeta de partido con marcador y goles
│   │   ├── MatchesSection.jsx   # Lista de partidos con filtro por liga
│   │   ├── LeagueFilter.jsx     # Filtro de competiciones
│   │   └── LeagueRow.jsx        # Fila de liga expandible
│   ├── layouts/
│   │   └── Layout.astro         # Layout global con sidebar + SEO
│   ├── lib/
│   │   ├── api.js               # Fetch centralizado con manejo de errores
│   │   ├── endpoints.js         # Todas las llamadas a football-data.org
│   │   ├── cache.js             # Caché en 2 capas: memoria + archivo JSON
│   │   └── leagues.js           # Configuración de ligas y competiciones
│   ├── pages/
│   │   ├── index.astro                          # Home — partidos del día
│   │   ├── clasificacion/
│   │   │   ├── [code].astro                     # Clasificación de una liga
│   │   │   └── [code]/
│   │   │       ├── goleadores.astro             # Top goleadores
│   │   │       └── jornada/[day].astro          # Partidos de una jornada
│   │   ├── equipo/[id].astro                    # Ficha de equipo
│   │   ├── jugador/[id].astro                   # Ficha de jugador
│   │   └── explorador.astro                     # Dev: explorador de la API
│   └── styles/
│       └── global.css
├── .cache/                      # Caché local (generado, en .gitignore)
├── .env.example                 # Plantilla de variables de entorno
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build en local |

---

## 🗄️ Sistema de caché

Para respetar el límite de 10 req/min de la API, todas las llamadas pasan por un sistema de caché en dos capas:

| Capa | Entorno | Descripción |
|---|---|---|
| Memoria (`globalThis`) | Local + Vercel | Ultra rápida, se pierde al reiniciar |
| Archivo (`.cache/futbol.json`) | Solo local | Persiste entre reinicios del servidor |

**TTLs configurados:**

| Dato | TTL |
|---|---|
| Partidos en vivo | 30 segundos |
| Partidos del día | 2 minutos |
| Clasificaciones | 1 hora |
| Jugadores / Equipos | 24 horas |

---

## 🚢 Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Entra en [vercel.com](https://vercel.com) → **New Project** → importa tu repo
3. En **Environment Variables** añade `FOOTBALL_API_KEY` con tu key
4. **Deploy** — Vercel detecta Astro automáticamente

En Vercel el caché funciona solo en memoria (serverless no tiene disco persistente).

---

## 🧰 Stack

- **[Astro 5](https://astro.build)** — framework SSR, genera HTML en el servidor
- **[React 18](https://react.dev)** — componentes interactivos (MatchCard, filtros)
- **[Tailwind CSS 4](https://tailwindcss.com)** — estilos utility-first
- **[football-data.org](https://www.football-data.org)** — API de datos de fútbol
- **[Vercel](https://vercel.com)** — hosting y despliegue

---

## 📄 Licencia

MIT — úsalo, modifícalo y mejóralo libremente.
