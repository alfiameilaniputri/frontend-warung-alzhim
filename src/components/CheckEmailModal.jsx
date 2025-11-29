import React from "react";

export default function CheckEmailModal({ isOpen, onClose, email = "angelveronica@gmail.com", onLanjutkan }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg animation-fade">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Cek Email Anda
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center text-sm mb-5 px-2 leading-relaxed">
          Kami telah mengirimkan tautan reset kata sandi ke{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800 text-xs leading-relaxed">
            Klik tautan dalam email untuk melanjutkan proses reset kata sandi. 
            Tautan akan kedaluwarsa dalam 1 jam.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onLanjutkan}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
          >
            Lanjutkan ke Reset Kata Sandi
          </button>

          <button
            onClick={onClose}
            className="w-full text-green-600 font-bold py-3 hover:underline transition"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
}
