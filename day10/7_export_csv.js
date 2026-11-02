import { readFile, writeFile, mkdir } from "node:fs/promises";


async function muat() {
  try {
    return JSON.parse(await readFile("data/produk.json", "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export function keCSV(daftar) {
  const esc = (v) => `"${String(v).replaceAll('"', '""')}"`;
  const baris = daftar.map((p) => [p.nama, p.harga, p.stok].map(esc).join(";"));
  return "\uFEFF" + ["nama;harga;stok", ...baris].join("\n");
}

async function eksporKeExcel() {
  const daftarProduk = await muat();
  const kontenCSV = keCSV(daftarProduk);

  await writeFile("data/produk.csv", kontenCSV, "utf8");
  console.log("Berhasil diekspor ke data/produk.csv! Siap dibuka di Excel.");
}
eksporKeExcel();
