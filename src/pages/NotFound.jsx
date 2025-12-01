import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Ilustrasi 404 */}
        <div className="mb-6 relative">
          <h1 className="text-[100px] sm:text-[130px] md:text-[160px] font-bold text-primary-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-4 sm:p-5 shadow-xl">
              <FiSearch className="w-10 h-10 sm:w-14 sm:h-14 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Teks */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors w-full sm:w-auto text-sm"
          >
            <FiArrowLeft size={18} />
            Kembali
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors w-full sm:w-auto text-sm"
          >
            <FiHome size={18} />
            Ke Beranda
          </button>
        </div>

        {/* Link Bantuan */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3">
            Butuh bantuan? Hubungi kami di:
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <a
              href="tel:+6285710441934"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              +62 857-1044-1934
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}