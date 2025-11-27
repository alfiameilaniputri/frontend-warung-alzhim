import React from "react";
import { FiMapPin, FiChevronLeft, FiXCircle } from "react-icons/fi";
import { MdPayments } from "react-icons/md";

export default function OrderPage() {
  return (
    <main className="w-full py-8 px-4 lg:px-6 max-w-7xl mx-auto">

      {/* TOP BAR / TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <FiChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">Pemesanan</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ===================== LEFT COLUMN ===================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* ---------------- Alamat Pengiriman ---------------- */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-red-500 text-xl" />
              <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
            </div>

            {/* Nama */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-800">Nama Penerima</label>
              <input
                type="text"
                value="Angel Veronica"
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            {/* Telepon */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-800">No. Telepon</label>
              <input
                type="text"
                value="085211234457"
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            {/* Alamat */}
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-800">Alamat Lengkap</label>
              <input
                type="text"
                value="Perumahan Bintang Alam Blok C2 No. 18"
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            <p className="text-sm text-green-600 mt-1">
              Akses halaman edit profil untuk pengubahan data pengiriman
            </p>
          </section>

          {/* ---------------- Metode Pembayaran ---------------- */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MdPayments className="text-green-600 text-xl" />
              <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Transfer Bank, GoPay, OVO, Dana, QRIS, dan pembayaran digital lainnya
            </p>

            {/* Box Merah COD */}
            <div className="bg-red-50 border border-red-300 p-4 rounded-xl flex gap-3 items-start">
              <FiXCircle className="text-red-600 text-xl mt-0.5" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-red-700">COD tidak tersedia</span>
                <span className="text-red-600">
                  Demi harga terbaik dan menghindari pesanan fiktif
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ===================== RIGHT COLUMN ===================== */}
        <div className="lg:col-span-1">

          <section className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>

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

            {/* Subtotal */}
            <div className="text-sm text-gray-700 flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rp 40.000</span>
            </div>

            {/* Pengiriman */}
            <div className="text-sm text-gray-700 flex justify-between">
              <span>Pengiriman</span>
              <span>Rp 0</span>
            </div>

            <p className="text-xs text-gray-500 text-right mt-1 mb-4">(Gratis Ongkir)</p>

            {/* LINE — (yang kamu bilang hilang) */}
            <div className="border-t my-4"></div>

            {/* Total */}
            <div className="flex justify-between text-base font-semibold mb-4">
              <span>Total</span>
              <span className="text-green-600">Rp. 40.000</span>
            </div>

            {/* Button */}
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition">
              Bayar Sekarang
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}
