const produk = [
  { nama: "Kopi", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Beras", kategori: "Sembako", harga: 16000, stok: 0 },
  { nama: "Teh", kategori: "Minuman", harga: 2000, stok: 15 },
];
 
const nilai = produk
  .filter((x) => x.kategori === "Minuman")
  .map((x) => x.harga * x.stok)
  .reduce((total, n) => total + n, 0);
console.log(nilai);