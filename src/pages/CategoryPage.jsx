import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import useProductStore from "../stores/useProductStore";

export default function CategoryPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    loading,
    error,
  } = useProductStore();

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName ? categoryName : "Semua"
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  // fetch produk & kategori saat halaman load
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // filter produk berdasarkan kategori
  const filteredProducts =
    selectedCategory.toLowerCase() === "semua"
      ? products
      : products.filter(
          (p) =>
            p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
        );
        

  return (
    <div className="w-full pb-52">
      {/* HEADER */}
      <div className="flex items-center justify-between px-0 pt-4 relative">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold sm:hidden">
            {selectedCategory === "Semua" ? "Daftar Produk" : selectedCategory}
          </h1>
          <h1 className="hidden sm:block text-xl font-bold">
            Daftar Produk{" "}
            {selectedCategory !== "Semua" && `${selectedCategory}`}
          </h1>
        </div>

        {/* DROPDOWN KATEGORI */}
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border rounded-full px-6 py-2 flex items-center text-sm font-medium shadow-sm bg-white"
        >
          {selectedCategory}
          <FiChevronDown className="ml-2" size={16} />
        </button>

        {openDropdown && (
          <div className="absolute right-0 top-14 bg-white shadow-lg rounded-lg border w-40 z-50">
            {categories.map((cat, index) => (
              <button
                key={index} // bisa pakai index karena sekarang hanya string nama kategori
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                  selectedCategory === cat
                    ? "font-semibold text-primary-600"
                    : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GRID PRODUK */}
      <div className="px-4 mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 pb-10">
        {loading && <p className="col-span-full text-center">Loading...</p>}
        {error && (
          <p className="col-span-full text-center text-red-500">{error}</p>
        )}
        {!loading && filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 pt-10">
            Produk tidak ditemukan
          </p>
        )}
        {!loading &&
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              name={p.name}
              price={p.price}
              image={
                p.images?.length > 0
                  ? `${API_URL}/public/products/${p.images[0]}`
                  : "https://via.placeholder.com/200"
              }
              stock={p.stock}
              rating={p.rating || 0}
            />
          ))}
      </div>
    </div>
  );
}
