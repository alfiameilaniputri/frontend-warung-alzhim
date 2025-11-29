import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ⬅️ STATE MODAL
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMasuk = () => {
    console.log("Masuk dengan data:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* MODAL FORGOT PASSWORD */}
      {openModal && (
        <ForgotPasswordModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 sm:px-8 md:px-10 lg:px-16 xl:px-24 max-h-screen md:overflow-y-auto">
        {/* Logo + Title */}
        <div className="mb-4 max-w-md mx-auto w-full">
          <div className="mb-3">
            <div className="mt-2 lg:mt-4 flex justify-center">
              <img
                src="/logo-web-warung-alzhim.png"
                alt="Logo Warung Alzhim"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-black text-primary-500 mb-1 text-center">
            WARUNG ALZHIM
          </h1>

          <p className="text-neutral-800 text-sm leading-snug text-center">
            <span className="text-primary-500 font-semibold">Masuk</span> dan
            belanja kebutuhan sehari-hari dengan mudah
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4 mt-3 max-w-md mx-auto w-full">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email anda"
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi anda"
                className="w-full border-2 border-green-300 rounded-lg px-3 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={16} />
                ) : (
                  <AiOutlineEye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link → BUKA MODAL */}
          <div className="flex justify-end">
            <button
              onClick={() => setOpenModal(true)}
              className="text-xs text-primary-500 font-semibold hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleMasuk}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-200 text-sm"
          >
            Masuk
          </button>

          {/* Register Link */}
          <p className="text-center text-xs text-gray-700">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-green-600 font-bold hover:underline"
            >
              Daftar
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden bg-white">
        <img
          src="/warung-alzhim.png"
          alt="Warung Alzhim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "contrast(0.6) brightness(0.5)",
          }}
        />
      </div>
    </div>
  );
}
