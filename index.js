const expres = require('express');
const yargs = require('yargs');
const app = expres();
const path = require('path');
const fs = require('fs');
var pb = require('./src/def/pb');
const { event } = require('./src/fun/event');
const play = require('./src/play');
app.use(expres.json())
app.use(expres.urlencoded({ extended: true }))
app.use(expres.static(path.join(__dirname, './public')))

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

    if (!pb.page) pb = await play(pb)


    app.get("/save-cookies", (req, res) => {
        event.emit("save-cookies", true)
        return res.send("save_cookies: success")
    })

    let in_use = false
    app.get('/tanya', async (req, res) => {
        if (in_use) return res.send("please wait app is in use by another user")
        in_use = true
        const data = {
            q: req.query.q,
            tunggu: req.query.tunggu ?? 10000,
            jenis: req.query.jenis ?? "table"
        }

        event.emit("tanya", data)

        event.on("jawaban:success", async (data) => {
            in_use = false
            res.end(data)
        })

        event.on("jawaban:error", (data) => {
            console.log(data)
            in_use = false
            res.end("error")
        })
    })

    app.get('/ss', (req, res) => {
        event.emit("ss", true)
        res.setHeader("Content-Type", "image/png")
        return res.sendFile(path.join(__dirname, './src/play/assets/ss.png'))
    })

    app.get('/view', (req, res) => {
        res.setHeader("Content-Type", "image/png")
        return res.sendFile(path.join(__dirname, './src/play/assets/ss.png'))
    })

    app.get('/controll', (req, res) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.sendFile(path.join(__dirname, './public/controll.html'))
    })

    app.get('/click/:x/:y', (req, res) => {
        const { x, y } = req.params
        event.emit("click", { x, y })
        return res.send("click: success")
    })

    app.listen(argv.port, () => console.log(`server berjalan di port ${argv.port}`))
}

