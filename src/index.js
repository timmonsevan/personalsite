import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(
  morgan("tiny", { stream: { write: (msg) => console.log(msg.trim()) } }),
);
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "resume/index.html"));
});

http.createServer(app).listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
