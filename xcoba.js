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


// fetch('https://makuro-ai.wibudev.com/ask', {
//     method: "POST",
//     body: JSON.stringify({
//         q: "siapa tom lembong",
//         n: false
//     }),
//     headers: {
//         "Content-Type": "application/json"
//     }
// }).then(async (v) => {
//     const body = v.body
//     body.on("data", (data) => {
//         console.log(data.toString())
//     })
// })


// const a = require('./xcoba.json')
// const _ = require('lodash')
// const fd = _.flattenDeep(a).find((v) => `${v}`.length > 50)
// const fd2 = _.flatMapDeep(JSON.parse(fd))
// console.log(fd2.find(v => `${v}`.length > 50))