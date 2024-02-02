const puppeteer = require('puppeteer');
const expres = require('express');
const yargs = require('yargs');
const ppt = require('./src/ppt');
const app = expres();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const route = require('./src/route');
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
        return await route.ask(req, res, pb, time_out ?? 15000)
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

