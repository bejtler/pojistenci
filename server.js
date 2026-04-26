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
    console.error("DB ERROR:", err);
    res.status(500).send(err.message); // 👈 TOTO
  }
});

app.post("/pojistenci", async (req, res) => {
  try {
    const { jmeno, prijmeni, email } = req.body;

    const result = await pool.query(
      "INSERT INTO pojistenci (jmeno, prijmeni, email) VALUES ($1, $2, $3) RETURNING *",
      [jmeno, prijmeni, email]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});