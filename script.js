const API_URL = "http://localhost:3000/scrape";

const cards = {
  fifa: document.getElementById("card-fifa"),
  gta: document.getElementById("card-gta"),
  cod: document.getElementById("card-cod")
};

function updateCard(card, data) {
  if (!data) return;

  card.querySelector(".game-card__header h3").textContent = data.title;

  const img = card.querySelector(".game-card__image img");
  img.src = data.image && data.image !== "" 
    ? data.image 
    : "https://via.placeholder.com/600x300?text=Sin+imagen";

  card.querySelector(".price-current").textContent =
    data.priceText !== "N/A" ? data.priceText : "--";

  if (data.previousPrice) {
    card.querySelector(".price-old").textContent = data.previousPrice + " €";
  }

  if (data.link) {
    card.querySelector(".game-link").href = data.link;
  }
}

async function fetchPrices() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();

    if (!json.ok) return;

    const items = json.items;

    const fifa = items.find(i => i.title.toLowerCase().includes("fifa"));
    const gta = items.find(i => i.title.toLowerCase().includes("gta"));
    const cod = items.find(i => i.title.toLowerCase().includes("call of duty"));

    updateCard(cards.fifa, fifa);
    updateCard(cards.gta, gta);
    updateCard(cards.cod, cod);

  } catch (err) {
    console.error("Error obteniendo precios:", err);
  }
}

document.getElementById("check-now").addEventListener("click", fetchPrices);

setInterval(fetchPrices, 120000);
fetchPrices();



