import React from "react";
import Button from "./Button";

export default function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  product,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-sm shadow-lg animate-[fadeIn_0.2s_ease]">

        {/* TITLE */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3">
          Hapus Produk
        </h3>

        {/* IMAGE + TEXT */}
        <div className="flex items-start gap-2.5">
          
          {/* PRODUCT IMAGE */}
          <div className="w-12 h-12 rounded-md overflow-hidden bg-neutral-200">
            <img
              src={product?.images?.[0]?.id}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col">
            <p className="text-neutral-700 text-sm leading-snug">
              Apakah kamu yakin ingin menghapus produk
            </p>
            <p className="font-semibold text-neutral-900 text-sm mt-1">
              {product?.name}?
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2 mt-5">
          <Button
            variant="outline"
            fullWidth
            size="sm"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button
            variant="danger"
            fullWidth
            size="sm"
            onClick={onConfirm}
          >
            Hapus
          </Button>
        </div>

      </div>
    </div>
  );
}
