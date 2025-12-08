import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordModal({ token }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    window.location.href = "/login";
  };

  const handleSimpan = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("Kata sandi minimal 8 karakter!");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password: formData.newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Kata sandi berhasil diubah!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Terjadi kesalahan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengubah kata sandi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-xl p-4 shadow-lg relative">
        
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 mb-3 flex items-center gap-1"
        >
          <ArrowLeft size={18} />
          <span className="text-xs">Kembali ke Login</span>
        </button>

        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-lg font-bold text-gray-900 mb-3 text-center">
          Kata Sandi Baru
        </h1>

        <div className="mb-2">
          <label className="block mb-1 font-semibold text-gray-900 text-xs">
            Kata Sandi Baru<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Masukkan Kata Sandi Baru"
              className="w-full border-2 border-gray-300 rounded-lg px-2.5 py-1.5 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold text-gray-900 text-xs">
            Konfirmasi Kata Sandi<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Masukkan Ulang Kata Sandi"
              className="w-full border-2 border-gray-300 rounded-lg px-2.5 py-1.5 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSimpan}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 rounded-lg transition duration-200 text-xs"
        >
          Simpan Kata Sandi
        </button>
      </div>
    </div>
  );
}