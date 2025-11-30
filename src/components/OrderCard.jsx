import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ data, onDetailClick, onOpenReview }) {
  const navigate = useNavigate();

  let items = Array.isArray(data?.items) ? data.items.slice() : [];

  if (items.length === 0 && data) {
    const base = {
      name: data.productName ?? "",
      image: data.image ?? "",
      quantity: data.quantity ?? 0,
      price: data.price ?? 0,
    };
    items = [base];

    if (data.hasAdditionalItem) {
      items.push({
        name: data.additionalItemName ?? "",
        image: data.image ?? "",
        quantity: data.additionalQuantity ?? 0,
        price: data.additionalPrice ?? 0,
      });
    }
  }

  const statusKey = (data?.status || data?.statusText || "").toLowerCase();
  const sudahUlas = data?.reviewGiven === true;
  const totalFormatted = Number(data?.total ?? 0).toLocaleString("id-ID");

  // Tombol action
  const LihatDetailButton = (
    <Button
      variant="outline"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-white border-emerald-600 text-emerald-600 w-full md:w-auto"
      onClick={() => onDetailClick?.(data)}
    >
      Lihat Detail
    </Button>
  );

  const BayarSekarangButton = (
    <Button
      variant="primary"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
      onClick={() => navigate(`/payment/${data.transaction}`)}
    >
      Bayar Sekarang
    </Button>
  );

  const MenungguPengirimanButton = (
    <Button
      variant="outline"
      size="sm"
      disabled
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-secondary-100 border-secondary-300 text-secondary-700 cursor-not-allowed w-full md:w-auto"
    >
      Menunggu Pengiriman
    </Button>
  );

  const PesananDiterimaButton = (
    <Button
      variant="primary"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-900 text-white w-full md:w-auto"
    >
      Pesanan Diterima
    </Button>
  );

  const BerikanUlasanButton = (
    <Button
      variant="primary"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
    >
      Berikan Ulasan
    </Button>
  );

 const renderActionButton = () => {
  if (statusKey === "belum bayar" || statusKey === "unpaid")
    return BayarSekarangButton;
  if (statusKey === "dibayar" || statusKey === "paid")
    return MenungguPengirimanButton;
  if (statusKey === "dikirim" || statusKey === "sent")
    return PesananDiterimaButton;
  
  // Selesai
  if (statusKey === "selesai" || statusKey === "completed") {
    // Jika sudah diulas, tidak tampilkan tombol action
    if (sudahUlas) {
      return null;
    }
    
    // Jika belum diulas, tampilkan tombol Berikan Ulasan
    return (
      <Button
        variant="primary"
        size="sm"
        className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
        onClick={() => onOpenReview?.(data)}
      >
        Berikan Ulasan
      </Button>
    );
  }
  
  return null;
};

  const getStatusStyle = (s) => {
    switch ((s || "").toLowerCase()) {
      case "belum bayar":
      case "unpaid":
        return "text-green-600 italic";
      case "dibayar":
      case "paid":
        return "text-secondary-600 italic";
      case "dikirim":
      case "sent":
        return "text-black italic";
      case "selesai":
      case "completed":
        return "text-emerald-700 italic";
      default:
        return "text-gray-500 italic";
    }
  };

  return (
    <div className="relative bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
      {/* Status di pojok kanan atas */}
      <span
        className={`absolute top-3 right-3 text-xs md:text-sm font-medium ${getStatusStyle(
          data?.statusText
        )}`}
      >
        {data?.statusText}
      </span>

      <div className="p-3 sm:p-4 md:p-5">
        {/* Semua items */}
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div
              key={idx}
              className={`flex gap-3 md:gap-4 ${
                idx !== items.length - 1 ? "pb-3 border-b border-gray-200" : ""
              }`}
            >
              {/* Foto */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Nama + qty × harga di samping foto */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="font-semibold text-gray-900 text-sm md:text-base leading-tight truncate">
                  {it.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
                  {it.quantity} x Rp{" "}
                  {Number(it.price ?? 0).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total & tombol */}
        <div className="pt-3 md:pt-4 mt-3 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">
              Total: Rp {totalFormatted}
            </p>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              {LihatDetailButton}
              {renderActionButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}