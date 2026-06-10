import express from "express";
import morgan from "morgan";
import http from "http";
import https from "https";
import axios from "axios";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { error } from "console";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const mtg_api_call = {
  hostname: "https://api.scryfall.com",
  path: "/cards/random",
  method: "GET",
};
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://your-react-app.onrender.com";

app.use(cors({ origin: CLIENT_ORIGIN }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("tiny"));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/mtg-random-card", async (req, res) => {
  try {
    const response = await axios.get(mtg_api_call.hostname + mtg_api_call.path);
    const imageUrl =
      response.data.image_uris?.normal ??
      response.data.card_faces?.[0]?.image_uris?.normal;
    const name = response.data.name;
    res.json({ imageUrl, name });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

app.get("/resume", (req, res) => {
  res.render("resume");
});

http.createServer(app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
