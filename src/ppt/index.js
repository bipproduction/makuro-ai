const puppeteer = require('puppeteer-extra');
const chromium = require('chrome-aws-lambda');
const pluginStealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(pluginStealth);
pluginStealth.setMaxListeners = () => { };
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const os = require('os')

module.exports = async function ({ page, browser }) {
    const headless = os.hostname() == "bips-MacBook-Air.local" ? false : "new"
    if (!page) {
        browser = await puppeteer.launch({
            executablePath: await chromium.executablePath,
            headless: headless,
            ignoreHTTPSErrors: true,
            args: [`
            --window-size=530,1280`,
                '--no-sandbox',
                '--disable-popup-blocking'
            ]
        })
        page = (await browser.pages())[0]
        await page.setDefaultNavigationTimeout(60000);
        await page.setViewport({ width: 530, height: 720 });
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "./../../ast/cookies.json")))
        await page.setCookie(...cookie)
        await page.goto('https://bard.google.com/chat')
        return { page, browser }
    }

    const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "k.json")))
    await page.setCookie(...cookie)
    await page.goto('https://bard.google.com/chat')
    await new Promise(r => setTimeout(r, 3000))
    return { page, browser }
} 