const { chromium } = require('playwright');
const { CliPrettify } = require('markdown-table-prettify');
const TurndownService = require('turndown')
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService()

module.exports = async function ({ pb, time_out, q, n, log } = {
    pb: {
        page: null,
        browser: null
    },
    time_out: 15000,
    q: null,
    n: null,
    log: false
}) {
    const page = pb.page
    const browser = pb.browser

    if (n) {
        log && console.log("membuat tab baru");
        await page.waitForSelector('.mat-mdc-focus-indicator');
        await page.click('.mat-mdc-focus-indicator');
        await page.waitForTimeout(1000);
    }

    log && console.log("mengisi promp");
    const editorSelector = '.ql-editor';
    await page.type(editorSelector, q);
    await page.waitForSelector('.send-button-container');
    await page.click('.send-button-container');
    await page.waitForTimeout(10000);

    const response = await page.waitForResponse(response => response.status() === 200);

    return "ok"
    
    // await page.waitForSelector('//*[@id="chat-history"]/infinite-scroller/div');
    // const elements = await page.$x('//*[@id="chat-history"]/infinite-scroller/div');
    // const count = elements.length;


    // if (count > 0) {
    //     const lastElement = elements[count - 1];
    //     const html = await lastElement.innerHTML();
    //     const result = `<table>${html}</table>`;
    //     return CliPrettify.prettify(turndownService.turndown(result));
    // } else {
    //     console.log('Tidak ada elemen yang ditemukan dengan XPath tersebut.');
    //     return "null data";
    // }
}
