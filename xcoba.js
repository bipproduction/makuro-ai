const { fetch } = require('cross-fetch')

fetch('http://localhost:3000/ask', {
    method: "POST",
    body: JSON.stringify({
        q: "berikan laporan data jumblah gutu di bali tahun 2023",
        n: false
    }),
    headers: {
        "Content-Type": "application/json"
    }
}).then(async (v) => {
    const body = v.body
    body.on("data", (data) => {
        console.log(data.toString())
    })
})
