const _ = require('lodash')
module.exports = async function (req, res, pb) {
    let data_body = [];
    const body = req.body
    if (!body || _.isEmpty(body.q)) return res.send({
        success: false,
        message: "require question"
    })

    const hasil = await new Promise(async (a, b) => {
        if (!pb.page) return res.send("null page")
        const page = pb.page

        if (body.n) {
            await page.waitForSelector('.mat-mdc-focus-indicator');
            await page.click('.mat-mdc-focus-indicator');
            await new Promise(r => setTimeout(r, 1000))
        }
        try {
            const editorSelector = '.ql-editor';
            const textToType = body.q;
            await page.type(editorSelector, textToType);
            await page.waitForSelector('.send-button-container');
            await new Promise(r => setTimeout(r, 1000))
            await page.click('.send-button-container');
        } catch (error) {
            console.log("error")
        }

        page.on('response', async (response) => {
            if (response.headers()['content-type'].includes("application/json; charset=utf-8")) {
                const tx = await response.text()
                const ls = tx.split("\n")
                for (let l of ls) {
                    try {
                        data_body.push(JSON.parse(l))
                    } catch (error) {

                    }
                }
                await new Promise((r) => setTimeout(r, 5000))
                if (response.ok()) {
                    a(data_body)
                }
            }
        });

    })

    // const flt = _.flattenDeep(hasil)
    // const data = flt.find((v) => (v ?? "").length > 50)
    // const data2 = _.flattenDeep(JSON.parse(data)).find((v) => (v ?? "").length > 50)

    const fd = _.flattenDeep(hasil).find((v) => `${v}`.length > 50)
    const fd2 = _.flatMapDeep(JSON.parse(fd))
    const final_data = fd2.find(v => `${v}`.length > 50)
    res.send(final_data)
}