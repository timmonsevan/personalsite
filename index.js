import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import names from "./data/names.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("tiny"));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render("index", { names });
});

app.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "resume/index.html"));
});

http.createServer(app).listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
