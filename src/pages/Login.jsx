import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import useAuthStore from "../stores/useAuthStore";
import useNotificationStore from "../stores/useNotificationStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const login = useAuthStore((state) => state.login);
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMasuk = async () => {
    try {
      const response = await login(formData.email, formData.password);

      // Cek jika response error dari backend
      if (!response.success) {
        // Tangani error toko tidak aktif
        if (response.status_code === 403 && response.errors?.store) {
          alert(`${response.message}\n${response.errors.store}`);
          return;
        }

        // Tangani error lainnya
        if (response.errors) {
          const errorMessages = Object.values(response.errors).join("\n");
          alert(`${response.message}\n${errorMessages}`);
        } else {
          alert(response.message || "Gagal Masuk, cek email/password.");
        }
        return;
      }

      const user = useAuthStore.getState().user;

      console.log("ROLE:", user.role);

      // Arahkan sesuai role
      if (user.role === "admin") {
        navigate("/seller");
      } else if (user.role === "user") {
        navigate("/");
      } else {
        navigate("/"); // fallback
      }

      fetchNotifications();
      alert("Masuk berhasil!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan saat Masuk. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Forgot Password Modal */}
      {openModal && (
        <ForgotPasswordModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* LEFT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6">
        <div className="mb-6 text-center">
          <img
            src="/logo-web-warung-alzhim.png"
            alt="Logo"
            className="w-20 h-20 mx-auto"
          />
          <h1 className="text-3xl font-black text-primary-500 mt-2">
            WARUNG ALZHIM
          </h1>
          <p className="text-sm text-gray-700 mt-1">
            Masuk dan belanja kebutuhan sehari-hari dengan mudah
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // ⛔ cegah reload
            handleMasuk(); // ✅ trigger login
          }}
          className="flex flex-col gap-4 max-w-md mx-auto w-full"
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kata sandi"
              required
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={16} />
              ) : (
                <AiOutlineEye size={16} />
              )}
            </button>
          </div>

          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="text-xs text-primary-500 font-semibold hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm"
          >
            Masuk
          </button>

          <p className="text-center text-xs text-gray-700">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-green-600 font-bold hover:underline"
            >
              Daftar
            </a>
          </p>
        </form>
      </div>

      {/* RIGHT */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <img
          src="/warung-alzhim.png"
          alt="Warung Alzhim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(0.6) brightness(0.5)" }}
        />
      </div>
    </div>
  );
}
