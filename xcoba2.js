
const fs = require('fs')
const _ = require('lodash')
const md = new (require('markdown-it'))

const TurndownService = require('turndown');
;(async () => {
    const a = await fs.readFileSync('./response.html').toString()
    const turndownService = new TurndownService();
    const b = turndownService.turndown(a);
    console.log(md.parse(b))
})() 