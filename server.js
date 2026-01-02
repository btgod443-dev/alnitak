import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve stellar.toml correctly
app.get("/.well-known/stellar.toml", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, ".well-known", "stellar.toml"));
});

// Serve static website
app.use(express.static(path.join(__dirname, "public")));

// Fallback for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
