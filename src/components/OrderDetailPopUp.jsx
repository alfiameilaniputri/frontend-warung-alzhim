import React from "react";
import Button from "./Button";

export default function OrderDetailPopup({
  isOpen,
  onClose,
  orderData,
  isLoading,
}) {
  const API_URL = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  // Show loading state
  if (isLoading || !orderData) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  // Mapping status ke text Indonesia
  const statusTextMap = {
    pending: "Belum Bayar",
    paid: "Dibayar",
    delivered: "Dikirim",
    completed: "Selesai",
    cancelled: "Dibatalkan",
    failed: "Gagal",
  };

  const statusText =
    orderData.statusText || statusTextMap[orderData.status] || "Pending";
  const statusKey = (orderData.status || "").toLowerCase();
  const badge = getStatusBadge(orderData.status, orderData.createdAt); // ← FIX: Pass createdAt
  const headerColor = "#10B981";

  // Parse items dari orderData
  let items = [];
  if (Array.isArray(orderData.items)) {
    items = orderData.items.map((it) => ({
      id: it._id ?? "",
      name: it.product?.name ?? "",
      image: it.product?.images?.[0] ?? "",
      quantity: it.quantity ?? 0,
      price: it.product?.price ?? 0,
      isReviewed: it.isReviewed ?? false,
      review: it.review ?? null,
    }));
  }

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-xl overflow-y-auto shadow-xl">
        {/* HEADER */}
        <div
          className="px-5 py-4 text-white"
          style={{ background: headerColor }}
        >
          <p className="text-xs opacity-90">Order ID</p>
          <p className="text-xl font-bold">#{orderData.orderId}</p>
          <p className="text-xs opacity-90 mt-1">
            {orderData.createdAt
              ? new Date(orderData.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">
          {/* Status */}
          <p className="text-xs font-semibold text-gray-500 mb-1">Status</p>
          <p className="font-bold text-gray-900 mb-3 text-base">{statusText}</p>

          <div className="border-b mb-4"></div>

          {/* Badge info sesuai status */}
          {badge && (
            <div
              className={`${badge.bg} ${badge.border} ${badge.textColor} border rounded-lg p-3 mb-4 flex gap-2 text-sm items-start`}
            >
              <span className="text-lg shrink-0">{badge.icon}</span>
              <p className="leading-relaxed">{badge.text}</p>
            </div>
          )}

          {/* Produk list */}
          <div className="space-y-4 mb-4">
            {items.map((item, index) => (
              <div key={index}>
                {/* Item produk */}
                <div className="flex gap-3 items-start">
                  <img
                    src={
                      item.image
                        ? `${API_URL}/public/products/${item.image}`
                        : ""
                    }
                    alt={item.name}
                    className="w-14 h-14 rounded-md object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {item.quantity}x Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Review per item - HANYA tampil jika sudah direview */}
                {item.isReviewed && item.review && (
                  <div className="mt-3 p-3 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">⭐</span>
                      <p className="text-xs font-bold text-gray-700">
                        Ulasan Anda
                      </p>
                    </div>

                    {/* Rating bintang */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= (item.review.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        {item.review.rating}/5
                      </span>
                    </div>

                    {/* Teks ulasan */}
                    {item.review.comment && (
                      <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                        "{item.review.comment}"
                      </p>
                    )}

                    {/* Tanggal ulasan */}
                    {item.review.createdAt && (
                      <p className="text-xs text-gray-500">
                        📅{" "}
                        {new Date(item.review.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </div>
                )}

                {/* Border pemisah antar item */}
                {index !== items.length - 1 && (
                  <div className="border-b border-gray-200 my-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Ringkasan Harga */}
          <div className="space-y-2 text-sm pb-4 border-t pt-4">
            <div className="flex justify-between">
              <p className="text-gray-700">Produk</p>
              <p className="font-medium text-gray-900">
                Rp {subtotal.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-between pb-3 border-b">
              <p className="text-gray-700">Ongkir</p>
              <p className="font-medium text-gray-900">
                Rp {shippingCost.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-between pt-2">
              <p className="font-bold text-gray-900">Total</p>
              <p className="font-bold text-lg text-emerald-600">
                Rp {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Alamat Pengiriman */}
          <div className="pt-4 border-t">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Alamat Pengiriman
            </p>

            <p className="text-xs text-gray-500 mb-1">Penerima</p>

            <p className="font-bold text-sm text-gray-900">
              {orderData.buyer?.name || orderData.fullName || "-"} /{" "}
              {orderData.buyer?.phone || orderData.phone || "-"}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              {orderData.buyer?.address || orderData.address || "-"}
            </p>
          </div>
        </div>

        {/* FOOTER - Tombol sesuai status */}
        <div className="px-5 py-4 bg-white border-t flex gap-3">
          <Button
            variant="outline"
            className="flex-1 py-2.5 text-sm font-medium border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={onClose}
          >
            Tutup
          </Button>

          {/* Belum Bayar - Bayar Sekarang */}
          {(statusKey === "belum bayar" || statusKey === "pending") && (
            <Button
              variant="primary"
              className="flex-1 py-2.5 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => {
                onClose();
                window.location.href = `/payment/${orderData._id}`;
              }}
            >
              Bayar Sekarang
            </Button>
          )}

          {/* Dibayar / Dikirim - Hubungi Penjual */}
          {(statusKey === "dibayar" ||
            statusKey === "paid" ||
            statusKey === "dikirim" ||
            statusKey === "shipped") && (
            <Button
              variant="primary"
              className="flex-1 py-2.5 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => {
                window.open(
                  `https://wa.me/6285710441934?text=${encodeURIComponent(
                    `Halo, saya ingin bertanya tentang pesanan dengan ID ${orderData.orderId}`
                  )}`,
                  "_blank"
                );
              }}
            >
              Hubungi Penjual
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Utility badge function */
function getStatusBadge(status, createdAt) {
  // ← FIX: Tambah parameter createdAt
  const statusLower = (status || "").toLowerCase();

  switch (statusLower) {
    case "belum bayar":
    case "pending":
      if (createdAt) {
        const orderDate = new Date(createdAt);
        const deadline = new Date(orderDate.getTime() + 60 * 60 * 1000);

        const hours = deadline.getHours().toString().padStart(2, "0");
        const minutes = deadline.getMinutes().toString().padStart(2, "0");

        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          textColor: "text-orange-800",
          icon: "⏰",
          text: `Segera selesaikan pembayaran sebelum pukul ${hours}:${minutes} hari ini`,
        };
      }

      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        textColor: "text-orange-800",
        icon: "⏰",
        text: "Segera selesaikan pembayaran Anda",
      };

    case "dibayar":
    case "paid":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        textColor: "text-blue-800",
        icon: "ℹ️",
        text: "Pesanan sudah dibayar dan akan segera dikirim oleh penjual",
      };

    case "dikirim":
    case "delivered":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        textColor: "text-blue-800",
        icon: "📦",
        text: "Pesanan sedang dikirim dan segera tiba di tempat anda",
      };

    case "selesai":
    case "completed":
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        textColor: "text-emerald-800",
        icon: "✅",
        text: "Pesanan telah selesai. Terimakasih sudah berbelanja!",
      };

    default:
      return null;
  }
}
