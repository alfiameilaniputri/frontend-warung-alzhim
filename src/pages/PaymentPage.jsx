import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/order/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setOrder(data.data);
        } else {
          alert("Gagal mengambil data order");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        alert("Terjadi kesalahan saat memuat order");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Listen untuk message dari iframe Midtrans
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin.includes("midtrans") || event.origin.includes("sandbox.midtrans")) {
        const data = event.data;
        
        if (data.status_code === "200" || data.transaction_status === "settlement") {
          navigate(`/payment/${orderId}/success`);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="w-full py-8 px-4 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full py-8 px-4 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Order tidak ditemukan</p>
      </div>
    );
  }

  if (order.status !== "pending") {
    return (
      <div className="w-full py-8 px-4 flex flex-col justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg mb-4">
          Order ini sudah {order.status === "paid" ? "dibayar" : order.status}
        </p>
        <button
          onClick={() => navigate("/my-order")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Lihat Pesanan Saya
        </button>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <div className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-semibold">Pembayaran</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Midtrans iframe */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-2xl shadow-sm overflow-hidden p-2 lg:p-6">
              {/* Mobile: Full width tanpa batasan, Desktop: max 390px centered */}
              <div className="w-full">
                {order.redirectUrl ? (
                  <iframe
                    src={order.redirectUrl}
                    title="Midtrans Payment"
                    className="w-full border-none mx-auto lg:max-w-[390px]"
                    style={{ 
                      height: 'calc(100vh - 180px)',
                      minHeight: '600px'
                    }}
                    allow="payment *"
                  />
                ) : (
                  <div className="w-full h-[600px] flex items-center justify-center">
                    <p className="text-gray-500">Payment gateway tidak tersedia</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold mb-1">Ringkasan Pesanan</h3>
              <p className="text-xs text-gray-500 mb-4">
                ID Transaksi: {order._id}
              </p>

              {/* Products List */}
              <div className="max-h-64 overflow-y-auto mb-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start gap-3 mb-4 pb-4 border-b last:border-b-0"
                    >
                      <img
                        src={
                          item.product?.images?.length > 0
                            ? `${API_URL}/public/products/${item.product.images[0]}`
                            : "https://via.placeholder.com/200"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {item.product?.name || "Produk"} x{item.quantity}
                        </p>
                        <p className="text-green-600 font-semibold text-sm">
                          Rp {item.subtotal?.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Tidak ada produk</p>
                )}
              </div>

              <div className="border-t my-4"></div>

              <div className="text-sm text-gray-700 flex justify-between mb-1">
                <span>Subtotal</span>
                <span>Rp {order.totalPrice?.toLocaleString("id-ID")}</span>
              </div>

              <div className="text-sm text-gray-700 flex justify-between">
                <span>Pengiriman</span>
                <span>Rp 0</span>
              </div>

              <p className="text-xs text-gray-500 text-right mt-1 mb-4">
                (Gratis Ongkir)
              </p>

              <div className="border-t my-4"></div>

              <div className="flex justify-between text-base font-semibold mb-2">
                <span>Total</span>
                <span className="text-green-600">
                  Rp {order.totalPrice?.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Info Payment Status */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  ℹ️ Setelah pembayaran berhasil, Anda akan diarahkan ke halaman konfirmasi
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}