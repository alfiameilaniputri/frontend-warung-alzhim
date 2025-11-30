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
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow
                 cursor-pointer active:opacity-90 p-3 sm:p-4"
    >
      
      {/* FOTO PRODUK — DENGAN PADDING */}
      <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* KONTEN */}
      <div>
        {/* NAMA PRODUK */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
          {name}
        </h3>

        {/* 5 BINTANG */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" size={12} />
          ))}
          <span className="text-xs text-gray-600 ml-1">({rating})</span>
        </div>

        {/* HARGA */}
        <p className="text-secondary-500 font-bold text-base sm:text-lg mb-1">
          Rp. {price}
        </p>

        {/* STOK */}
        <p className="text-gray-500 text-xs flex items-center gap-1">
          📦 Stok: {stock} pcs
        </p>
      </div>
    </div>
  );
}