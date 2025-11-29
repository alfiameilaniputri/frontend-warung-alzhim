import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    password: "",
    alamat: ""
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDaftar = () => {
    console.log("Mendaftar dengan data:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 sm:px-8 md:px-10 lg:px-16 xl:px-24 max-h-screen md:overflow-y-auto">
        
        {/* Logo + Title */}
        <div className="mb-4 max-w-md mx-auto w-full">
          <div className="mb-3">
            <div className="mt-2 lg:mt-12 flex justify-center">
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

          <p className="text-neutral-800 text-sm leading-snug">
            <span className="text-primary-500 font-semibold">Daftar</span> dan belanja kebutuhan sehari-hari dengan mudah
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4 mt-3 max-w-md mx-auto w-full">

          {/* Nama */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama"
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>

          {/* Telepon */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">Nomor Telepon</label>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">Email</label>
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
            <label className="block mb-1 font-semibold text-gray-800 text-xs">Kata sandi</label>
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

          {/* Alamat */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800 text-xs">Alamat Lengkap</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap beserta no. rumah atau bloknya"
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleDaftar}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-200 mt-1 text-sm"
          >
            Daftar
          </button>

          {/* Login Link */}
          <p className="text-center text-xs text-gray-700">
            Sudah punya akun?{" "}
            <a href="/login" className="text-green-600 font-bold hover:underline">
              Masuk
            </a>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden bg-white">
        <img
          src="/warung-alzhim.png"
          alt="Warung Alzhim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'contrast(0.6) brightness(0.5)'
          }}
        />
      </div>
    </div>
  );
}