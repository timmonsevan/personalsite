import { Router } from "express";
import { query } from "../db/index.js";

const router = Router();

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getVisitorId(req, res) {
  const visitorId = req.header("X-Visitor-Id");
  if (!visitorId || !UUID_RE.test(visitorId)) {
    res.status(400).json({ error: "Missing or invalid X-Visitor-Id header" });
    return null;
  }
  return visitorId;
}

router.get("/binder", async (req, res) => {
  const visitorId = getVisitorId(req, res);
  if (!visitorId) return;

  try {
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
    res.json({ cards: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch binder" });
  }
});

router.post("/binder", async (req, res) => {
  const visitorId = getVisitorId(req, res);
  if (!visitorId) return;

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
  } = req.body ?? {};

  if (!id || !name || !typeLine || !setCode || !setName || !rarity) {
    return res.status(400).json({ error: "Missing required card fields" });
  }

  try {
    await query(`INSERT INTO visitors (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`, [
      visitorId,
    ]);

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

    const result = await query(
      `INSERT INTO binder_entries (visitor_id, card_id)
       VALUES ($1, $2)
       ON CONFLICT (visitor_id, card_id) DO NOTHING
       RETURNING id`,
      [visitorId, id],
    );

    res
      .status(201)
      .json({ saved: true, alreadySaved: result.rows.length === 0 });
  } catch (err) {
    res.status(500).json({ error: "Failed to save card" });
  }
});

router.delete("/binder/:cardId", async (req, res) => {
  const visitorId = getVisitorId(req, res);
  if (!visitorId) return;

  const { cardId } = req.params;
  if (!UUID_RE.test(cardId)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  try {
    await query(
      `DELETE FROM binder_entries WHERE visitor_id = $1 AND card_id = $2`,
      [visitorId, cardId],
    );
    res.json({ removed: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove card" });
  }
});

export default router;
