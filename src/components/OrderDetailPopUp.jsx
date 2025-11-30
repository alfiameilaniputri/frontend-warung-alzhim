import React from "react";
import Button from "./Button";

export default function OrderDetailPopup({ isOpen, onClose, orderData }) {
  if (!isOpen || !orderData) return null;

  const badge = getStatusBadge(orderData.statusText);
  const headerColor = "#2ECC71";

  let items = Array.isArray(orderData.items) ? orderData.items : [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  // Cek apakah sudah diberi ulasan
  const sudahUlas = orderData.reviewGiven === true;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-xl overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="px-5 py-4 text-white" style={{ background: headerColor }}>
          <p className="text-xs opacity-80">Order ID</p>
          <p className="text-xl font-bold">#{orderData.id}</p>
          <p className="text-xs opacity-80 mt-1">{orderData.orderDate}</p>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">

          {/* Status */}
          <p className="text-[13px] font-semibold text-gray-500 mb-1">Status</p>
          <p className="font-semibold text-gray-900 mb-3">{orderData.statusText}</p>

          <div className="border-b mb-4"></div>

          {/* Badge */}
          <div
            className={`${badge.bg} ${badge.border} ${badge.textColor} border rounded-lg p-3 mb-4 flex gap-2 text-sm`}
          >
            <span className="text-lg">{badge.icon}</span>
            <p>{badge.text}</p>
          </div>

          {/* Produk list */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-md object-cover border"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity}x Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ulasan (jika sudah diberi ulasan) */}
          {sudahUlas && orderData.review && (
            <div className="mt-5 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
                Ulasan Anda
              </p>
              
              {/* Rating bintang */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= (orderData.review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {orderData.review.rating}/5
                </span>
              </div>

              {/* Teks ulasan */}
              {orderData.review.reviewText && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {orderData.review.reviewText}
                  </p>
                </div>
              )}

              {/* Tanggal ulasan */}
              {orderData.review.reviewDate && (
                <p className="text-xs text-gray-500 mt-2">
                  Diulas pada {orderData.review.reviewDate}
                </p>
              )}
            </div>
          )}

          {/* Harga */}
          <div className="mt-5 space-y-2 text-[13px]">
            <div className="flex justify-between">
              <p className="text-gray-700">Produk</p>
              <p className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between pb-3 border-b">
              <p className="text-gray-700">Ongkir</p>
              <p className="font-medium">Rp {shippingCost.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between pt-2 pb-3 border-b">
              <p className="font-semibold text-gray-900">Total</p>
              <p className="font-bold text-lg text-emerald-600">
                Rp {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Alamat */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 tracking-wide mb-1">
              Alamat Pengiriman
            </p>

            <p className="text-[11px] text-gray-500 mb-1">Penerima</p>

            <p className="font-semibold text-sm text-gray-900">
              {orderData.fullName} / {orderData.phone}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              {orderData.address}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-2 py-4 bg-gray-50 flex gap-3">
          <Button variant="outline" className="flex-1 py-2 text-sm" onClick={onClose}>
            Tutup
          </Button>

          {orderData.statusText === "Belum Bayar" && (
            <Button variant="primary" className="flex-1 py-2 text-sm">
              Bayar Sekarang
            </Button>
          )}

          {(orderData.statusText === "Dibayar" || orderData.statusText === "Dikirim") && (
            <Button variant="primary" className="flex-1 py-2 text-sm">
              Hubungi Penjual
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Utility badge function */
function getStatusBadge(status) {
  switch ((status || "").toLowerCase()) {
    case "belum bayar":
      return {
        bg: "bg-[#FFF3CD]",
        border: "border-[#FFECB5]",
        textColor: "text-[#856404]",
        icon: "⏰",
        text: "Bayar pesanan sebelum pukul 17.00 hari ini",
      };

    case "dibayar":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        textColor: "text-blue-700",
        icon: "ℹ️",
        text: "Pesanan sudah dibayar dan akan segera dikirim oleh penjual",
      };

    case "dikirim":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        textColor: "text-blue-700",
        icon: "📦",
        text: "Paket sedang dalam perjalanan menuju alamat anda",
      };

    case "selesai":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        textColor: "text-green-700",
        icon: "✅",
        text: "Pesanan telah selesai. Terimakasih sudah berbelanja!",
      };

    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        textColor: "text-gray-700",
        icon: "ℹ️",
        text: "Status pesanan",
      };
  }
}