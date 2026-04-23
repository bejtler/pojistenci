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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});