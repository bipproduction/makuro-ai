const { fetch } = require('cross-fetch')

fetch('http://localhost:3000/ask', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        q: "apa kabar"
    })
}).then(v => v.text()).then(console.log)