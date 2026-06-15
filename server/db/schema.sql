-- Visitors: identified by a client-generated UUID stored in localStorage
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cards: Scryfall card data cached by Scryfall's own card id (UUID)
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  mana_cost TEXT,
  type_line TEXT NOT NULL,
  set_code TEXT NOT NULL,
  set_name TEXT NOT NULL,
  rarity TEXT NOT NULL,
  colors TEXT[]
);

-- Binder entries: many-to-many join between visitors and cards
CREATE TABLE IF NOT EXISTS binder_entries (
  id BIGSERIAL PRIMARY KEY,
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (visitor_id, card_id)
);

CREATE INDEX IF NOT EXISTS idx_binder_entries_visitor ON binder_entries(visitor_id);
