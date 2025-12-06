import React, { useState } from "react";
import { FiTrash2, FiCheck, FiPlus, FiMinus } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;

export default function CartItem({ item, onToggle, onQtyChange, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMinWarning, setShowMinWarning] = useState(false);
  const { _id, qty, selected, productId } = item;

  const imageUrl =
    productId?.images?.length > 0
      ? `${API_URL}/public/products/${productId.images[0]}`
      : "https://via.placeholder.com/200";

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(_id);
  };

  const handleDecrease = () => {
    if (qty <= 1) {
      setShowMinWarning(true);
      setTimeout(() => setShowMinWarning(false), 3000);
      return;
    }
    onQtyChange(_id, qty - 1);
  };

  return (
    <div 
      className={`w-full bg-white rounded-xl border border-neutral-100 p-3 sm:p-4 shadow-sm transition-all duration-300 ${
        isDeleting ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Warning Message */}
      {showMinWarning && (
        <div className="mb-3 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <span className="text-amber-600 text-sm sm:text-base">⚠️</span>
          <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
            Jumlah minimal adalah <strong>1 item</strong>. Gunakan tombol <strong className="text-red-600">"Hapus"</strong> untuk menghapus produk dari keranjang.
          </p>
        </div>
      )}

      <div className="flex gap-3 sm:gap-4">
        {/* CHECKBOX */}
        <button
          onClick={() => onToggle(_id)}
          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center border-2 transition-colors cursor-pointer mt-0.5 ${
            selected
              ? "bg-primary-500 border-primary-500"
              : "bg-white border-neutral-500 hover:border-primary-400"
          }`}
        >
          {selected && (
            <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white stroke-3" />
          )}
        </button>

        {/* IMAGE */}
        <img
          src={imageUrl}
          alt={productId?.name}
          className="w-16 h-16 lg:w-24 lg:h-24 rounded-lg object-cover shrink-0"
        />

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-semibold text-neutral-900 text-sm sm:text-base line-clamp-1 mb-0.5 sm:mb-1">
              {productId?.name}
            </h3>
            <p className="text-sm sm:text-base text-primary-600 font-bold">
              Rp. {productId?.price?.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* QTY CONTROL */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-700 text-xs sm:text-sm whitespace-nowrap">
                Jumlah:
              </span>
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white border border-neutral-300 rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2">
                <button
                  onClick={handleDecrease}
                  className={`transition-all ${
                    qty <= 1
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-neutral-700 hover:text-neutral-900 active:scale-95"
                  }`}
                >
                  <FiMinus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
                <span className="min-w-7 sm:min-w-8 text-center font-bold text-sm sm:text-base text-neutral-900">
                  {qty}
                </span>
                <button
                  onClick={() => onQtyChange(_id, qty + 1)}
                  className="text-neutral-700 hover:text-neutral-900 active:scale-95 transition-all"
                >
                  <FiPlus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex items-center justify-center gap-1.5 px-2 py-1 sm:px-3 sm:py-2 border border-red-500 text-red-600 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                isDeleting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-red-50 active:bg-red-100'
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isDeleting ? 'Menghapus...' : 'Hapus'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}