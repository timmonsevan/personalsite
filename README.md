# Personal portfolio website for Evan Timmons

A personal portfolio site with a React frontend and an Express.js backend, organized as a two-package monorepo (`client/` and `server/`).

## Architecture

```
client/  (React + Vite)  --->  server/  (Express.js API)  --->  Postgres
  fetch("/api/...")              GET /api/current-time      -> timeapi.io
                                  GET /api/mtg-random-card   -> api.scryfall.com
                                  /api/binder*                -> visitors/cards/binder_entries
```

- **client/** - React 19 single-page app built with Vite and routed with `react-router-dom`. Talks to the backend over `/api/*` (proxied to `http://localhost:3000` in dev via `vite.config.js`, or `VITE_API_URL` in production).
- **server/** - Express.js API that proxies a couple of third-party services so the frontend doesn't need to manage API keys/CORS for them directly, and owns a small Postgres-backed "card binder" feature. Configured with `cors` (allow-listed client origins), `morgan` request logging, and JSON body parsing.

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
      CardBinder.jsx       # Visitor's saved-card collection (see below)
    pages/
      HomePage.jsx         # Landing page, renders MtgCard and CardBinder
      ResumePage.jsx        # Resume content
    utils/
      visitorId.js          # Get-or-create a per-browser UUID in localStorage

server/
  index.js               # Express app setup, CORS, logging, route mounting
  db/
    schema.sql            # Postgres DDL (visitors, cards, binder_entries)
    index.js               # pg Pool + query helper
    migrate.js             # Runs schema.sql against DATABASE_URL
  routes/
    time.js               # GET /api/current-time
    mtg.js                # GET /api/mtg-random-card
    binder.js             # /api/binder routes (per-visitor card collection)
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
- The server proxies `api.scryfall.com/cards/random` and returns the card's `id`, `name`, `imageUrl`, `manaCost`, `typeLine`, `setCode`, `setName`, `rarity`, and `colors` (falling back to the first card face's data for double-faced cards).
- The component shows a loading state while fetching, then displays the card art with a **Save to Binder** button, or an error message if the request fails.
- "Save to Binder" `POST`s the drawn card to `/api/binder` so it shows up in the visitor's `CardBinder`.

### `CardBinder.jsx`

Displays the current visitor's saved-card collection on the home page.

- Each browser gets a UUID (`crypto.randomUUID()`) generated on first use and stored in `localStorage` (`client/src/utils/visitorId.js`), sent as an `X-Visitor-Id` header on every binder request - this is how the binder is scoped per-visitor with no real authentication.
- On mount, calls `GET /api/binder` and renders the returned cards in a responsive grid.
- Each card has a **Remove** button that calls `DELETE /api/binder/:cardId`.
- Backed by Postgres: a normalized `cards` table (cached Scryfall data, keyed by Scryfall's card `id`) and a `binder_entries` join table (`visitor_id` + `card_id`, unique per pair) - see `server/db/schema.sql`.

## Backend routes

| Method | Path                  | Description                                                                 |
| ------ | --------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/current-time`   | Returns current date/time and timezone, geolocated by request IP via timeapi.io (falls back to UTC for private/local IPs) |
| GET    | `/api/mtg-random-card`| Returns card data (`id, name, imageUrl, manaCost, typeLine, setCode, setName, rarity, colors`) for a random Magic card via the Scryfall API |
| GET    | `/api/binder`         | Returns `{ cards: [...] }` saved by the visitor (requires `X-Visitor-Id` header) |
| POST   | `/api/binder`         | Saves a card (body = `/api/mtg-random-card` response shape) to the visitor's binder (requires `X-Visitor-Id` header) |
| DELETE | `/api/binder/:cardId` | Removes a card from the visitor's binder (requires `X-Visitor-Id` header) |

## Running locally

**Database**: the card binder needs a Postgres database.

1. Create a free Postgres instance (e.g. [Neon](https://neon.tech) or [Supabase](https://supabase.com)) and copy its connection string.
2. In `server/`, create a `.env` file (gitignored) with:
   ```
   DATABASE_URL=postgres://user:password@host:port/dbname
   ```
3. From `server/`, run `npm run migrate` to create the `visitors`, `cards`, and `binder_entries` tables.

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

- **server**: `PORT` (default `3000`), `CLIENT_ORIGIN` (comma-separated list of allowed CORS origins; defaults to the production frontend URLs), `DATABASE_URL` (Postgres connection string used by the card binder)
- **client**: `VITE_API_URL` (base URL of the API in production; unset/empty in dev so the Vite proxy handles `/api/*`)
