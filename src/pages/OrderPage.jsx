// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FiMapPin, FiChevronLeft, FiXCircle } from "react-icons/fi";
// import { MdPayments } from "react-icons/md";
// import useAuthStore from "../stores/useAuthStore";
// import useCartStore from "../stores/useCartStore";
// import useOrderStore from "../stores/useOrderStore";

// export default function OrderPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const selectedCartItems = location.state?.selectedItems || [];
//   const { user, fetchProfile } = useAuthStore();
//   const { cartItems, fetchCart, removeCartItem } = useCartStore();
//   const { createOrder, loading: orderLoading } = useOrderStore();

//   const [isProcessing, setIsProcessing] = useState(false);

//   const API_URL = import.meta.env.VITE_API_URL;

//   // Load user profile & cart saat page mount
//   useEffect(() => {
//     fetchProfile();
//     fetchCart();
//   }, []);

//   // Hitung subtotal & total
//   const subtotal =
//     cartItems?.reduce(
//       (sum, item) => sum + (item.productId?.price || 0) * (item.qty || 0),
//       0
//     ) || 0;
//   const shippingCost = 0; // Gratis ongkir
//   const total = subtotal + shippingCost;

//   const handlePayNow = async () => {
//     if (!selectedCartItems || selectedCartItems.length === 0) {
//       alert("Tidak ada produk yang dipilih!");
//       return;
//     }

//     setIsProcessing(true);

//     // Mapping selectedCartItems ke format backend
//     const orderItems = selectedCartItems.map((item) => ({
//       productId: item.productId?._id,
//       quantity: item.qty || 1,
//     }));

//     try {
//       const order = await createOrder(orderItems);

//       if (order && order?.orderId) {
//         alert("Pesanan berhasil dibuat!");
//         console.log("Order created:", order?.orderId);

//         // Hapus hanya item yang dipilih
//         for (const item of selectedCartItems) {
//           await removeCartItem(item._id);
//         }

//         // console.log("payment", order?.orderId)

//         navigate(`/payment/${order?.orderId}`);
//       } else {
//         alert("Gagal membuat pesanan");
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("Terjadi kesalahan saat membuat pesanan");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="w-full py-8 px-4 flex justify-center items-center">
//         <p className="text-gray-600">Memuat data...</p>
//       </div>
//     );
//   }

//   return (
//     <main className="w-full py-8 px-4 lg:px-6 max-w-7xl mx-auto">
//       {/* TOP BAR / TITLE */}
//       <div className="flex items-center gap-3 mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-lg hover:bg-gray-100 transition"
//         >
//           <FiChevronLeft className="text-xl" />
//         </button>
//         <h1 className="text-xl font-semibold">Pemesanan</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-2 flex flex-col gap-6">
//           {/* Alamat Pengiriman */}
//           <section className="bg-white rounded-2xl p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-4">
//               <FiMapPin className="text-red-500 text-xl" />
//               <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
//             </div>

//             <div className="mb-4">
//               <label className="text-sm font-medium text-gray-800">
//                 Nama Penerima
//               </label>
//               <input
//                 type="text"
//                 value={user.name || ""}
//                 readOnly
//                 className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="text-sm font-medium text-gray-800">
//                 No. Telepon
//               </label>
//               <input
//                 type="text"
//                 value={user.phone_number || ""}
//                 readOnly
//                 className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
//               />
//             </div>

//             <div className="mb-2">
//               <label className="text-sm font-medium text-gray-800">
//                 Alamat Lengkap
//               </label>
//               <input
//                 type="text"
//                 value={user.address || ""}
//                 readOnly
//                 className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
//               />
//             </div>

//             <p className="text-sm text-green-600 mt-1">
//               Akses halaman edit profil untuk pengubahan data pengiriman
//             </p>
//           </section>

//           {/* Metode Pembayaran */}
//           <section className="bg-white rounded-2xl p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-1">
//               <MdPayments className="text-green-600 text-xl" />
//               <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
//             </div>

//             <p className="text-sm text-gray-600 mb-4">
//               Transfer Bank, GoPay, OVO, Dana, QRIS, dan pembayaran digital
//               lainnya
//             </p>

//             <div className="bg-red-50 border border-red-300 p-4 rounded-xl flex gap-3 items-start">
//               <FiXCircle className="text-red-600 text-xl mt-0.5" />
//               <div className="flex flex-col text-sm">
//                 <span className="font-semibold text-red-700">
//                   COD tidak tersedia
//                 </span>
//                 <span className="text-red-600">
//                   Demi harga terbaik dan menghindari pesanan fiktif
//                 </span>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="lg:col-span-1">
//           <section className="bg-white rounded-2xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>

//             {/* Products List */}
//             <div className="max-h-64 overflow-y-auto mb-4">
//               {selectedCartItems && selectedCartItems.length > 0 ? (
//                 selectedCartItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex items-start gap-3 mb-4 pb-4 border-b last:border-b-0"
//                   >
//                     <img
//                       src={
//                         item.productId?.images?.length > 0
//                           ? `${API_URL}/public/products/${item.productId.images[0]}`
//                           : "https://via.placeholder.com/200"
//                       }
//                       className="w-16 h-16 object-cover rounded-lg"
//                       alt={item.productId?.name || "Product"}
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-sm">
//                         {item.productId?.name || "Produk"} x{item.qty}
//                       </p>
//                       <p className="text-green-600 font-semibold text-sm">
//                         Rp{" "}
//                         {(
//                           (item.productId?.price || 0) * item.qty
//                         ).toLocaleString("id-ID")}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm text-center py-4">
//                   Keranjang kosong
//                 </p>
//               )}
//             </div>

