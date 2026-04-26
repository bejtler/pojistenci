import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// test endpoint
app.get("/", (req, res) => {
  res.send("API běží");
});

// 🔥 TADY je endpoint (máš ho správně umístěný)
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