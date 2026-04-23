// =======================
// PostgreSQL klient (Neon)
// =======================
import pg from "https://esm.sh/pg@8.11.3";

const { Pool } = pg;

// ⚠️ dej do .env v reálném projektu
const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL, // nebo process.env v Node
  ssl: { rejectUnauthorized: false },
});

// =======================
// Funkce API
// =======================

// načtení všech pojištěnců
export async function getPojistenci() {
  const result = await pool.query(`
    SELECT id, jmeno, prijmeni, email, telefon, ulice, mesto, psc
    FROM pojistenci
  `);

  return result.rows;
}

// přidání nového pojištěnce
export async function addPojistenec(pojistenec) {
  const {
    jmeno,
    prijmeni,
    email,
    telefon,
    ulice,
    mesto,
    psc,
  } = pojistenec;

  await pool.query(
    `
    INSERT INTO pojistenci (jmeno, prijmeni, email, telefon, ulice, mesto, psc)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [jmeno, prijmeni, email, telefon, ulice, mesto, psc]
  );
}

// přidání pojištění
export async function addPojisteni(pojisteni) {
  const { typ, castka, pojistenec_id } = pojisteni;

  await pool.query(
    `
    INSERT INTO pojisteni (typ, castka, pojistenec_id)
    VALUES ($1, $2, $3)
    `,
    [typ, castka, pojistenec_id]
  );
}