const _ = require('lodash')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio');
const md = new (require('turndown'))()
const TurndownService = require('turndown')
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService()
turndownService.use(tables)
const { CliPrettify } = require('markdown-table-prettify')

module.exports = async function ({ pb, time_out, q, n, log } = {
    pb: {
        page: puppeteer.Page,
        browser: puppeteer.Browser
    },
    time_out: 15000,
    q: null,
    n: null,
    log: false
}) {
    const page = pb.page
    const browser = pb.browser

    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            log && console.log("terditeksi akan membentuk tab baru")
            const newPage = await target.page();
            await newPage.close();
        }
    });

    if (n) {
        log && console.log("membuat tab baru")
        await page.waitForSelector('.mat-mdc-focus-indicator');
        await page.click('.mat-mdc-focus-indicator');
        await new Promise(r => setTimeout(r, 1000))
    }

    log && console.log("mengisi promp")
    const editorSelector = '.ql-editor';
    await page.type(editorSelector, q);
    await page.waitForSelector('.send-button-container');
    await new Promise(r => setTimeout(r, 1000))
    await page.click('.send-button-container');

    await new Promise(r => setTimeout(r, time_out))
    await page.waitForXPath('//*[@id="chat-history"]/infinite-scroller/div');
    const elements = await page.$x('//*[@id="chat-history"]/infinite-scroller/div');

    const count = elements.length;
    if (count > 0) {

        const lastElement = elements[count - 1];
        const html = await page.evaluate(element => element.innerHTML, lastElement);
        const $ = cheerio.load(html);
        const tables = $('table'); // Mengambil semua tabel
        const lastTable = tables.last(); // Mengambil tabel terakhir
        const result = `
        <table>${lastTable.html()}</table>
        `;

        return result
    } else {
        console.log('Tidak ada elemen yang ditemukan dengan XPath tersebut.');
        return "null"
    }

}