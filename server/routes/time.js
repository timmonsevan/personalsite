import { Router } from "express";
import axios from "axios";

const router = Router();

const TIMEAPI_BASE_URL = "https://timeapi.io/api/Time/current";

function isPrivateIp(ip) {
  if (!ip) return true;
  const address = ip.replace(/^::ffff:/, "");
  return (
    address === "::1" ||
    address === "127.0.0.1" ||
    /^10\./.test(address) ||
    /^192\.168\./.test(address) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(address)
  );
}

router.get("/current-time", async (req, res) => {
  try {
    const ip = req.ip.replace(/^::ffff:/, "");
    const response = isPrivateIp(ip)
      ? await axios.get(`${TIMEAPI_BASE_URL}/zone`, {
          params: { timeZone: "UTC" },
        })
      : await axios.get(`${TIMEAPI_BASE_URL}/ip`, {
          params: { ipAddress: ip },
        });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch time" });
  }
});

export default router;
