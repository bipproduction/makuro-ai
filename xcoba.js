const { fetch } = require('cross-fetch')

fetch('http://localhost:3001/ask-ai?q=berikan laporan berupa tabel jumlah hotel di bali tahun 2023').then(v => v.text()).then(console.log)
