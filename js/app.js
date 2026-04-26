import { getPojistenci } from "./api.js";

async function renderPojistenci() {
  const data = await getPojistenci();

  const container = document.getElementById("pojistenci-list");

  container.innerHTML = data
    .map(
      (p) => `
      <div style="padding:10px; border:1px solid #ccc; margin:5px;">
        <strong>${p.jmeno} ${p.prijmeni}</strong><br>
        ${p.email}
      </div>
    `
    )
    .join("");
}

renderPojistenci();