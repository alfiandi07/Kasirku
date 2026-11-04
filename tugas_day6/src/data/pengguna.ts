// src/data/pengguna.ts

export type Pengguna = {
  namapengguna: string;
  password: string;
};

// Akun dummy awal untuk uji coba
export const penggunaAwal: Pengguna[] = [
  {
    namapengguna: "admin",
    password: "rahasia123",
  },
];
