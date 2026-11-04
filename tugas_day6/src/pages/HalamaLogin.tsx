import { useState } from "react";
import type { FormEvent } from "react";
import Toast from "../components/Toast";
import { Link } from "react-router";
import type { Pengguna } from "../data/pengguna";

type Props = {
  daftarPengguna: Pengguna[];
};

type FormErrors = { namapengguna?: string; password?: string };
type InfoToast = { teks: string; jenis: "sukses" | "gagal" };

export default function HalamanLogin({ daftarPengguna }: Props) {
  const [namapengguna, setnamapengguna] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<InfoToast | null>(null);

  function tampilkanToast(teks: string, jenis: "sukses" | "gagal") {
    setToast({ teks, jenis });
    setTimeout(() => setToast(null), 3000);
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (namapengguna === "") errs.namapengguna = "nama pengguna wajib diisi";
    else if (namapengguna.length < 5) errs.namapengguna = "Minimal 5 karakter";
    if (password === "") errs.password = "password tidak boleh kosong";
    else if (password.length < 8) errs.password = "minimal 8 karakter";
    return errs;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const akunDitemukan = daftarPengguna.find(
      (p) => p.namapengguna === namapengguna && p.password === password
    );

    if (akunDitemukan) {
      tampilkanToast("Berhasil masuk. Selamat datang di KasirKu!", "sukses");
    } else {
      tampilkanToast("Nama pengguna atau password salah", "gagal");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Masuk KasirKu</h2>
      <label htmlFor="namapengguna">nama pengguna</label>
      <input
        type="text"
        className={errors.namapengguna ? "error" : "input"}
        id="namapengguna"
        value={namapengguna}
        onChange={(e) => setnamapengguna(e.target.value)}
      />
      {errors.namapengguna && (
        <small className="error-message">{errors.namapengguna}</small>
      )}
      <label htmlFor="password">Password</label>
      <div className="password-row">
        <input
          id="password"
          className={errors.password ? "error" : "input"}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Sembunyikan" : "Lihat"}
        </button>
      </div>

      {errors.password && (
        <small className="error-message">{errors.password}</small>
      )}
      <button type="submit">Masuk</button>
      <p>
        Belum punya akun? <Link to="/daftar">daftar</Link>
      </p>
      {toast && <Toast teks={toast.teks} jenis={toast.jenis} />}
    </form>
  );
}
