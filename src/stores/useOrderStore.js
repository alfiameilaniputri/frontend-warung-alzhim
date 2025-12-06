import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useOrderStore = create((set, get) => ({
  orders: [],
  onlineOrders: [],
  offlineOrders: [],
  currentOrder: null,
  loading: false,
  error: null,

  // ============================
  // CREATE ORDER
  // ============================
  createOrder: async (items) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/order`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success || res.data?.data) {
        set({ currentOrder: res.data.data, loading: false });
        return res.data.data;
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Gagal membuat order",
          loading: false,
        });
        return null;
      }
    } catch (err) {
      console.error("Error creating order:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return null;
    }
  },

  createOfflineOrder: async (payload) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/order/offline`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success || res.data?.data) {
        set({ currentOrder: res.data.data, loading: false });
        return res.data.data;
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Gagal membuat order",
          loading: false,
        });
        return null;
      }
    } catch (err) {
      console.error("Error creating order:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return null;
    }
  },

  // ============================
  // GET ORDER DETAIL
  // ============================
  fetchOrderDetail: async (orderId) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success || res.data?.data) {
        const orderData = res.data.data;
        orderData.items = orderData.items || [];
        set({ currentOrder: orderData, loading: false });
        return orderData;
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Order tidak ditemukan",
          loading: false,
        });
        return null;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return null;
    }
  },

  // ============================
  // GET USER ORDERS (Buyer)
  // ============================
  fetchOrders: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success || res.data?.data) {
        const orders = res.data.data.map((o) => ({
          ...o,
          items: o.items || [],
        }));
        set({ orders, loading: false });
        return orders; // <- return data supaya bisa di-await
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Gagal mengambil orders",
          loading: false,
        });
        return [];
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return [];
    }
  },

  // ============================
  // GET ALL ORDERS (Admin)
  // ============================
  fetchAllOrders: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/order/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success || res.data?.data) {
        const orders = res.data.data.map((o) => ({
          ...o,
          items: o.items || [],
        }));
        set({ orders, loading: false });
        return orders;
      } else {
        set({
          error:
            res.data?.message ||
            res.data?.msg ||
            "Gagal mengambil semua orders",
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // ============================
  // GET ONLINE ORDERS (Admin)
  // ============================
  fetchOnlineOrders: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/order/online-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Support both response formats: {success, data} or {msg, data}
      if (res.data?.data) {
        const orders = res.data.data.map((o) => ({
          ...o,
          items: o.items || [],
        }));
        set({ onlineOrders: orders, loading: false, error: null });
        return orders;
      } else {
        set({
          error:
            res.data?.message ||
            res.data?.msg ||
            "Gagal mengambil online orders",
          loading: false,
        });
        return [];
      }
    } catch (err) {
      console.error("Error fetching online orders:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return [];
    }
  },

  // ============================
  // GET OFFLINE ORDERS (Admin)
  // ============================
  fetchOfflineOrders: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/order/offline-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Support both response formats: {success, data} or {msg, data}
      if (res.data?.data) {
        const orders = res.data.data.map((o) => ({
          ...o,
          items: o.items || [],
        }));
        set({ offlineOrders: orders, loading: false, error: null });
        return orders;
      } else {
        set({
          error:
            res.data?.message ||
            res.data?.msg ||
            "Gagal mengambil offline orders",
          loading: false,
        });
        return [];
      }
    } catch (err) {
      console.error("Error fetching offline orders:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return [];
    }
  },

  // ============================
  // GET DAILY STATS (Admin)
  // ============================
  fetchDailyStats: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/order/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success || res.data?.data) {
        set({ loading: false });
        return res.data.data;
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Gagal mengambil stats",
          loading: false,
        });
        return null;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      return null;
    }
  },

  // ============================
  // CONFIRM ORDER COMPLETED
  // ============================
  confirmOrderCompleted: async (orderId) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${API_URL}/api/order/confirm/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success || res.data?.data) {
        set({ loading: false });
        return true;
      } else {
        set({
          error: res.data?.message || res.data?.msg || "Gagal konfirmasi order",
          loading: false,
        });
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

  // ============================
  // GET SNAP TOKEN
  // ============================
  getSnapToken: () => {
    const order = get().currentOrder;
    if (!order) return null;
    return order.payment?.snapToken || order.snapToken || null;
  },

  // ============================
  // GET REDIRECT URL (Midtrans)
  // ============================
  getRedirectUrl: () => {
    const order = get().currentOrder;
    if (!order) return null;
    return order.payment?.redirectUrl || order.redirectUrl || null;
  },
}));

export default useOrderStore;
