import React from "react";
import { FiTrash2, FiCheck, FiPlus, FiMinus } from "react-icons/fi";

export default function CartItem({
  item = {},
  onToggle,
  onQtyChange,
  onDelete,
}) {
  if (!item || !item.id) return null;

  const {
    id,
    name = "Produk",
    price = 0,
    qty = 1,
    img,
    selected = false,
  } = item;

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-100 p-3 sm:p-4 shadow-sm">
      {" "}
      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={() => onToggle(id)}
          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center border-2 transition-colors cursor-pointer mt-0.5 ${
            selected
              ? "bg-primary-500 border-primary-500"
              : "bg-white border-neutral-500 hover:border-primary-400"
          }`}
        >
          {selected && (
            <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white stroke-3" />
          )}{" "}
        </button>
        <img
          src={img || "https://via.placeholder.com/200"}
          alt={name}
          className="w-16 h-16 lg:w-24 lg:h-24 rounded-lg object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-semibold text-neutral-900 text-sm sm:text-base line-clamp-1 mb-0.5 sm:mb-1">
              {name}
            </h3>
            <p className="text-sm sm:text-base text-primary-600 font-bold">
              Rp. {price.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-neutral-700 text-xs sm:text-sm whitespace-nowrap">
                Jumlah:
              </span>
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white border border-neutral-300 rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2">
                <button
                  onClick={() => onQtyChange(id, Math.max(1, qty - 1))}
                  className="text-neutral-700 hover:text-neutral-900 active:scale-95 transition-all"
                >
                  <FiMinus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
                <span className="min-w-7 sm:min-w-8 text-center font-bold text-sm sm:text-base text-neutral-900">
                  {qty}
                </span>
                <button
                  onClick={() => onQtyChange(id, qty + 1)}
                  className="text-neutral-700 hover:text-neutral-900 active:scale-95 transition-all"
                >
                  <FiPlus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="flex items-center justify-center gap-1.5 px-2 py-1 sm:px-3 sm:py-2 border border-red-500 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 active:bg-red-100 transition-colors shrink-0"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
