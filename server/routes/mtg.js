import { Router } from "express";
import axios from "axios";

const router = Router();

const RANDOM_MTG_API_URL = "https://api.scryfall.com/cards/random";
const NAMED_MTG_API_URL = "https://api.scryfall.com/cards/named";
const SEARCH_MTG_API_URL = "https://api.scryfall.com/cards/search";

function mapCardResponse(card) {
  const face = card.card_faces?.[0];
  return {
    id: card.id,
    oracleId: card.oracle_id ?? face?.oracle_id,
    name: card.name,
    imageUrl: card.image_uris?.normal ?? face?.image_uris?.normal,
    manaCost: card.mana_cost || face?.mana_cost || null,
    typeLine: card.type_line,
    setCode: card.set,
    setName: card.set_name,
    rarity: card.rarity,
    colors: card.colors ?? face?.colors ?? [],
  };
}

router.get("/mtg-random-card", async (req, res) => {
  try {
    const response = await axios.get(RANDOM_MTG_API_URL);
    res.json(mapCardResponse(response.data));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

router.get("/mtg-named-card", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Missing card name" });
  }
  try {
    const response = await axios.get(NAMED_MTG_API_URL, {
      params: { fuzzy: name },
    });
    res.json(mapCardResponse(response.data));
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

router.get("/mtg-card-prints", async (req, res) => {
  const { oracleId } = req.query;
  if (!oracleId) {
    return res.status(400).json({ error: "Missing oracleId" });
  }
  try {
    const response = await axios.get(SEARCH_MTG_API_URL, {
      params: { q: `oracleid:${oracleId}`, unique: "prints", order: "set" },
    });
    const prints = response.data.data.map((card) => ({
      id: card.id,
      setCode: card.set,
      setName: card.set_name,
      rarity: card.rarity,
      releasedAt: card.released_at,
      collectorNumber: card.collector_number,
      imageUrl:
        card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal,
    }));
    res.json({ prints });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "No prints found" });
    }
    res.status(500).json({ error: "Failed to fetch card prints" });
  }
});

export default router;
