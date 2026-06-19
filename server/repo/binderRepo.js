import { query } from "../db/index.js";

export async function getBinderCards(visitorId) {
  const result = await query(
    `SELECT cards.id, cards.name, cards.image_url, cards.mana_cost,
            cards.type_line, cards.set_code, cards.set_name, cards.rarity,
            cards.colors, binder_entries.saved_at
     FROM binder_entries
     JOIN cards ON cards.id = binder_entries.card_id
     WHERE binder_entries.visitor_id = $1
     ORDER BY binder_entries.saved_at DESC`,
    [visitorId],
  );
  return result.rows;
}

export async function upsertVisitor(visitorId) {
  await query(`INSERT INTO visitors (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`, [
    visitorId,
  ]);
}

export async function upsertCard(card) {
  const {
    id,
    name,
    imageUrl,
    manaCost,
    typeLine,
    setCode,
    setName,
    rarity,
    colors,
  } = card;

  await query(
    `INSERT INTO cards (id, name, image_url, mana_cost, type_line, set_code, set_name, rarity, colors)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO NOTHING`,
    [
      id,
      name,
      imageUrl ?? null,
      manaCost ?? null,
      typeLine,
      setCode,
      setName,
      rarity,
      colors ?? [],
    ],
  );
}

export async function addBinderEntry(visitorId, cardId) {
  const result = await query(
    `INSERT INTO binder_entries (visitor_id, card_id)
     VALUES ($1, $2)
     ON CONFLICT (visitor_id, card_id) DO NOTHING
     RETURNING id`,
    [visitorId, cardId],
  );
  return result.rows.length > 0;
}

export async function removeBinderEntry(visitorId, cardId) {
  await query(
    `DELETE FROM binder_entries WHERE visitor_id = $1 AND card_id = $2`,
    [visitorId, cardId],
  );
}
