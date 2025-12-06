import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import useProductStore from "../stores/useProductStore";

export default function HomePage() {
  const { products, fetchProducts, loading, error } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = [
    { image: "/semua.png", label: "Semua" },
    { image: "/sembako.png", label: "Sembako" },
    { image: "/makanan.png", label: "Makanan" },
    { image: "/minuman.png", label: "Minuman" },
    { image: "/kebersihan.png", label: "Kebersihan" },
    { image: "/lainnya.png", label: "Lainnya" },
  ];

  // Mapping kategori ke ikon (pakai lowercase sesuai database)
  const categoryIcons = {
    sembako: "/sembako.png",
    makanan: "/makanan.png",
    minuman: "/minuman.png",
    kebersihan: "/kebersihan.png",
    lainnya: "/lainnya.png",
  };

  // filter produk berdasarkan kategori
  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter(
          (p) =>
            p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Ambil 3 produk terlaris (berdasarkan sold tertinggi)
  const bestSellingProducts = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 3);

  return (
    <div className="bg-neutral-100 pb-12 font-poppins">
      {/* Banner */}
      <div className="w-full p-4 lg:pt-10">
        <img
          src="/banner-warung-alzhim-persegi.png"
          alt="banner mobile"
          className="w-full rounded-xl shadow block lg:hidden mt-2"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/600x300?text=Mobile+Banner")
          }
        />
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

        {loading ? (
          <p>Loading produk...</p>
        ) : bestSellingProducts.length === 0 ? (
          <p>Belum ada produk terlaris.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 lg:gap-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
            {bestSellingProducts.map((item) => {
              // Ambil ikon berdasarkan kategori (lowercase)
              const categoryName =
                item.category?.name?.toLowerCase() || "lainnya";
              const iconUrl = categoryIcons[categoryName] || "/lainnya.png";

              return (
                <Link key={item._id} to={`/product/${item._id}`}>
                  <div className="bg-secondary-50 rounded-xl shadow border-l-4 border-secondary-500 flex flex-col justify-between items-center text-center p-3 aspect-square md:aspect-auto hover:shadow-lg transition-shadow">
                    <img
                      src={iconUrl}
                      alt={categoryName}
                      className="w-10 h-10 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain mb-2"
                    />
                    <h3 className="font-bold text-xs sm:text-sm lg:text-base line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="font-bold text-secondary-500 text-base sm:text-md lg:text-xl mt-1">
                      Rp. {(item.price || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Kategori */}
      <div className="w-full mt-10 px-2">
        <div className="flex items-center gap-2 mb-4">
          <img src="/kategori-produk.png" alt="kategori" className="w-6 h-6" />
          <h2 className="text-lg font-bold text-neutral-900">
            Kategori Produk
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 lg:gap-10">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.label}
              image={cat.image}
              label={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
            />
          ))}
        </div>
      </div>

      {/* Produk Terbaru */}
      <div className="w-full mt-10 px-2">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/produk-terbaru.png"
            alt="terbaru"
            className="w-6 h-6 object-contain mb-1"
          />
          <h2 className="text-lg font-bold text-neutral-900">Produk Terbaru</h2>
        </div>

        {loading ? (
          <p>Loading produk...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p>Produk tidak tersedia.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-16">
            {filteredProducts.map((p) => {
              if (!p || !p._id) {
                console.warn("⚠️ Produk tidak valid:", p);
                return null;
              }

              let imageUrl = "https://via.placeholder.com/200?text=No+Image";
              try {
                if (
                  p.images &&
                  Array.isArray(p.images) &&
                  p.images.length > 0 &&
                  typeof p.images[0] === "string" &&
                  p.images[0].trim() !== ""
                ) {
                  imageUrl = `${API_URL}/public/products/${p.images[0]}`;
                }
              } catch (err) {
                console.error("❌ Error processing image:", err);
              }

              return (
                <Link key={p._id} to={`/product/${p._id}`}>
                  <ProductCard
                    id={p._id}
                    image={imageUrl}
                    name={p.name || "Produk"}
                    price={p.price || 0}
                    rating={p.rating || 5}
                    stock={p.stock ?? 0}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
