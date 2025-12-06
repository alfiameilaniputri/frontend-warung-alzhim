import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  profile: null,

  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        name: formData.nama,
        username: formData.nama.replace(/\s+/g, "").toLowerCase(),
        email: formData.email,
        password: formData.password,
        phone_number: formData.telepon,
        address: formData.alamat,
      };

      const res = await axios.post(`${API_URL}/api/auth/register`, payload);

      if (res.data.success) {
        const { token, user } = res.data.data || {};
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          set({ user, token, loading: false });
        } else {
          set({ loading: false });
        }
        return true;
      } else {
        set({ error: res.data.message || "Gagal mendaftar", loading: false });
        return false;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return false;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      if (res.data.success) {
        const { token, user } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, token, loading: false });
        
        return {
          success: true,
          data: res.data.data,
        };
      } else {
        set({ error: res.data.message, loading: false });
        
        return {
          success: false,
          status_code: res.data.status_code,
          message: res.data.message,
          errors: res.data.errors || {},
        };
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      
      const errorData = err.response?.data || {};
      return {
        success: false,
        status_code: errorData.status_code || err.response?.status || 500,
        message: errorData.message || err.message || "Terjadi kesalahan",
        errors: errorData.errors || {},
      };
    }
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const token = get().token || localStorage.getItem("token");

      if (!token) {
        set({ error: "Token tidak ditemukan", loading: false });
        return false;
      }

      const res = await axios.get(`${API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({
          user: res.data.user,
          profile: res.data.user,
          token,
          loading: false,
        });
        return true;
      } else {
        set({ error: "Gagal mengambil data profil", loading: false });
        return false;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return false;
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const token = get().token || localStorage.getItem("token");

      if (!token) {
        set({ error: "Token tidak ditemukan", loading: false });
        return false;
      }

      const res = await axios.put(
        `${API_URL}/api/auth/update-profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const updatedUser = res.data.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser, loading: false });
        return true;
      } else {
        set({ error: res.data.message, loading: false });
        return false;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) set({ token, user });
  },

  toggleActive: async (checked) => {
    try {
      const token = get().token || localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/auth/update-active`,
        { isActive: Boolean(checked) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Refresh profile untuk update state
      await get().fetchProfile();

      // ✅ Tampilkan alert sukses dari backend
      if (response.data.success && response.data.message) {
        alert(response.data.message);
      }

    } catch (err) {
      console.error("Gagal toggle:", err.response?.data || err.message);
      
      // ✅ Tampilkan alert error dari backend
      const errorMessage = 
        err.response?.data?.errors?.order ||  // "Masih ada pesanan yang belum dikirim"
        err.response?.data?.message ||         // Message lainnya
        "Gagal mengubah status warung";
      
      alert(errorMessage);
      
      set({ error: err.response?.data?.message || err.message });
    }
  }

}));

export default useAuthStore;