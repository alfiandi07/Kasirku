function bacaHarga(teks) {
  const harga = Number(teks);
  if (teks.trim() === "" || Number.isNaN(harga)) {
    throw new Error("Harga harus berupa angka, mis. 2500");
  }
  return harga;
}


for (const isian of ["abc", "", "2500"]) {
  try {
    console.log("✔ Harga:", bacaHarga(isian));
  } catch (err) {
    console.log("✖", err.message);
  }
  // for (const isian of ["abc", "", "2500"]) {
  // console.log("✔ Harga:", bacaHarga(isian));
// }
}
console.log("Program selesai.");
