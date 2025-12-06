import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ambil dari .env

const useNotificationStore = create((set, get) => ({
  notifications: [],

  // Fetch semua notifikasi
  fetchNotifications: async () => {
    try {
      const token = localStorage.getItem("token"); // pastikan token ada
      const res = await axios.get(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ notifications: res.data });
    } catch (err) {
      console.error("Fetch notif error:", err);
    }
  },

  // Tandai notifikasi dibaca
  readNotification: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/notifications/read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update state notifikasi di UI
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        ),
      }));
    } catch (err) {
      console.error("Read notif error:", err);
    }
  },
}));

export default useNotificationStore;
