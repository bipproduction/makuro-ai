const { webkit, devices, _android } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
    const browser = await webkit.launch({ headless: true });
    const context = await browser.newContext({
        ...devices['Desktop Chrome'],
        locale: 'ID',
        permissions: ['geolocation']
    });
    const page = await context.newPage();

    // load cookies
    if (fs.existsSync(path.join(__dirname, './cookies.json'))) {
        console.log("load cookies")
        const user_cookie = JSON.parse(fs.readFileSync(path.join(__dirname, 'cookies.json'), 'utf8'));
        await context.addCookies(user_cookie);
    }

    await page.goto('https://www.tiktok.com/foryou');
    const title = await page.title();

    console.log(`Judul Halaman: ${title}`);

    // save cookies
    page.on('request', async (request) => {
        if (request.url().includes("?save=true")) {
            const cookies = await context.cookies();
            fs.writeFileSync(path.join(__dirname, 'cookies.json'), JSON.stringify(cookies, null, 2));
            console.log("cookies saved")
        }
    });

    async function pressArrowDown() {
        console.log("next")
        // Lakukan tekanan tombol keyboard
        await page.keyboard.press('ArrowDown');

        // Tunggu 3 detik sebelum melakukan tekanan tombol selanjutnya
        await page.waitForTimeout(20000);

        // Panggil kembali fungsi ini untuk melakukan tekanan tombol berikutnya
        return await pressArrowDown();
    }

    try {
        // Panggil fungsi untuk memulai proses tekanan tombol secara otomatis
        await pressArrowDown();
    } catch (error) {
        console.log("error")
    }

})();