import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiAlertTriangle } from "react-icons/fi";
import Button from "../components/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handlePickFile = () => {
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center items-start p-2 mb-2 lg:mb-4">
      {/* CARD */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden mt-2">
        {/* HEADER */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="text-neutral-900 text-xl"
            aria-label="Kembali"
          >
            <FiChevronLeft />
          </button>
          <h1 className="text-base font-semibold text-neutral-900">Profil</h1>
        </div>

        <div className="border-b border-neutral-300" />

        {/* WARNING BOX */}
        <div className="px-2 mt-2 flex justify-center">
          <div className="bg-secondary-100 text-secondary-900 border border-secondary-300 rounded-lg px-3 py-2 flex gap-2 items-start w-full max-w-sm md:max-w-xl">
            <FiAlertTriangle size={16} className="mt-0.5 shrink-0 text-secondary-900" />
            <div className="text-[10px] leading-snug">
              <span className="font-semibold block">Perhatian!</span>
              Pastikan semua data terisi lengkap & benar untuk pengiriman pesanan dan komunikasi.
            </div>
          </div>
        </div>

        {/* PROFILE HEADER */}
        <div className="px-3 py-3 flex items-start gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-300 shrink-0">
            <img src="/avatar.png" alt="Foto Profil" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-900">Alfi</span>
              <span className="text-xs text-neutral-600">alfi@example.com</span>
            </div>

            <button
              onClick={handlePickFile}
              disabled={!isEditing}
              className={`mt-2 inline-block px-2 py-1 text-xs rounded-md font-medium ${
                isEditing
                  ? "bg-secondary-900 text-white hover:bg-secondary-700"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              }`}
            >
              Ubah Foto
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          </div>
        </div>

        <div className="border-b border-neutral-300" />

        {/* FORM */}
        <div className="px-3 py-3 space-y-2">
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Nama Lengkap <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="text"
              defaultValue="Alfi"
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${
                isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Email <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="email"
              defaultValue="alfi@example.com"
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${
                isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              No. HP <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="text"
              defaultValue="08123456789"
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${
                isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Alamat Lengkap <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <textarea
              rows={2}
              defaultValue="Bintang Alam, Palembang"
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border resize-none text-sm ${
                isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
              }`}
            />
          </div>

          {!isEditing ? (
            <Button fullWidth variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profil
            </Button>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row md:gap-2">
              <Button className="flex-1" variant="primary" size="sm" onClick={handleSave}>
                Simpan Perubahan
              </Button>
              <Button className="flex-1" variant="outline" size="sm" onClick={handleCancel}>
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
