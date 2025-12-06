import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import Button from "./Button";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductModal({
  open,
  mode = "add",
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // FETCH CATEGORIES FROM BACKEND
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      console.log("Categories response:", res.data);
      
      // Handle different response formats
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (res.data.data && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else if (res.data.categories && Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  // LOAD INITIAL DATA FOR EDIT MODE
  useEffect(() => {
    if (open && mode === "edit" && initialData) {
      console.log("Loading initial data:", initialData);

      // Handle images for edit
      if (initialData.images && initialData.images.length > 0) {
        const existingImages = initialData.images.map((img) => ({
          id: img,
          file: null, // null berarti gambar existing
          url: img.startsWith("http") 
            ? img 
            : `${API_URL}/public/products/${img}`,
        }));
        setImages(existingImages);
      } else {
        setImages([]);
      }

      // Set category ID (bukan name)
      setCategory(initialData.category?._id || initialData.category || "");
      setName(initialData.name || "");
      setStock(initialData.stock?.toString() || "");
      setPrice(initialData.price?.toString() || "");
      setDescription(initialData.description || "");
    } else if (open && mode === "add") {
      // Reset untuk add mode
      setImages([]);
      setCategory("");
      setName("");
      setStock("");
      setPrice("");
      setDescription("");
    }
  }, [open, initialData, mode]);

  if (!open) return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("Maksimal 3 foto");
      return;
    }

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      url: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    const imgToRemove = images.find((img) => img.id === id);
    if (imgToRemove?.file) {
      URL.revokeObjectURL(imgToRemove.url);
    }
    setImages(images.filter((img) => img.id !== id));
  };

  const handleSubmit = () => {
    // Validasi
    if (!name.trim()) {
      alert("Nama produk harus diisi");
      return;
    }
    if (!category) {
      alert("Pilih kategori terlebih dahulu");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("Harga harus lebih dari 0");
      return;
    }
    if (!stock || Number(stock) < 0) {
      alert("Stok tidak boleh negatif");
      return;
    }

    const payload = {
      images: images.filter((img) => img.file !== null), // Only new images
      category,
      name,
      stock: Number(stock),
      price: Number(price),
      description,
    };

    console.log("Submitting payload:", payload);
    onSubmit && onSubmit(payload);
  };

  const handleClose = () => {
    // Clean up object URLs
    images.forEach((img) => {
      if (img.file && img.url) {
        URL.revokeObjectURL(img.url);
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm shadow-lg overflow-y-auto max-h-[88vh]">
        {/* TITLE */}
        <h1 className="text-lg font-bold mb-4">
          {mode === "add" ? "Tambah Produk" : "Ubah Produk"}
        </h1>

        {/* IMAGE UPLOAD */}
        <label className="font-semibold text-sm block mb-1.5">
          Foto Produk (Maksimal 3)
        </label>

        {images.length < 3 && (
          <label className="border-2 border-dashed border-gray-300 rounded-md p-3 flex items-center gap-2 cursor-pointer text-gray-700 text-sm mb-3 hover:border-green-500 transition-colors">
            <FiUpload className="text-lg" />
            <span className="font-medium">
              Upload Foto ({images.length}/3)
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={isSubmitting}
            />
          </label>
        )}

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {images.map((img) => (
              <div key={img.id} className="relative w-20 h-20">
                <img
                  src={img.url || img.id}
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                  alt="product"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />

                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  disabled={isSubmitting}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                >
                  <FiX size={10} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY */}
        <label className="font-semibold text-sm block mb-1.5">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loadingCategories || isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
        >
          <option value="">
            {loadingCategories ? "Memuat kategori..." : "Pilih Kategori"}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* NAME */}
        <label className="font-semibold text-sm block mb-1.5">
          Nama Produk
        </label>
        <input
          type="text"
          placeholder="Contoh: Sunlight 90ml"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        {/* STOCK */}
        <label className="font-semibold text-sm block mb-1.5">
          Stok (pcs)
        </label>
        <input
          type="number"
          placeholder="49"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          min="0"
        />

        {/* PRICE */}
        <label className="font-semibold text-sm block mb-1.5">
          Harga (Rp)
        </label>
        <input
          type="number"
          placeholder="2000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          min="0"
        />

        {/* DESCRIPTION (Optional) */}
        <label className="font-semibold text-sm block mb-1.5">
          Deskripsi (Opsional)
        </label>
        <textarea
          placeholder="Deskripsi produk..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows="3"
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />

        {/* BUTTONS */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            fullWidth
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>

          <Button
            variant="primary"
            fullWidth
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Menyimpan..."
              : mode === "add"
              ? "Simpan"
              : "Perbarui"}
          </Button>
        </div>
      </div>
    </div>
  );
}