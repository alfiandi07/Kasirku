// =====================================================================
// Day 10: Contoh Database Migration berdasarkan struktur day_10/object.js
// =====================================================================
// Dari object.js:
//   nama      -> Wajib diisi (string)
//   harga     -> Wajib diisi (angka/integer)
//   stok      -> Opsional, default 0 (integer)
//   kategori  -> Opsional, default "Umum" (string)
// =====================================================================

// ---------------------------------------------------------------------
// 1. CONTOH SEQUELIZE MIGRATION (CommonJS / CLI Sequelize)
// File biasanya bernama: XXXXXXXXXXXXXX-create-products.js
// ---------------------------------------------------------------------
const sequelizeMigration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Umum',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};

// ---------------------------------------------------------------------
// 2. CONTOH KNEX.JS MIGRATION (ES Modules)
// ---------------------------------------------------------------------
export async function up(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('nama').notNullable();
    table.integer('harga').notNullable();
    table.integer('stok').defaultTo(0).notNullable();
    table.string('kategori').defaultTo('Umum').notNullable();
    table.timestamps(true, true); // created_at & updated_at otomatis
  });
}

export async function down(knex) {
  return knex.schema.dropTable('products');
}

// ---------------------------------------------------------------------
// 3. CONTOH SEEDER DATA AWAL (Data a dan b dari object.js)
// ---------------------------------------------------------------------
export const seedProducts = [
  {
    nama: 'Kopi Sachet',
    harga: 2500,
    stok: 40,
    kategori: 'Umum',
  },
  {
    nama: 'Teh Celup',
    harga: 2000,
    stok: 0, // default value dari object.js
    kategori: 'Umum', // default value dari object.js
  },
];
