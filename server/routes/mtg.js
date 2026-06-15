import { Router } from "express";
import axios from "axios";

const router = Router();

const MTG_API_URL = "https://api.scryfall.com/cards/random";

router.get("/mtg-random-card", async (req, res) => {
  try {
    const response = await axios.get(MTG_API_URL);
    const card = response.data;
    const face = card.card_faces?.[0];
    res.json({
      id: card.id,
      name: card.name,
      imageUrl: card.image_uris?.normal ?? face?.image_uris?.normal,
      manaCost: card.mana_cost || face?.mana_cost || null,
      typeLine: card.type_line,
      setCode: card.set,
      setName: card.set_name,
      rarity: card.rarity,
      colors: card.colors ?? face?.colors ?? [],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

export default router;
