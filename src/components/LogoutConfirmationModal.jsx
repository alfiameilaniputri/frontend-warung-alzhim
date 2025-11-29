import React from "react";

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm w-full">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-md">
            <div className="absolute left-0 w-1/2 h-full bg-gray-800"></div>
            <svg
              className="w-6 h-6 text-orange-400 relative z-10 translate-x-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-lg font-bold text-center text-gray-900 mb-1">
          Apakah Anda yakin ingin keluar dari akun?
        </h2>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
