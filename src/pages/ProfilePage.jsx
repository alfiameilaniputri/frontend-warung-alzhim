import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiAlertTriangle } from "react-icons/fi";
import Button from "../components/Button";
import useAuthStore from "../stores/useAuthStore";
export default function ProfilePage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, loading, error, fetchProfile, updateProfile } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch profile saat component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Update form data ketika user data berubah
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
      // Set avatar preview dari user data jika ada
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handlePickFile = () => {
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi file type
      if (!file.type.startsWith('image/')) {
        alert('Hanya file gambar yang diperbolehkan');
        return;
      }

      // Validasi file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB');
        return;
      }

      setAvatarFile(file);

      // Preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validasi form
    if (!formData.name || !formData.email || !formData.phone_number || !formData.address) {
      alert("Semua field wajib diisi!");
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Format email tidak valid!");
      return;
    }

    // Validasi nomor HP (hanya angka)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone_number)) {
      alert("Nomor HP hanya boleh berisi angka!");
      return;
    }

    // ------- Gunakan FormData untuk mengirim data + file -------
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("phone_number", formData.phone_number);
    dataToSend.append("address", formData.address);

    // Jika ganti password
    if (formData.oldPassword) dataToSend.append("oldPassword", formData.oldPassword);
    if (formData.newPassword) dataToSend.append("newPassword", formData.newPassword);

    // Jika ada file gambar
    if (avatarFile) {
      dataToSend.append("profileImage", avatarFile);
    }

    // Kirim ke API
    const success = await updateProfile(dataToSend);

    if (success) {
      alert("Profil berhasil diperbarui!");
      setIsEditing(false);
      setAvatarFile(null);
      window.location.reload(); // agar navbar ikut update
    } else {
      alert(error || "Gagal menyimpan perubahan");
    }
  };


  const handleCancel = () => {
    // Reset form data ke data user asli
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
      setAvatarPreview(user.avatar || null);
      setAvatarFile(null);
    }
    setIsEditing(false);
  };

  // Loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-neutral-100 flex justify-center items-center">
        <div className="text-center">
          <p className="text-neutral-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

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
          <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-300 shrink-0 bg-neutral-200">
            <img
              src={
                avatarPreview ||
                (user?.profileImage && `${API_URL}/public/user_profile/${user.profileImage}`) ||
                "/avatar.png"
              }
              alt="Foto Profil"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-900">
                {user?.name || "Pengguna"}
              </span>
              <span className="text-xs text-neutral-600">
                {user?.email || "email@example.com"}
              </span>
            </div>

            <button
              onClick={handlePickFile}
              disabled={!isEditing}
              className={`mt-2 inline-block px-2 py-1 text-xs rounded-md font-medium ${isEditing
                ? "bg-secondary-900 text-white hover:bg-secondary-700"
                : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                }`}
            >
              Ubah Foto
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
                }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Username <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
                }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Email <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
                }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              No. HP <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border text-sm ${isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
                }`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Alamat Lengkap <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <textarea
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 px-3 py-1.5 rounded-md border resize-none text-sm ${isEditing ? "bg-white border-primary-500" : "bg-neutral-100 border-neutral-300"
                }`}
            />
          </div>

          {!isEditing ? (
            <Button fullWidth variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profil
            </Button>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row md:gap-2">
              <Button
                className="flex-1"
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}