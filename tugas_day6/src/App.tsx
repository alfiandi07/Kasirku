import "./form.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import HalamanLogin from "./pages/HalamaLogin";
import HalamanRegister from "./pages/HalamanRegister";
import { penggunaAwal, type Pengguna } from "./data/pengguna";

export default function App() {
  const [daftarPengguna, setDaftarPengguna] =
    useState<Pengguna[]>(penggunaAwal);

  function tambahPengguna(baru: Pengguna) {
    setDaftarPengguna((prev) => [...prev, baru]);
  }

  return (
    <BrowserRouter>
      <div className="auth-wrapper">
        <nav>
          <Link to="/">Masuk</Link> | <Link to="/daftar">Daftar</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<HalamanLogin daftarPengguna={daftarPengguna} />}
          />
          <Route
            path="/daftar"
            element={
              <HalamanRegister
                daftarPengguna={daftarPengguna}
                onDaftar={tambahPengguna}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
