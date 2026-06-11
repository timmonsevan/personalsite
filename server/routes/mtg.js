import { Router } from "express";
import axios from "axios";

const router = Router();

const MTG_API_URL = "https://api.scryfall.com/cards/random";

router.get("/mtg-random-card", async (req, res) => {
  try {
    const response = await axios.get(MTG_API_URL);
    const imageUrl =
      response.data.image_uris?.normal ??
      response.data.card_faces?.[0]?.image_uris?.normal;
    const name = response.data.name;
    res.json({ imageUrl, name });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

export default router;
