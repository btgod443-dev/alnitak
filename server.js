import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/.well-known/stellar.toml", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.sendFile(path.join(__dirname, ".well-known", "stellar.toml"));
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 3000);
