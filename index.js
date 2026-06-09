import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(`GET ${__dirname} ../index.html`);
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/resume", (req, res) => {
  console.log(`GET ${__dirname} ../resume/index.html`);
  res.sendFile(path.join(__dirname, "../resume/index.html"));
});

http.createServer(app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
