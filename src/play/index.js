const { webkit, devices, _android } = require('playwright');
const fs = require('fs');
const path = require('path');
const { event } = require('../fun/event');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const tables = require('turndown-plugin-gfm').tables;
const turndownService = new TurndownService();
turndownService.use(tables);
const { CliPrettify } = require('markdown-table-prettify')

module.exports = async function () {
    const browser = await webkit.launch({ headless: false });
    const context = await browser.newContext({
        ...devices['iPhone 11'],
        locale: 'ID',
        permissions: ['geolocation']
    });
    const page = await context.newPage();

    event.on("ss", async (data) => {
        await page.screenshot({ path: path.join(__dirname, './assets/ss.png') });
    })

    event.on("click", async ({ x, y }) => {
        const data = { x, y }
        await page.evaluate((data) => {
            try {
                const circle = document.createElement('div');
                circle.id = 'circle';
                circle.style.position = 'fixed';
                circle.style.width = '20px';
                circle.style.height = '20px';
                circle.style.borderRadius = '50%';
                circle.style.backgroundColor = 'red';
                circle.style.pointerEvents = 'none';
                circle.style.zIndex = '9999';
                circle.style.top = `${data.y - 10}px`;
                circle.style.left = `${data.x - 10}px`;
                document.body.appendChild(circle);
                setTimeout(() => {
                    circle.remove()
                }, 100)

            } catch (error) {

            }
        }, data)
        await page.mouse.click((+x), (+y))

    })

    // load cookies
    if (fs.existsSync(path.join(__dirname, './cookies.json'))) {
        console.log("load cookies")
        const user_cookie = JSON.parse(fs.readFileSync(path.join(__dirname, 'cookies.json'), 'utf8'));
        await context.addCookies(user_cookie);
    }


    // https://gemini.google.com/app
    await page.goto('https://gemini.google.com/app');

    // await lingkaran(page)

    event.on("save-cookies", async (data) => {
        const cookies = await context.cookies();
        fs.writeFileSync(path.join(__dirname, './cookies.json'), JSON.stringify(cookies, null, 2));
        console.log("cookies saved")
    })

    event.on("tanya", async (data) => {
        try {
            const { q, tunggu, jenis } = data
            const editorSelector = '.ql-editor';
            await page.locator(editorSelector).fill(q);
            await page.waitForSelector('.send-button-container');
            await page.click('.send-button-container');

            await page.waitForTimeout(+tunggu);

            const html = await page.content();
            if (jenis === "table") {
                const markdown_table = htmlToMarkdownTable(html);
                event.emit("jawaban:success", markdown_table);
            }

            if (jenis === "text") {
                const markdownText = htmlToMarkdownText(html);
                event.emit("jawaban:success", markdownText);
            }

        } catch (error) {
            console.log(error)
            event.emit("jawaban:error", "error");
        }

    })



    return { page, browser }
}


function htmlToMarkdownText(htmlContent) {
    // Load HTML menggunakan Cheerio
    const $ = cheerio.load(htmlContent);
    const lastMessageContent = $('message-content').last();

    const html = lastMessageContent.html()
    // Konversi HTML menjadi Markdown
    const markdown = CliPrettify.prettify(turndownService.turndown(`
    ${html}

    <i>malikkurosaki@2024</i>
    `));

    return markdown;
}

async function screenshot(page) {
    await page.screenshot({ path: path.join(__dirname, './assets/ss.png') });
}

function htmlToMarkdownTable(htmlContent) {
    // Load HTML menggunakan Cheerio
    const $ = cheerio.load(htmlContent);
    const lastMessageContent = $('message-content').last();
    // const lastMessageContentText = lastMessageContent.html();

    const tbl = lastMessageContent.find('table').html();

    // Konversi HTML menjadi Markdown
    const markdown = CliPrettify.prettify(turndownService.turndown(`
    <table>${tbl}</table>
    
    <i>malikkurosaki@2024</i>
    `));


    return markdown;
}