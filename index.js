const puppeteer = require('puppeteer');
const expres = require('express');
const yargs = require('yargs');
const ppt = require('./src/ppt');
const app = expres();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const route = require('./src/route');
const ask_ai = require('./src/fun/ask_ai');
let box;
app.use(expres.json())
app.use(expres.urlencoded({ extended: true }))

/**
 * @type {{
 * page: puppeteer.Page,
 * browser: puppeteer.Browser
 * }}
 */
let pb = {
    page: null,
    browser: null
}

yargs
    .command(
        "start",
        "start server",
        yargs => yargs
            .options({
                "port": {
                    alias: "p",
                    default: 3000
                }
            }),
        funStart
    )
    .demandCommand(1)
    .recommendCommands()
    .parse(process.argv.splice(2))

async function funStart(argv) {
    pb = await ppt(pb, "")

    await funLoadBox()

    app.get('/sk', funSk)
    app.post('/ask', async (req, res) => {
        const { time_out } = req.query
        return await route.ask(req, res, pb, time_out ?? 20000)
    })

    app.get('/ask-ai', async (req, res) => {
        const { time_out, q } = req.query
        if (!q) return res.send("q required")
        const result = await ask_ai({
            pb,
            q,
            time_out
        })

        res.setHeader("Content-Type", "text/html; charset=utf-8")

        return res.send(result)
    })

    app.get('/scr', async (req, res) => await route.scr(req, res, pb))
    app.listen(argv.port, () => console.log(box(`server berjalan di port ${argv.port}`)))
}

async function funSk(req, res) {
    const user_cookie = await pb.page.cookies()
    await fs.promises.writeFile(path.join(__dirname, "./ast/cookies.json"), JSON.stringify(user_cookie))
    console.log("cookie saved")
    return res.send(box("success"))
}


async function funLoadBox() {
    box = (await import('boxen')).default
}

// //*[@id="chat-history"]/infinite-scroller/div[3]/model-response/div/response-container/div/div[2]/div[2]

