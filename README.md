```js
app.get('/sk', funSk)
app.post('/ask', async (req, res) => await route.ask(req, res, pb))
app.get('/scr', async (req, res) => await route.scr(req, res, pb))
```

### ask

```js
const { fetch } = require('cross-fetch')

fetch('http://localhost:3000/ask', {
    method: "POST",
    body: JSON.stringify({
        q: "kapan hari raya",
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
```