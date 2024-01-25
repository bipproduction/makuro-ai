const puppeteer = require('puppeteer');

(async () => {
  // Membuka browser
  const browser = await puppeteer.launch();

  // Membuka halaman baru
  const page = await browser.newPage();

  // Navigasi ke halaman tertentu
  await page.goto('https://www.example.com');

  // Mengambil tangkapan layar
  await page.screenshot({ path: 'example.png' });

  // Menutup browser
  await browser.close();
})();
