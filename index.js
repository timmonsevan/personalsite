import express from "express";

process.on("exit", (code) => console.log("Process exiting with code:", code));
process.on("uncaughtException", (err) => console.error("Uncaught exception:", err));
process.on("unhandledRejection", (reason) => console.error("Unhandled rejection:", reason));
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
