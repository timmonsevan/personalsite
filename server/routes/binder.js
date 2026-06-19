import { Router } from "express";
import {
  getBinderCards,
  upsertVisitor,
  upsertCard,
  addBinderEntry,
  removeBinderEntry,
} from "../repo/binderRepo.js";

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
    const cards = await getBinderCards(visitorId);
    res.json({ cards });
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
    await upsertVisitor(visitorId);
    await upsertCard({
      id,
      name,
      imageUrl,
      manaCost,
      typeLine,
      setCode,
      setName,
      rarity,
      colors,
    });
    const inserted = await addBinderEntry(visitorId, id);

    res.status(201).json({ saved: true, alreadySaved: !inserted });
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
    await removeBinderEntry(visitorId, cardId);
    res.json({ removed: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove card" });
  }
});

export default router;
