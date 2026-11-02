import { readFile, writeFile, mkdir } from "node:fs/promises";
const produk = [
  { nama: "Beras 5kg", harga: 75000, stok: 8 },
  { nama: "Minyak Goreng 1L", harga: 18000, stok: 3 },
  { nama: "Gula 1kg", harga: 16000, stok: 0 },
  { nama: "Kopi Sachet", harga: 2500, stok: 40 },
  { nama: "Teh Celup", harga: 2000, stok: 15 },
];

async function simpan(data) {
  await mkdir("data", { recursive: true });
  await writeFile("data/produk.json", JSON.stringify(data, null, 2));
}

await simpan(produk);


async function muat() {
  try {
    return JSON.parse(await readFile("data/produk.json", "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}


const dataFile = await muat();
console.log("Jumlah data dari file:", dataFile.length);

