const md = new (require('turndown'))()
const TurndownService = require('turndown')
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService()
turndownService.use(tables)
const {CliPrettify} = require('markdown-table-prettify')


const text = `
<table><tbody><tr data-sourcepos="10:1-10:34"><th data-sourcepos="10:1-10:11">Kecamatan</th><th data-sourcepos="10:13-10:32">Jumlah Rumah Sakit</th></tr><tr data-sourcepos="12:1-12:15"><td data-sourcepos="12:1-12:8">Badung</td><td data-sourcepos="12:10-12:13">10</td></tr><tr data-sourcepos="13:1-13:14"><td data-sourcepos="13:1-13:8">Bangli</td><td data-sourcepos="13:10-13:12">4</td></tr><tr data-sourcepos="14:1-14:16"><td data-sourcepos="14:1-14:10">Buleleng</td><td data-sourcepos="14:12-14:14">8</td></tr><tr data-sourcepos="15:1-15:15"><td data-sourcepos="15:1-15:9">Gianyar</td><td data-sourcepos="15:11-15:13">8</td></tr><tr data-sourcepos="16:1-16:16"><td data-sourcepos="16:1-16:10">Jembrana</td><td data-sourcepos="16:12-16:14">4</td></tr><tr data-sourcepos="17:1-17:18"><td data-sourcepos="17:1-17:12">Karangasem</td><td data-sourcepos="17:14-17:16">4</td></tr><tr data-sourcepos="18:1-18:17"><td data-sourcepos="18:1-18:11">Klungkung</td><td data-sourcepos="18:13-18:15">3</td></tr><tr data-sourcepos="19:1-19:23"><td data-sourcepos="19:1-19:16">Denpasar Utara</td><td data-sourcepos="19:18-19:21">11</td></tr><tr data-sourcepos="20:1-20:24"><td data-sourcepos="20:1-20:18">Denpasar Selatan</td><td data-sourcepos="20:20-20:22">6</td></tr><tr data-sourcepos="21:1-21:22"><td data-sourcepos="21:1-21:16">Denpasar Timur</td><td data-sourcepos="21:18-21:20">5</td></tr><tr data-sourcepos="22:1-22:22"><td data-sourcepos="22:1-22:16">Denpasar Barat</td><td data-sourcepos="22:18-22:20">4</td></tr></tbody></table>
`


console.log(CliPrettify.prettify(turndownService.turndown(text)))