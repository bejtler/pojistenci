import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

// 🔧 NOVÉ – pro práci s cestami (ES modules)
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const { Pool } = pg;

// 🔧 NOVÉ – __dirname workaround pro ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔌 DB připojení
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// middleware
app.use(cors());
app.use(express.json());

// 🔧 NOVÉ – statické soubory (frontend)
app.use(express.static(path.join(__dirname, "public")));

// 🔧 NOVÉ – hlavní stránka (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint – pojištěnci
app.get("/pojistenci", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pojistenci ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Chyba databáze");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});