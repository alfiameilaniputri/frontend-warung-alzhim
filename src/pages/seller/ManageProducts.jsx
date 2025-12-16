import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../../components/Button";
import ProductModal from "../../components/ProductModal";
import useProductStore from "../../stores/useProductStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ManageProducts() {
  const { products, loading, error, fetchProducts } = useProductStore();

  // MODAL STATES
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => {
        setLocalError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [localError]);

  // ADD PRODUCT
  const handleAdd = async (data) => {
    setIsSubmitting(true);
    setLocalError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      // Add images
      if (data.images && data.images.length > 0) {
        data.images.forEach((img) => {
          if (img.file) {
            formData.append("images", img.file);
          }
        });
      }

      const res = await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success || res.data?.data) {
        setOpenAdd(false);
        fetchProducts(); // Refresh list
        alert("Produk berhasil ditambahkan!");
      } else {
        setLocalError(res.data?.message || res.data?.msg || "Gagal membuat produk");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setLocalError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (item) => {
    setSelected(item);
    setOpenEdit(true);
  };

  // SUBMIT EDIT
  const handleEdit = async (data) => {
    setIsSubmitting(true);
    setLocalError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);

      // Add new images
      if (data.images && data.images.length > 0) {
        data.images.forEach((img) => {
          if (img.file) {
            formData.append("images", img.file);
          }
        });
      }

      const res = await axios.put(
        `${API_URL}/api/products/${selected._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success || res.data?.data) {
        setOpenEdit(false);
        fetchProducts(); // Refresh list
        alert("Produk berhasil diperbarui!");
      } else {
        setLocalError(res.data?.message || res.data?.msg || "Gagal perbarui produk");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setLocalError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OPEN DELETE
  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setOpenDelete(true);
  };

  // SUBMIT DELETE
  const handleDelete = async () => {
    setIsSubmitting(true);
    setLocalError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${API_URL}/api/products/${deleteTarget._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success || res.status === 200) {
        setOpenDelete(false);
        fetchProducts(); // Refresh list
        alert("Produk berhasil dihapus!");
      } else {
        setLocalError(res.data?.message || res.data?.msg || "Gagal hapus produk");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setLocalError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get image URL
// Helper to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/200";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/public/products/${imagePath}`;
  };

  return (
    <div className="p-2 pt-14 md:pt-4">
      {/* PAGE TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
        Kelola Produk
      </h1>

      {/* ERROR ALERT */}
      {(error || localError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error || localError}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 sm:p-5 md:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-nowrap">
          <h2 className="text-sm md:text-lg font-semibold text-neutral-800 truncate">
            Daftar Produk
          </h2>

          <Button
            variant="primary"
            size="sm"
            className="shrink-0 flex items-center gap-1 px-2 py-1 text-xs lg:text-sm"
            onClick={() => setOpenAdd(true)}
            disabled={loading}
          >
            <FiPlus size={16} />
            Tambah Produk
          </Button>
        </div>

        {/* LOADING STATE */}
        {loading && products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-neutral-600">Memuat produk...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">Belum ada produk</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => setOpenAdd(true)}
            >
              Tambah Produk Pertama
            </Button>
          </div>
        ) : (
          /* PRODUCT LIST */
          <div className="flex flex-col gap-3">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                {/* LEFT SIDE: IMAGE + INFO */}
                <div className="flex flex-1 items-start sm:items-center gap-3 min-w-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0">
                    <img
                      src={getImageUrl(item.images?.[0])}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {item.name}
                    </p>

                    {/* CATEGORY + STOCK + PRICE */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-1 text-xs sm:text-sm">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
                        {item.category?.name || item.category || "Uncategorized"}
                      </span>

                      {/* STOCK + PRICE HORIZONTAL */}
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500">
                          Stok: {item.stock} Pcs
                        </span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-600">
                          Rp {item.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT BUTTONS: RESPONSIVE HORIZONTAL */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-500 hover:bg-green-50 text-xs px-3 py-1 flex-1 sm:flex-none"
                    onClick={() => openEditModal(item)}
                    disabled={loading || isSubmitting}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    className="text-xs px-3 py-1 flex-1 sm:flex-none"
                    onClick={() => openDeleteModal(item)}
                    disabled={loading || isSubmitting}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      <ProductModal
        open={openAdd}
        mode="add"
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAdd}
        isSubmitting={isSubmitting}
      />

      {/* EDIT MODAL */}
      <ProductModal
        open={openEdit}
        mode="edit"
        initialData={selected}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEdit}
        isSubmitting={isSubmitting}
      />

      {/* DELETE MODAL */}
      {openDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-5 rounded-xl w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold">Hapus Produk</h3>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-200">
                <img
                  src={getImageUrl(deleteTarget?.images?.[0])}
                  alt={deleteTarget?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />
              </div>

              <div className="min-w-0">
                <p className="font-semibold truncate">{deleteTarget?.name}</p>
                <p className="text-sm text-neutral-500">
                  {deleteTarget?.category?.name || deleteTarget?.category}
                </p>
              </div>
            </div>

            <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
              Yakin ingin menghapus produk{" "}
              <span className="font-semibold text-red-600">
                "{deleteTarget?.name}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2 mt-6 flex-wrap sm:flex-nowrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenDelete(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menghapus..." : "Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}