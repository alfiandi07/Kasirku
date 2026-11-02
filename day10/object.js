function buatProduk({ nama, harga, stok = 0, kategori = "Umum" } = {}) {
  return { nama, harga, stok, kategori };
}

const a = buatProduk({ nama: "Kopi Sachet", harga: 2500, stok: 40 });
const b = buatProduk({ harga: 2000, nama: "Teh Celup" });

console.log(a);
console.log(b);
