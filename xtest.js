const puppeteer = require('puppeteer');

(async () => {
  // Membuka browser
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'] ,
    headless: "new"
  });

  // Membuka halaman baru
  const page = await browser.newPage();

  // Navigasi ke halaman tertentu
  await page.goto('https://www.example.com');

  // Mengambil tangkapan layar
  await page.screenshot({ path: 'example.png' });

  await page.on("response", async (data) => {
    await data.buffer().on("data", (d) => {
        
    })
  })

  // Menutup browser
  await browser.close();
})();
