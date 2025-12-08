import React, { useState } from "react";
import { X } from "lucide-react";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleKirimReset = () => {
    console.log("Kirim reset ke:", email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div
        className="bg-white w-[85%] sm:w-full sm:max-w-sm p-4 rounded-xl shadow-lg relative animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi</h1>
          <p className="text-gray-600 text-sm mt-1">
            Masukkan email Anda untuk menerima link reset kata sandi
          </p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-900 text-sm">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email anda"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>

        <button
          onClick={handleKirimReset}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm transition"
        >
          Kirim Tautan Reset
        </button>
      </div>
    </div>
  );
}
