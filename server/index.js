import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import mtgRouter from "./routes/mtg.js";
import timeRouter from "./routes/time.js";

const app = express();
app.set("trust proxy", true);

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGIN ||
  "https://personalsite-aclx.onrender.com,https://www.evantimmons.space,https://evantimmons.space"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: CLIENT_ORIGINS }));
app.use(morgan("tiny"));

app.use("/api", mtgRouter);
app.use("/api", timeRouter);

http.createServer(app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
