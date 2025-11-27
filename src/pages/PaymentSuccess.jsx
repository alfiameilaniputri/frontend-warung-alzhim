import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); 
  const [detail, setDetail] = useState(null);

  // =============================
  // CEK STATUS MIDTRANS
  // =============================
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          `https://api-backend-kamu.com/payment/status/${transactionId}`
        );
        const data = await res.json();

        setStatus(data.transaction_status);
        setDetail(data);
      } catch (err) {
        setStatus("error");
      }
    }

    fetchStatus();
  }, [transactionId]);

  return (
    <main className="w-full py-8 px-4 lg:px-6 max-w-7xl mx-auto">

      {/* TOP BAR */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">Pembayaran Berhasil</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ===================== LEFT ===================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* SNAP SUCCESS IMAGE BOX */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Status Pembayaran</h2>

            {/* GAMBAR SNAP SUCCESS (ganti nanti dengan gambar kamu) */}
            <img
              src="/cek-status-midtrans.jpeg"  // ← nanti ganti gambar kamu
              alt="Snap Success"
              className="w-full rounded-xl border"
            />

            {/* STATUS TEXT */}
            <div className="mt-4">
              {status === "loading" && (
                <p className="text-gray-600">Memeriksa status pembayaran…</p>
              )}

              {status === "settlement" && (
                <p className="text-green-600 font-semibold text-lg">
                  Pembayaran Berhasil 🎉
                </p>
              )}

              {status === "pending" && (
                <p className="text-yellow-600 font-semibold text-lg">
                  Menunggu Pembayaran…
                </p>
              )}

              {status === "expire" && (
                <p className="text-red-600 font-semibold text-lg">
                  Pembayaran Kadaluarsa
                </p>
              )}

              {status === "cancel" && (
                <p className="text-red-600 font-semibold text-lg">
                  Pembayaran Dibatalkan
                </p>
              )}
            </div>
          </section>
        </div>

        {/* ===================== RIGHT (SUMMARY) ===================== */}
        <div className="lg:col-span-1">

          <section className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>

            {/* PRODUCT */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b">
              <img
                src="https://picsum.photos/id/101/300/300"
                className="w-16 h-16 object-cover rounded-lg"
                alt=""
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {detail?.item_details?.[0]?.name || "Produk"}
                </p>
                <p className="text-green-600 font-semibold text-sm">
                  Rp {detail?.gross_amount?.toLocaleString("id-ID") || "0"}
                </p>
              </div>
            </div>

            {/* SUBTOTAL */}
            <div className="text-sm text-gray-700 flex justify-between mb-1">
              <span>Subtotal</span>
              <span>
                Rp {detail?.gross_amount?.toLocaleString("id-ID") || "0"}
              </span>
            </div>

            {/* FREE ONGKIR */}
            <div className="text-sm text-gray-700 flex justify-between">
              <span>Pengiriman</span>
              <span>Rp 0</span>
            </div>

            <p className="text-xs text-gray-500 text-right mt-1 mb-4">
              (Gratis Ongkir)
            </p>

            <div className="border-t my-4"></div>

            <div className="flex justify-between text-base font-semibold mb-4">
              <span>Total</span>
              <span className="text-green-600">
                Rp {detail?.gross_amount?.toLocaleString("id-ID") || "0"}
              </span>
            </div>
{/* 
            <button
              onClick={() => navigate("/")}
              className="w-full lg:w-1/2 lg:h-2/3 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
            >
              Kembali ke Beranda
            </button> */}
          </section>

        </div>
      </div>
    </main>
  );
}
