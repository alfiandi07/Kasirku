import { useState } from "react";
import type { FormEvent } from "react";
import Toast from "../components/Toast";
import { Link } from "react-router";
import type { Pengguna } from "../data/pengguna";

type Props = {
  daftarPengguna: Pengguna[];
  onDaftar: (baru: Pengguna) => void;
};

type FormErrors = {
  namapengguna?: string;
  password?: string;
  ulangipassword?: string;
  setuju?: string;
};

type InfoToast = { teks: string; jenis: "sukses" | "gagal" };

export default function HalamanRegister({ daftarPengguna, onDaftar }: Props) {
  const [namapengguna, setNamapengguna] = useState("");
  const [password, setPassword] = useState("");
  const [ulangipassword, setUlanginPassword] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [lihatPassword, setLihatPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<InfoToast | null>(null);

  function tampilkanToast(teks: string, jenis: "sukses" | "gagal") {
    setToast({ teks, jenis });
    setTimeout(() => setToast(null), 3000);
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    const sudahAda = daftarPengguna.some(
      (p) => p.namapengguna.toLowerCase() === namapengguna.trim().toLowerCase()
    );
    if (sudahAda) {
      newErrors.namapengguna = "Nama pengguna sudah terdaftar";
    }

    if (!namapengguna.trim()) {
      newErrors.namapengguna = "Nama pengguna wajib diisi";
    } else if (namapengguna.length < 8) {
      newErrors.namapengguna = "Nama pengguna minimal 8 karakter";
    }

    if (!password) {
      newErrors.password = "password wajib di isi";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = "Password harus kombinasi huruf dan angka";
    }

    if (password !== ulangipassword) {
      newErrors.ulangipassword = "Password tidak cocok";
    }

    if (!setuju) {
      newErrors.setuju = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return newErrors;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      tampilkanToast("periksa lagi isian yang merah", "gagal");
      return;
    }

    onDaftar({ namapengguna, password });
    tampilkanToast("Pendaftaraan berhasil, silahkan masuk", "sukses");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Halaman Daftar KasirKu</h2>
      <label htmlFor="namapengguna">Nama pengguna</label>
      <input
        id="namapengguna"
        className={errors.namapengguna ? "error" : "input"}
        value={namapengguna}
        onChange={(e) => setNamapengguna(e.target.value)}
      />
      {errors.namapengguna && (
        <small className="error-message">{errors.namapengguna}</small>
      )}

      <label htmlFor="password">password</label>
      <input
        id="password"
        type={lihatPassword ? "text" : "password"}
        className={errors.password ? "error" : "input"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <small className="error-message">{errors.password}</small>
      )}

      <label htmlFor="ulangipassword">Ulangi Password</label>
      <div className="password-row">
        <input
          id="ulangipassword"
          className={errors.ulangipassword ? "error" : "input"}
          type={lihatPassword ? "text" : "password"}
          value={ulangipassword}
          onChange={(e) => setUlanginPassword(e.target.value)}
        />
        <button type="button" onClick={() => setLihatPassword(!lihatPassword)}>
          {lihatPassword ? "Sembunyikan" : "Lihat"}
        </button>
      </div>
      {errors.ulangipassword && (
        <small className="error-message">{errors.ulangipassword}</small>
      )}

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "14px",
        }}
      >
        <input
          type="checkbox"
          checked={setuju}
          onChange={(e) => setSetuju(e.target.checked)}
        />
        Saya setuju dengan syarat & ketentuan
      </label>
      {errors.setuju && (
        <small className="error-message">{errors.setuju}</small>
      )}

      <button type="submit">Daftar</button>
      <p>
        Sudah punya akun? <Link to="/">Masuk</Link>
      </p>
      {toast && <Toast teks={toast.teks} jenis={toast.jenis} />}
    </form>
  );
}
