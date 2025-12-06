import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ambil dari .env

const useProductStore = create((set) => ({
  // ===== STATE =====
  products: [],
  categories: [],
  loading: false,
  error: null,

  productDetail: null,
  detailLoading: false,
  detailError: null,

  productReviews: [],
  reviewsLoading: false,
  reviewsError: null,

  // ===== FETCH SEMUA PRODUK =====
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      if (res.data?.success) {
        set({ products: res.data.data || [], loading: false });
      } else {
        set({ error: res.data?.message || "Fetch produk gagal", loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== FETCH KATEGORI =====
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      if (res.data) {
        const categoryNames = res.data.map((c) => c.name);
        const uniqueCats = [
          "Semua",
          ...[...new Set(categoryNames)].map(
            (name) => name.charAt(0).toUpperCase() + name.slice(1)
          ),
        ];
        set({ categories: uniqueCats, loading: false });
      } else {
        set({ error: "No categories found", loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== FETCH DETAIL PRODUK =====
  fetchProductDetail: async (id) => {
    if (!id) return null;
    set({ detailLoading: true, detailError: null });
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      if (res.data?.success) {
        set({ productDetail: res.data.data, detailLoading: false });
        return res.data.data;
      } else {
        set({ detailError: res.data?.message, detailLoading: false });
        return null;
      }
    } catch (err) {
      set({ detailError: err.message, detailLoading: false });
      return null;
    }
  },

  // ===== FETCH PRODUCT REVIEWS =====
  fetchProductReviews: async (productId) => {
    if (!productId) return;
    set({ reviewsLoading: true, reviewsError: null });
    try {
      const res = await axios.get(`${API_URL}/api/review/${productId}`);
      const reviews = res.data.reviews || res.data.data || [];
      set({ productReviews: reviews, reviewsLoading: false });
    } catch (err) {
      set({ reviewsError: err.message, reviewsLoading: false, productReviews: [] });
    }
  },
}));

export default useProductStore;
