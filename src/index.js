import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const rl = readline.createInterface({ input, output });
const FILE = "data/undangan.json";

// 1. Fungsi simpan: ubah array dengan JSON.stringify lalu tulis ke file
async function simpan(data) {
  await mkdir("data", { recursive: true });
  await writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
}

// 2. Fungsi muat: baca file dan ubah dengan JSON.parse (kembalikan [] jika ENOENT)
async function muat() {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// 3. Panggil muat() saat program mulai
let daftar = await muat();

// Array data tema undangan (Tugas 1): digunakan sebagai data awal jika file kosong
if (daftar.length === 0) {
  daftar = [
    {
      nama: "adat jawa klasik",
      harga: 129000,
    },
    {
      nama: "adat sunda modern",
      harga: 129000,
    },
    {
      nama: "emarld luxury",
      harga: 129004,
    },
    {
      nama: "white minimalist",
      harga: 129000,
    },
    {
      nama: "floral pastel romance",
      harga: 129000,
    },
    {
      nama: "black & gold clean",
      harga: 129000,
    },
  ];
  await simpan(daftar);
}

// Fungsi saring tema adat (Studi Kasus 1)
function saringTemaAdat(list) {
  return list.filter((item) => item.nama.toLocaleLowerCase().includes("adat"));
}

// Fungsi validasi harga dengan throw Error (Studi Kasus 3)
function bacaHarga(teks) {
  const harga = Number(teks);
  if (teks.trim() === "" || Number.isNaN(harga) || harga <= 0) {
    throw new Error("Harga harus berupa angka dan lebih dari 0, mis. 129000");
  }
  return harga;
}

console.table(daftar);
let pilihYa;
do {
  pilihYa = await rl.question("Pilih Menu :");
  switch (pilihYa) {
    case "1":
      // TAMBAH (Validasi try/catch Studi Kasus 3)
      const nama = await rl.question("Nama Produk : ");
      if (nama.trim() === "") {
        console.log(`Isi dulu nama Produk!`);
        break;
      }

      const hargaString = await rl.question("Harga Produk : ");
      try {
        const harga = bacaHarga(hargaString);
        daftar.push({ nama, harga });
        // Simpan perubahan ke file setiap kali data ditambah (Studi Kasus 2)
        await simpan(daftar);
        console.log(`Berhasil Bertambah dan Tersimpan ke File!`);
      } catch (err) {
        console.log(`✖ ${err.message}`);
        console.log(`Kembali ke menu utama...`);
      }
      break;

    case "2":
      // LIHAT
      console.table(daftar);
      break;

    case "3":
      // CARI
      const cari = await rl.question("Ketik yg dicari : ");
      let ketemu = 0;
      for (const d of daftar) {
        if (d.nama.toLocaleLowerCase().includes(cari.toLocaleLowerCase())) {
          console.table({
            nama: d.nama,
            harga: d.harga,
          });
          ketemu++;
        }
      }
      if (ketemu === 0) {
        console.log(`Data tidak ditemukan!`);
      }
      break;

    case "4":
      // saring tema adat (Studi Kasus 1)
      const hasilSaring = saringTemaAdat(daftar);
      if (hasilSaring.length === 0) {
        console.log("tidak ditemukan");
      } else {
        console.table(hasilSaring);
      }
      break;

    case "5":
      // KELUAR
      console.log(`Terimakasih!`);
      break;

    default:
      console.log(`Pilihan tidak terrsedia`);
      break;
  }
} while (pilihYa !== "5");
rl.close();
