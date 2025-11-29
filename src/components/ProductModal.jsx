import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import Button from "./Button";

export default function ProductModal({
  open,
  mode = "add",
  initialData = null,
  onClose,
  onSubmit,
}) {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  // LOAD INITIAL DATA FOR EDIT MODE
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setImages(initialData.images || []);
      setCategory(initialData.category || "");
      setName(initialData.name || "");
      setStock(initialData.stock || "");
      setPrice(initialData.price || "");
    }
  }, [initialData, mode]);

  if (!open) return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) return;

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleSubmit = () => {
    const payload = {
      images,
      category,
      name,
      stock,
      price,
    };
    onSubmit && onSubmit(payload);
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
          <label className="border-2 border-dashed border-gray-300 rounded-md p-3 flex items-center gap-2 cursor-pointer text-gray-700 text-sm mb-3">
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
            />
          </label>
        )}

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div className="flex gap-2 mb-3">
            {images.map((img) => (
              <div key={img.id} className="relative w-20 h-20">
                <img
                  src={img.id}
                  className="w-full h-full object-cover rounded-md"
                  alt="product"
                />

                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1"
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
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3"
        >
          <option value="">Pilih Kategori</option>
          <option value="Sembako">Sembako</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Kebersihan">Kebersihan</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        {/* NAME */}
        <label className="font-semibold text-sm block mb-1.5">Nama Produk</label>
        <input
          type="text"
          placeholder="Masukkan nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3"
        />

        {/* STOCK */}
        <label className="font-semibold text-sm block mb-1.5">Stok (pcs)</label>
        <input
          type="number"
          placeholder="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-3"
        />

        {/* PRICE */}
        <label className="font-semibold text-sm block mb-1.5">Harga (Rp)</label>
        <input
          type="number"
          placeholder="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm mb-4"
        />

        {/* BUTTONS */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            fullWidth
            size="sm"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button
            variant="primary"
            fullWidth
            size="sm"
            onClick={handleSubmit}
          >
            {mode === "add" ? "Simpan" : "Perbarui"}
          </Button>
        </div>
      </div>
    </div>
  );
}