//             {/* Subtotal */}
//             <div className="text-sm text-gray-700 flex justify-between mb-1">
//               <span>Subtotal</span>
//               <span>Rp {subtotal.toLocaleString("id-ID")}</span>
//             </div>

//             {/* Pengiriman */}
//             <div className="text-sm text-gray-700 flex justify-between">
//               <span>Pengiriman</span>
//               <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
//             </div>

//             <p className="text-xs text-gray-500 text-right mt-1 mb-4">
//               (Gratis Ongkir)
//             </p>

//             {/* LINE */}
//             <div className="border-t my-4"></div>

//             {/* Total */}
//             <div className="flex justify-between text-base font-semibold mb-4">
//               <span>Total</span>
//               <span className="text-green-600">
//                 Rp {total.toLocaleString("id-ID")}
//               </span>
//             </div>

//             {/* Button */}
//             <button
//               onClick={handlePayNow}
//               disabled={
//                 isProcessing ||
//                 orderLoading ||
//                 !cartItems ||
//                 cartItems.length === 0
//               }
//               className={`w-full py-3 rounded-xl font-medium transition ${
//                 isProcessing ||
//                 orderLoading ||
//                 !cartItems ||
//                 cartItems.length === 0
//                   ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                   : "bg-green-600 text-white hover:bg-green-700"
//               }`}
//             >
//               {isProcessing || orderLoading ? "Memproses..." : "Bayar Sekarang"}
//             </button>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMapPin, FiChevronLeft, FiXCircle } from "react-icons/fi";
import { MdPayments } from "react-icons/md";
import useAuthStore from "../stores/useAuthStore";
import useCartStore from "../stores/useCartStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { user, fetchProfile } = useAuthStore();
  const { removeCartItem } = useCartStore();
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch order data by orderId
  useEffect(() => {
    fetchProfile();
    fetchOrderData();
  }, [orderId]);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (result.success) {
        setOrderData(result.data);
      } else {
        alert("Gagal memuat data pesanan");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      alert("Terjadi kesalahan saat memuat data");
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!orderData) {
      alert("Data pesanan tidak tersedia");
      return;
    }

    try {
      // Hapus item dari cart setelah proceed ke payment
      if (orderData.items && orderData.items.length > 0) {
        for (const item of orderData.items) {
          // Asumsi item punya cartItemId atau sejenisnya
          // Jika tidak ada, skip delete cart (karena cart sudah tidak relevan)
        }
      }

      // Navigate ke payment page
      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.error("Error proceeding to payment:", error);
      alert("Terjadi kesalahan");
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8 px-4 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Memuat data pesanan...</p>
      </div>
    );
  }

  if (!user || !orderData) {
    return (
      <div className="w-full py-8 px-4 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Data tidak ditemukan</p>
      </div>
    );
  }

  const subtotal = orderData.totalPrice || 0;
  const shippingCost = 0;
  const total = subtotal + shippingCost;

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
        <h1 className="text-xl font-semibold">Pemesanan</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Alamat Pengiriman */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-red-500 text-xl" />
              <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-800">
                Nama Penerima
              </label>
              <input
                type="text"
                value={user.name || ""}
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-800">
                No. Telepon
              </label>
              <input
                type="text"
                value={user.phone_number || ""}
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            <div className="mb-2">
              <label className="text-sm font-medium text-gray-800">
                Alamat Lengkap
              </label>
              <input
                type="text"
                value={user.address || ""}
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
              />
            </div>

            <p className="text-sm text-green-600 mt-1">
              Akses halaman edit profil untuk pengubahan data pengiriman
            </p>
          </section>

          {/* Metode Pembayaran */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MdPayments className="text-green-600 text-xl" />
              <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Transfer Bank, GoPay, OVO, Dana, QRIS, dan pembayaran digital
              lainnya
            </p>

            <div className="bg-red-50 border border-red-300 p-4 rounded-xl flex gap-3 items-start">
              <FiXCircle className="text-red-600 text-xl mt-0.5" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-red-700">
                  COD tidak tersedia
                </span>
                <span className="text-red-600">
                  Demi harga terbaik dan menghindari pesanan fiktif
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1">
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>

            {/* Products List */}
            <div className="max-h-64 overflow-y-auto mb-4">
              {orderData.items && orderData.items.length > 0 ? (
                orderData.items.map((item) => (
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
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.product?.name || "Product"}
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
                <p className="text-gray-500 text-sm text-center py-4">
                  Tidak ada produk
                </p>
              )}
            </div>

            {/* Subtotal */}
            <div className="text-sm text-gray-700 flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            {/* Pengiriman */}
            <div className="text-sm text-gray-700 flex justify-between">
              <span>Pengiriman</span>
              <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
            </div>

            <p className="text-xs text-gray-500 text-right mt-1 mb-4">
              (Gratis Ongkir)
            </p>

            {/* LINE */}
            <div className="border-t my-4"></div>

            {/* Total */}
            <div className="flex justify-between text-base font-semibold mb-4">
              <span>Total</span>
              <span className="text-green-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Button */}
            <button
              onClick={handlePayNow}
              disabled={orderData.status !== "pending"}
              className={`w-full py-3 rounded-xl font-medium transition ${
                orderData.status !== "pending"
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {orderData.status !== "pending" ? "Order Sudah Diproses" : "Bayar Sekarang"}
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}