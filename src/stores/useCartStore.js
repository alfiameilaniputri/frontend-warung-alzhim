import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  error: null,
  updateTimers: {}, // untuk debounce

  // ============================
  // GET CART
  // ============================
  fetchCart: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          error: "Token tidak ditemukan. Silakan login kembali.",
          loading: false,
          cartItems: []
        });
        return;
      }

      const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        const items = (res.data.data || []).map(item => ({
          ...item,
          selected: item.selected || false
        }));
        set({ cartItems: items, loading: false });
      } else {
        set({
          error: res.data?.message || "Gagal mengambil keranjang",
          loading: false,
          cartItems: []
        });
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
        cartItems: []
      });
    }
  },

  // ============================
  // ADD ITEM (FIXED)
  // ============================
  addCartItem: async (product, quantity = 1) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          error: "Token tidak ditemukan. Silakan login kembali.",
          loading: false,
        });
        return false;
      }

      // Validasi input
      if (!product || !product._id) {
        set({
          error: "Product ID tidak valid",
          loading: false,
        });
        return false;
      }

      const qty = Number(quantity);
      if (isNaN(qty) || qty < 1) {
        set({
          error: "Quantity harus minimal 1",
          loading: false,
        });
        return false;
      }

      const res = await axios.post(
        `${API_URL}/api/cart`,
        {
          productId: product._id, // Gunakan _id, bukan id
          qty: qty,
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (res.data?.success) {
        // Refresh cart setelah berhasil tambah
        await get().fetchCart();
        set({ loading: false });
        return true;
      } else {
        set({
          error: res.data?.message || "Tambah cart gagal",
          loading: false,
        });
        return false;
      }
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err);
      set({
        error: err.response?.data?.message || err.message || "Gagal menambahkan ke keranjang",
        loading: false,
      });
      return false;
    }
  },

  // ============================
  // UPDATE QTY (OPTIMISTIC + DEBOUNCED)
  // ============================
  updateCartItem: async (cartItemId, quantity) => {
    if (quantity < 1) return false;

    const currentItem = get().cartItems.find(item => item._id === cartItemId);
    if (!currentItem) return false;

    // LANGSUNG UPDATE UI (instant)
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === cartItemId ? { ...item, qty: quantity } : item
      ),
    }));

    // DEBOUNCE: tunggu 500ms sebelum kirim ke server
    const timers = get().updateTimers;
    if (timers[cartItemId]) {
      clearTimeout(timers[cartItemId]);
    }

    const newTimer = setTimeout(async () => {
      // BACKGROUND: sync ke server
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.put(
          `${API_URL}/api/cart/${cartItemId}`,
          { qty: quantity },
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );
      } catch (err) {
        // Rollback jika error
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === cartItemId ? { ...item, qty: currentItem.qty } : item
          ),
        }));
        console.error("Failed to update cart:", err.message);
      }

      // Hapus timer setelah selesai
      set((state) => {
        const { [cartItemId]: removed, ...rest } = state.updateTimers;
        return { updateTimers: rest };
      });
    }, 500);

    // Simpan timer
    set((state) => ({
      updateTimers: { ...state.updateTimers, [cartItemId]: newTimer }
    }));

    return true;
  },

  // ============================
  // DELETE ITEM (OPTIMISTIC)
  // ============================
  removeCartItem: async (cartItemId) => {
    const removedItem = get().cartItems.find(item => item._id === cartItemId);
    if (!removedItem) return false;

    // LANGSUNG HAPUS DARI UI (instant)
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== cartItemId),
    }));

    // BACKGROUND: sync ke server
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      await axios.delete(`${API_URL}/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return true;
    } catch (err) {
      // Hanya restore jika error
      set((state) => ({
        cartItems: [...state.cartItems, removedItem],
      }));
      console.error("Failed to delete cart item:", err.message);
      return false;
    }
  },
  clearCart: async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/api/cart/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ cartItems: [], totalPrice: 0 });
  } catch (err) {
    console.error("Error clearing cart:", err);
  }
},
}));

export default useCartStore;