import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ id, image, name, price, rating, stock }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow
                    p-4 sm:p-5 lg:p-6 cursor-pointer active:opacity-90"
    >
      
      {/* FOTO PRODUK — tetap square */}
      <div className="bg-gray-200 rounded-lg overflow-hidden mb-3 aspect-square flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-2/3 object-contain"
        />
      </div>

      {/* NAMA PRODUK */}
      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
        {name}
      </h3>

      {/* 5 BINTANG */}
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" size={14} />
        ))}
        <span className="text-xs text-gray-700 font-medium">({rating})</span>
      </div>

      {/* HARGA */}
      <p className="text-secondary-500 font-bold text-sm sm:text-base mt-1">
        Rp. {price}
      </p>

      {/* STOK */}
      <p className="text-gray-500 text-xs sm:text-sm mt-1">
        📦 Stok: {stock} pcs
      </p>
    </div>
  );
}