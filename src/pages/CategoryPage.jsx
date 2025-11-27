import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "Semua"
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  const categories = [
    "Semua",
    "Sembako",
    "Makanan",
    "Minuman",
    "Kebersihan",
    "Lainnya",
  ];

  const allProducts = [
    {
      id: 1,
      name: "Indomie Goreng Original",
      category: "Sembako",
      price: "3500",
      image: "/indomie.jpg",
      rating: 50,
      stock: 50,
    },
    {
      id: 2,
      name: "Aqua 600ml",
      category: "Minuman",
      price: "3000",
      image: "/minuman.png",
      rating: 42,
      stock: 30,
    },
    {
      id: 3,
      name: "Gula Pasir 1kg",
      category: "Sembako",
      price: "16000",
      image: "/gula.png",
      rating: 48,
      stock: 20,
    },
    {
      id: 4,
      name: "Beras Premium 1kg",
      category: "Sembako",
      price: "15000",
      image: "/beras.png",
      rating: 55,
      stock: 25,
    },
    {
      id: 5,
      name: "Teh Pucuk Harum 350ml",
      category: "Minuman",
      price: "4000",
      image: "/tehpucuk.png",
      rating: 44,
      stock: 18,
    },
    {
      id: 6,
      name: "Kopi Kapal Api Sachet",
      category: "Minuman",
      price: "1500",
      image: "/kopi.png",
      rating: 38,
      stock: 40,
    },
    {
      id: 7,
      name: "Sabun Lifebuoy Merah",
      category: "Kebersihan",
      price: "3500",
      image: "/sabun.png",
      rating: 47,
      stock: 35,
    },
    {
      id: 8,
      name: "Shampoo Sunsilk Sachet",
      category: "Kebersihan",
      price: "1500",
      image: "/sunsilk.png",
      rating: 36,
      stock: 50,
    },
    {
      id: 9,
      name: "Chitato Sapi Panggang 68g",
      category: "Makanan",
      price: "12000",
      image: "/chitato.png",
      rating: 52,
      stock: 15,
    },
    {
      id: 10,
      name: "Susu Kental Manis Frisian Flag",
      category: "Sembako",
      price: "11000",
      image: "/skm.png",
      rating: 49,
      stock: 20,
    },
  ];

  // 🟦 FILTER PRODUK
  const products =
    selectedCategory === "Semua"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full pb-52">
      {/* HEADER */}
      <div className="flex items-center justify-between px-0 pt-4 relative">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <FiChevronLeft size={24} />
          </button>

          {/* MOBILE TITLE */}
          <h1 className="text-xl font-bold sm:hidden">
            {selectedCategory === "Semua" ? "Daftar Produk" : selectedCategory}
          </h1>

          {/* DESKTOP TITLE (dinamis dan tidak double) */}
          <h1 className="hidden sm:block text-xl font-bold">
            Daftar Produk{" "}
            {selectedCategory !== "Semua" && `${selectedCategory}`}
          </h1>
        </div>

        {/* BUTTON DROPDOWN */}
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border rounded-full px-6 py-2 flex items-center text-sm font-medium shadow-sm bg-white"
        >
          {selectedCategory}
          <FiChevronDown className="ml-2" size={16} />
        </button>

        {/* DROPDOWN */}
        {openDropdown && (
          <div className="absolute right-0 top-14 bg-white shadow-lg rounded-lg border w-40 z-50">
            {categories.map((cat) => (
              <button
                key={cat}
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
      <div
        className="px-4 mt-6 grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-4 
        gap-4 sm:gap-5 pb-10"
      >
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              stock={p.stock}
              rating={p.rating}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 pt-10">
            Produk tidak ditemukan
          </p>
        )}
      </div>
    </div>
  );
}
