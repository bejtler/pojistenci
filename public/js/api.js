const API_URL = "https://pojistenci-ghet.onrender.com";

// =======================
// Pojištěnci
// =======================

// GET všichni
export async function getPojistenci() {
  const res = await fetch(`${API_URL}/pojistenci`);

  if (!res.ok) {
    throw new Error("Chyba při načítání pojištěnců");
  }

  return await res.json();
}

// POST nový
export async function addPojistenec(pojistenec) {
  const res = await fetch(`${API_URL}/pojistenci`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pojistenec),
  });

  if (!res.ok) {
    throw new Error("Chyba při ukládání pojištěnce");
  }

  return await res.json();
}