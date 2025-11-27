import React from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function PaymentPage() {
  return (
    <main className="w-full py-8 px-4 lg:px-6 max-w-7xl mx-auto">

      {/* TOP BAR */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <FiChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">Pembayaran</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-2 flex justify-center">
          <section className="bg-white rounded-2xl p-6 shadow-sm flex justify-center w-full">

            {/* CARD SNAP (MENGGUNAKAN GAMBAR SEMENTARA) */}
            <div className="w-full max-w-[390px] rounded-xl overflow-hidden shadow-md border border-gray-200">
              <img
                src="/snap-midtrans-contoh.jpeg"
                alt="Snap Midtrans Mock"
                className="w-full h-auto object-cover"
              />
            </div>

          </section>
        </div>

        {/* ================= RIGHT COLUMN (STICKY) ================= */}
        <div className="lg:col-span-1">
          <section className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">

            <h3 className="text-lg font-semibold mb-1">Ringkasan Pesanan</h3>
            <p className="text-xs text-gray-500 mb-4">ID Transaksi: 123456</p>

            {/* Product */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b">
              <img
                src="https://picsum.photos/id/101/300/300"
                className="w-16 h-16 object-cover rounded-lg"
                alt=""
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">Indomie Goreng x10</p>
                <p className="text-green-600 font-semibold text-sm">Rp 40.000</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rp 40.000</span>
            </div>

            <div className="text-sm text-gray-700 flex justify-between">
              <span>Pengiriman</span>
              <span>Rp 0</span>
            </div>

            <p className="text-xs text-gray-500 text-right mt-1 mb-4">(Gratis Ongkir)</p>

            <div className="border-t my-4"></div>

            <div className="flex justify-between text-base font-semibold mb-2">
              <span>Total</span>
              <span className="text-green-600">Rp. 40.000</span>
            </div>

          </section>
        </div>

      </div>
    </main>
  );
}
