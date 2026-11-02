// =====================================================================
// Day 10: Migration Script untuk MongoDB (Gaya migrate-mongo / Native Driver)
// Sesuai struktur data day_10/object.js
// =====================================================================

/**
 * Fungsi UP: Dijalankan saat migrasi diterapkan
 * 1. Membuat collection 'products' dengan JSON Schema Validator
 * 2. Membuat index pada nama dan kategori
 * 3. Mengisi data awal (seeding) a dan b dari object.js
 */
export async function up(db) {
  // 1. Buat collection dengan validator schema
  await db.createCollection("products", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nama", "harga", "stok", "kategori"],
        properties: {
          nama: {
            bsonType: "string",
            description: "nama harus berupa string dan wajib diisi",
          },
          harga: {
            bsonType: ["int", "double", "long"],
            minimum: 0,
            description: "harga harus berupa angka >= 0 dan wajib diisi",
          },
          stok: {
            bsonType: ["int", "long"],
            minimum: 0,
            description: "stok harus berupa angka bulat >= 0",
          },
          kategori: {
            bsonType: "string",
            description: "kategori harus berupa string",
          },
          createdAt: {
            bsonType: "date",
          },
          updatedAt: {
            bsonType: "date",
          },
        },
      },
    },
  });

  // 2. Buat index pencarian
  await db.collection("products").createIndex({ nama: 1 });
  await db.collection("products").createIndex({ kategori: 1 });

  // 3. Masukkan data sampel a dan b dari object.js
  const now = new Date();
  await db.collection("products").insertMany([
    {
      nama: "Kopi Sachet",
      harga: 2500,
      stok: 40,
      kategori: "Umum",
      createdAt: now,
      updatedAt: now,
    },
    {
      nama: "Teh Celup",
      harga: 2000,
      stok: 0, // default value
      kategori: "Umum", // default value
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log("Migration MongoDB UP: collection 'products' dan data awal berhasil dibuat.");
}

/**
 * Fungsi DOWN: Dijalankan saat migrasi di-rollback
 */
export async function down(db) {
  await db.collection("products").drop();
  console.log("Migration MongoDB DOWN: collection 'products' berhasil dihapus.");
}
