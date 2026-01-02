import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ✅ CORS for Stellar + public fetchers */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/* ✅ Serve stellar.toml as plain text */
app.get("/.well-known/stellar.toml", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, ".well-known", "stellar.toml"));
});

/* ✅ Static website */
app.use(express.static(path.join(__dirname, "public")));

/* ✅ Homepage fallback */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
