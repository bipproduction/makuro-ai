// const m = `**Tabel Laporan Data Kemiskinan di Bali**\n\n| Bulan | Jumlah Penduduk Miskin (Ribu Jiwa) | Rasio Kemiskinan (%) | Tingkat Keparahan Kemiskinan (%) |\n|---|---|---|---|\n| September 2022 | 205,36 | 4,53 | 3,32 |\n| Maret 2023 | 193,78 | 4,30 | 3,20 |\n\nBerdasarkan tabel di atas, dapat dilihat bahwa jumlah penduduk miskin di Provinsi Bali mengalami penurunan selama periode September 2022 hingga Maret 2023. Penurunan jumlah penduduk miskin tersebut diikuti oleh penurunan rasio kemiskinan dan tingkat keparahan kemiskinan.\n\nPenurunan jumlah penduduk miskin di Provinsi Bali disebabkan oleh berbagai faktor, antara lain:\n\n* Peningkatan pertumbuhan ekonomi Provinsi Bali\n* Peningkatan daya beli masyarakat\n* Peningkatan akses terhadap lapangan kerja\n* Peningkatan program-program pemerintah dalam rangka penanggulangan kemiskinan\n\nPemerintah Provinsi Bali terus berupaya untuk menurunkan angka kemiskinan di Provinsi Bali. Upaya-upaya tersebut antara lain:\n\n* Peningkatan kualitas sumber daya manusia melalui program pendidikan gratis dan pelatihan kerja\n* Penciptaan lapangan kerja yang berkualitas melalui program-program pengembangan ekonomi dan UMKM\n* Pengurangan ketimpangan pendapatan melalui program-program bantuan sosial dan pemberdayaan masyarakat`
// console.log(m)

const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.setHeader("Content-Type: image/png")
    
})