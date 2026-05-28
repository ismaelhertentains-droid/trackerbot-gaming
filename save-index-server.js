const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname)));

const INDEX_DIR = path.join(__dirname, 'indexes');
if (!fs.existsSync(INDEX_DIR)) fs.mkdirSync(INDEX_DIR, { recursive: true });

function timestampFilename() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const ts = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  return `index-${ts}.json`;
}

function parsePrice(priceText) {
  if (!priceText) return null;

  return Number(
    priceText
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.')
  );
}

async function scrapePage(targetUrl) {
  const response = await axios.get(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Referer': 'https://www.instant-gaming.com/',
      'DNT': '1'
    },
    timeout: 25000,
    responseType: 'text'
  });

  const $ = cheerio.load(response.data);
  const cards = $('.item, .product-card, .product-item, .item-product, article');
  const items = [];

  cards.each((index, element) => {
    if (items.length >= 20) return false;

    const $el = $(element);

    let title = $el.find('.title, .product-title, h3, h2').first().text().trim();

    let priceText =
      $el.find('.price').first().text().trim() ||
      $el.find('.price-promo').first().text().trim() ||
      $el.find('.ig-price').first().text().trim() ||
      $el.find('.price-current').first().text().trim() ||
      $el.find('.price-tag').first().text().trim() ||
      'N/A';

    const price = parsePrice(priceText);

    let image =
      $el.find('img').attr('data-src') ||
      $el.find('img').attr('data-image') ||
      $el.find('img').attr('data-lazy') ||
      $el.find('img').attr('src') ||
      '';

    if (image.startsWith('//')) image = 'https:' + image;
    if (image.startsWith('/')) image = 'https://www.instant-gaming.com' + image;
    if (!image) image = 'https://via.placeholder.com/600x300?text=Sin+imagen';

    const href = $el.find('a').attr('href');
    const link = href ? (href.startsWith('http') ? href : `https://www.instant-gaming.com${href}`) : null;

    items.push({
      title,
      priceText,
      price,
      image,
      link,
      fetchedAt: new Date().toISOString(),
      source: targetUrl
    });
  });

  return items;
}

app.get('/scrape', async (req, res) => {
  const targetUrl = req.query.url || 'https://www.instant-gaming.com/es/';
  try {
    const items = await scrapePage(targetUrl);
    res.json({ ok: true, items, source: targetUrl, fetchedAt: new Date().toISOString() });
  } catch (err) {
    console.error('Scrape error:', err.message || err);
    res.status(500).json({ ok: false, error: 'No se pudo obtener datos desde el sitio remoto.' });
  }
});

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

