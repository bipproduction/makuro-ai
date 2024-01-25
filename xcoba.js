const { fetch } = require('cross-fetch')

fetch('https://makuro-ai.wibudev.com/ask', {
    method: "POST",
    body: JSON.stringify({
        q: "siapa tom lembong",
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