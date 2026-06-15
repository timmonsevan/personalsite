# Personal portfolio website for Evan Timmons

A personal portfolio site with a React frontend and an Express.js backend, organized as a two-package monorepo (`client/` and `server/`).

## Architecture

```
client/  (React + Vite)  --->  server/  (Express.js API)
  fetch("/api/...")              GET /api/current-time  -> timeapi.io
                                  GET /api/mtg-random-card -> api.scryfall.com
```

- **client/** - React 19 single-page app built with Vite and routed with `react-router-dom`. Talks to the backend over `/api/*` (proxied to `http://localhost:3000` in dev via `vite.config.js`, or `VITE_API_URL` in production).
- **server/** - Express.js API that proxies a couple of third-party services so the frontend doesn't need to manage API keys/CORS for them directly. Configured with `cors` (allow-listed client origins) and `morgan` request logging.

## Project structure

```
client/
  src/
    App.jsx              # Top-level routes (/, /resume)
    main.jsx             # React entry point
    components/
      Header.jsx          # Nav bar, light/dark theme toggle, hosts ClockWidget
      Footer.jsx           # Contact info
      ParallaxBackground.jsx
      ClockWidget.jsx      # Live local-time widget (see below)
      MtgCard.jsx          # Random Magic: The Gathering card widget (see below)
    pages/
      HomePage.jsx         # Landing page, renders MtgCard
      ResumePage.jsx        # Resume content

server/
  index.js               # Express app setup, CORS, logging, route mounting
  routes/
    time.js               # GET /api/current-time
    mtg.js                # GET /api/mtg-random-card
```

## Major components

### `ClockWidget.jsx`

Displays the visitor's local date, time, and timezone in the header.

- On mount, calls `GET /api/current-time`.
- The server geolocates the request by IP (via `timeapi.io`) and returns the date/time fields plus an IANA `timeZone`.
- The component seeds a `Date` from that response, then runs a `setInterval` to tick the displayed time forward every second client-side (no further polling).
- Renders `null` if the request fails or before the initial time has loaded.

### `MtgCard.jsx`

A "draw a random Magic: The Gathering card" widget on the home page.

- On button click, calls `GET /api/mtg-random-card`.
- The server proxies `api.scryfall.com/cards/random` and returns the card's `name` and an `imageUrl` (falling back to the first card face's image for double-faced cards).
- The component shows a loading state while fetching, then displays the card art, or an error message if the request fails.

## Backend routes

| Method | Path                  | Description                                                                 |
| ------ | --------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/current-time`   | Returns current date/time and timezone, geolocated by request IP via timeapi.io (falls back to UTC for private/local IPs) |
| GET    | `/api/mtg-random-card`| Returns `{ imageUrl, name }` for a random Magic card via the Scryfall API    |

## Running locally

**Backend** (from `server/`):

```bash
npm install
npm start
```

Runs on `http://localhost:3000` by default (`PORT` env var to override).

**Frontend** (from `client/`):

```bash
npm install
npm run dev
```

Runs the Vite dev server, proxying `/api/*` requests to `http://localhost:3000`.

## Environment variables

- **server**: `PORT` (default `3000`), `CLIENT_ORIGIN` (comma-separated list of allowed CORS origins; defaults to the production frontend URLs)
- **client**: `VITE_API_URL` (base URL of the API in production; unset/empty in dev so the Vite proxy handles `/api/*`)
