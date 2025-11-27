import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const allProducts = [
    { id: 1, name: "Indomie Goreng Original", price: "3.500", image: "https://picsum.photos/seed/prod1/200/200", rating: 50, stock: 50 },
    { id: 2, name: "Indomie Goreng Rendang", price: "3.500", image: "https://picsum.photos/seed/prod2/200/200", rating: 42, stock: 30 },
    { id: 3, name: "Indomie Ayam Bawang", price: "3.200", image: "https://picsum.photos/seed/prod3/200/200", rating: 60, stock: 40 },
    { id: 4, name: "Indomie Kari Ayam", price: "3.200", image: "https://picsum.photos/seed/prod4/200/200", rating: 45, stock: 55 },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Redirect ke home jika query kosong
    if (searchQuery.trim() === "") {
      navigate("/");
      return;
    }

    const results = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(results);
  }, [searchQuery, navigate]);

  return (
    <div className="bg-neutral-100 min-h-screen p-4 font-poppins">
      <h1 className="text-2xl font-bold mb-4">
        Hasil Pencarian: "{searchQuery}"
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Tidak ada produk yang cocok.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              image={p.image}
              name={p.name}
              price={p.price}
              rating={p.rating}
              stock={p.stock}
            />
          ))}
        </div>
      )}
    </div>
  );
}