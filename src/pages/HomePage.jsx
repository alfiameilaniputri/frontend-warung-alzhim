import React from "react";
import { FaStar } from "react-icons/fa";

// Import komponen
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  // Data kategori
  const categories = [
    { image: "/semua.png", label: "Semua" },
    { image: "/sembako.png", label: "Sembako" },
    { image: "/makanan.png", label: "Makanan" },
    { image: "/minuman.png", label: "Minuman" },
    { image: "/kebersihan.png", label: "Kebersihan" },
    { image: "/lainnya.png", label: "Lainnya" },
  ];

  // Data produk terbaru pakai gambar random
  const newProducts = [
    {
      id: 1, // tambahkan id
      image: "https://picsum.photos/seed/prod1/200/200",
      name: "Indomie Goreng Original",
      price: "3.500",
      rating: 50,
      stock: 50,
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/prod2/200/200",
      name: "Indomie Goreng Rendang",
      price: "3.500",
      rating: 42,
      stock: 30,
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/prod3/200/200",
      name: "Indomie Ayam Bawang",
      price: "3.200",
      rating: 60,
      stock: 40,
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/prod4/200/200",
      name: "Indomie Kari Ayam",
      price: "3.200",
      rating: 45,
      stock: 55,
    },
  ];

  // Data produk terlaris
  const bestSellingProducts = [
    { image: "/makanan.png", name: "Indomie Goreng", price: "3.500" },
    { image: "/minuman.png", name: "Aqua Botol 600 ml", price: "3.000" },
    { image: "/sembako.png", name: "Gula Putih 1/4", price: "5.000" },
  ];

  return (
    <div className="bg-neutral-100 pb-12 font-poppins">
      {/* ==================== BANNER ==================== */}
      <div className="w-full p-4 lg:pt-10">
        {/* Banner Mobile */}
        <img
          src="/banner-warung-alzhim-persegi.png"
          alt="banner mobile"
          className="w-full rounded-xl shadow block lg:hidden mt-2"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/600x300?text=Mobile+Banner")
          }
        />

        {/* Banner Desktop */}
        <img
          src="/banner-warung-alzhim.png"
          alt="banner desktop"
          className="w-full rounded-xl shadow hidden lg:block"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/1200x300?text=Desktop+Banner")
          }
        />
      </div>

      {/* ==================== PRODUK TERLARIS ==================== */}
      <div className="w-full mt-6 px-2 lg:gap-6">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/produk-terlaris.png"
            alt="terlaris"
            className="w-6 h-6 object-contain mb-1"
          />
          <h2 className="text-lg font-bold text-neutral-900">
            Produk Terlaris
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:gap-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
          {bestSellingProducts.map((item, i) => (
            <div
              key={i}
              className="bg-secondary-50 rounded-xl shadow border-l-4 border-secondary-500 flex flex-col justify-between items-center text-center p-3 aspect-square md:aspect-auto"
            >
              <img
                src={item.image}
                className="w-10 h-10 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain mb-2"
              />
              <h3 className="font-bold text-xs sm:text-sm lg:text-base line-clamp-2">
                {item.name}
              </h3>
              <p className="font-bold text-secondary-500 text-base sm:text-md lg:text-xl mt-1">
                Rp. {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== KATEGORI ==================== */}
      <div className="w-full mt-10 px-2">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/kategori-produk.png"
            alt="kategori"
            className="w-6 h-6 object-contain"
          />
          <h2 className="text-lg font-bold text-neutral-900">
            Kategori Produk
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 lg:gap-10">
          {categories.map((item, i) => (
            <CategoryCard key={i} image={item.image} label={item.label} />
          ))}
        </div>
      </div>

      {/* ==================== PRODUK TERBARU ==================== */}
      <div className="w-full mt-10 px-2">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/produk-terbaru.png"
            alt="terbaru"
            className="w-6 h-6 object-contain mb-1"
          />
          <h2 className="text-lg font-bold text-neutral-900">Produk Terbaru</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-6">
          {newProducts.map((p, i) => (
            <ProductCard
              key={i}
              id={p.id}
              image={p.image}
              name={p.name}
              price={p.price}
              rating={p.rating}
              stock={p.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
