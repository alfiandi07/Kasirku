// =====================================================================
// Day 10: MongoDB Schema & Model menggunakan Mongoose (ODM Node.js)
// Sesuai struktur data day_10/object.js
// =====================================================================
import mongoose from "mongoose";

// Definisi Schema Produk
const productSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama produk wajib diisi"],
      trim: true,
    },
    harga: {
      type: Number,
      required: [true, "Harga produk wajib diisi"],
      min: [0, "Harga tidak boleh kurang dari 0"],
    },
    stok: {
      type: Number,
      default: 0, // default value dari object.js
      min: [0, "Stok tidak boleh kurang dari 0"],
    },
    kategori: {
      type: String,
      default: "Umum", // default value dari object.js
      trim: true,
    },
  },
  {
    timestamps: true, // otomatis menambahkan createdAt dan updatedAt
    versionKey: false, // menghilangkan field __v default mongoose jika tidak diperlukan
  }
);

// Model Mongoose
export const Product = mongoose.model("Product", productSchema);

// ---------------------------------------------------------------------
// Contoh penggunaan / instansiasi data a dan b seperti di object.js:
// ---------------------------------------------------------------------
export const contohDataA = new Product({
  nama: "Kopi Sachet",
  harga: 2500,
  stok: 40,
});

export const contohDataB = new Product({
  harga: 2000,
  nama: "Teh Celup",
});
