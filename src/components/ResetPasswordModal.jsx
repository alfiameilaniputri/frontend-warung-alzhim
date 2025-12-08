import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";

export default function ResetPasswordModal({ onClose, token }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSimpan = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    try {
      // kirim data ke backend
      const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token, // kirim token
          password: formData.newPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Kata sandi berhasil diubah!");
        onClose();
      } else {
        alert(data.message || "Terjadi kesalahan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengubah kata sandi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Kata Sandi Baru
          </h1>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-900">
              Kata Sandi Baru<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Masukkan Kata Sandi Baru"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-900">
              Konfirmasi Kata Sandi<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan Ulang Kata Sandi"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSimpan}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Simpan Kata Sandi
          </button>
        </div>
      </div>
    </div>
  );
}
