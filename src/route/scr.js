const path = require('path')
module.exports = async function (req, res, pb) {
    const page = pb.page
    await page.screenshot({ path: path.join(__dirname, "./../img/scr.png") });
    res.setHeader("Content-Type", "image/png");
    res.sendFile(path.join(__dirname, "./../img/scr.png"))
}