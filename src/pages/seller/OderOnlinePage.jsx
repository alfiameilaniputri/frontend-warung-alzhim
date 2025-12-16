import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiMapPin, FiCheck } from "react-icons/fi";
import Button from "../../components/Button";
import useOrderStore from "../../stores/useOrderStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderOnlinePage() {
  const location = useLocation();
  const { onlineOrders, loading, error, fetchOnlineOrders } = useOrderStore();

  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [highlightedOrderId, setHighlightedOrderId] = useState(null);
  const [highlightFade, setHighlightFade] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const orderRef = useRef({});

  // Fetch orders on mount
  useEffect(() => {
    fetchOnlineOrders(); // fetch pertama

    const interval = setInterval(() => {
      fetchOnlineOrders();
    }, 5000); // 5 detik

    return () => clearInterval(interval);
  }, [fetchOnlineOrders]);

  // Handle highlight from navigation
  useEffect(() => {
    if (location.state?.selectedOrderId) {
      setHighlightedOrderId(location.state.selectedOrderId);
      setHighlightFade(false);

      setTimeout(() => {
        const element = orderRef.current[location.state.selectedOrderId];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      const timer = setTimeout(() => {
        setHighlightFade(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.selectedOrderId]);

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  // Format currency
  const formatCurrency = (num) => {
    return num.toLocaleString("id-ID");
  };

  // Get status counts
  const getStatusCounts = () => {
    const counts = {
      all: onlineOrders.length,
      paid: onlineOrders.filter((o) => o.status === "paid").length,
      delivered: onlineOrders.filter((o) => o.status === "delivered").length,
      completed: onlineOrders.filter((o) => o.status === "completed").length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  const statusFilters = [
    { label: "Semua", key: "all", count: statusCounts.all },
    { label: "Dibayar", key: "paid", count: statusCounts.paid },
    { label: "Dikirim", key: "delivered", count: statusCounts.delivered },
    { label: "Selesai", key: "completed", count: statusCounts.completed },
  ];

  // Filter orders by status
  const getFilteredOrders = () => {
    if (selectedStatus === "Semua") return onlineOrders;
    if (selectedStatus === "Dibayar")
      return onlineOrders.filter((o) => o.status === "paid");
    if (selectedStatus === "Dikirim")
      return onlineOrders.filter((o) => o.status === "delivered");
    if (selectedStatus === "Selesai")
      return onlineOrders.filter((o) => o.status === "completed");
    return onlineOrders;
  };

  const filteredOrders = getFilteredOrders();

  // Handle send order (update status to delivered)
  const handleSendOrder = async (orderId) => {
    if (!confirm("Yakin ingin mengirim pesanan ini?")) return;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_URL}/api/order/status/${orderId}`,
        { status: "delivered" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success || res.data?.data) {
        alert("Pesanan berhasil dikirim!");
        fetchOnlineOrders(); // Refresh list
      } else {
        alert("Gagal mengirim pesanan");
      }
    } catch (err) {
      console.error("Error sending order:", err);
      alert(err.response?.data?.message || "Gagal mengirim pesanan");
    } finally {
      setIsUpdating(false);
    }
  };

  // Get payment method label
  const getPaymentLabel = (method) => {
    const labels = {
      midtrans: "Midtrans",
      cash: "Cash",
      transfer: "Transfer",
      qris: "QRIS",
    };
    return labels[method] || method;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === "completed") {
      return (
        <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-green-100 text-green-700 rounded text-xs md:text-xs lg:text-xs font-medium flex items-center gap-1">
          <FiCheck size={13} />
          <span>Selesai</span>
        </span>
      );
    }
    if (status === "paid") {
      return (
        <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-blue-100 text-blue-700 rounded text-xs md:text-xs lg:text-xs font-medium flex items-center gap-1">
          <FiCheck size={13} />
          <span>Dibayar</span>
        </span>
      );
    }
    if (status === "delivered") {
      return (
        <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-orange-100 text-orange-700 rounded text-xs md:text-xs lg:text-xs font-medium">
          Dikirim
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-gray-100 text-gray-700 rounded text-xs md:text-xs lg:text-xs font-medium">
          Pending
        </span>
      );
    }
    return null;
  };

  if (loading && onlineOrders.length === 0) {
    return (
      <div className="flex bg-neutral-100 min-h-screen p-2 pt-14 md:pt-4 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-neutral-100 min-h-screen p-2 pt-14 md:pt-4">
      <main className="flex-1 p-4 md:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 md:mb-5 lg:mb-6">
          <h1 className="text-xl md:text-lg lg:text-2xl font-bold text-neutral-900 mb-1">
            Pesanan Online
          </h1>
          <p className="text-xs md:text-xs lg:text-sm text-neutral-600">
            Kelola semua pesanan online dari pelanggan
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Status Filter */}
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-2 lg:gap-2 mb-5 md:mb-5 lg:mb-6">
          {statusFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedStatus(filter.label)}
              className={`px-2.5 md:px-2.5 lg:px-3 py-1.5 rounded-lg font-medium transition-all text-xs md:text-xs lg:text-xs flex-1 md:flex-none ${
                selectedStatus === filter.label
                  ? "bg-green-600 text-white"
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-neutral-500">
              Tidak ada pesanan {selectedStatus.toLowerCase()}
            </p>
          </div>
        ) : (
          /* Pesanan Cards */
          <div className="space-y-2.5 md:space-y-2.5 lg:space-y-3">
            {filteredOrders.map((order) => (
              <div
                ref={(el) => (orderRef.current[order._id] = el)}
                key={order._id}
                className={`bg-white border rounded-lg md:rounded-lg lg:rounded-xl p-3.5 md:p-3.5 lg:p-4 transition-all duration-300 ${
                  highlightedOrderId === order._id && !highlightFade
                    ? "border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200"
                    : "border-neutral-300"
                }`}
              >
                {/* Header Card */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2.5 md:gap-2.5 lg:gap-3 mb-2.5 md:mb-2.5 lg:mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="font-bold text-neutral-900 mb-1 text-xs md:text-xs lg:text-sm wrap-break-words">
                        Pesanan #{order._id.slice(0, 8)} –{" "}
                        {order.buyer?.name || "Customer"}
                      </h3>
                      {highlightedOrderId === order._id && !highlightFade && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-semibold shrink-0 animate-pulse">
                          Dipilih
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs md:text-xs lg:text-xs text-neutral-600 mb-1.5">
                      <span>
                        {order.items?.length || 0} item •{" "}
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    {order.buyer?.address && (
                      <div className="flex items-start gap-1.5 text-xs md:text-xs lg:text-xs text-neutral-600 mb-2.5">
                        <FiMapPin
                          size={13}
                          className="text-red-500 shrink-0 mt-0.5"
                        />
                        <span className="wrap-break-words">
                          {order.buyer.address}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Button hanya muncul kalau status paid */}
                  {order.status === "paid" && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full md:w-auto text-xs md:text-xs lg:text-xs py-1.5"
                      onClick={() => handleSendOrder(order._id)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Mengirim..." : "Kirim Pesanan"}
                    </Button>
                  )}
                </div>

                {/* Payment & Status */}
                <div className="flex gap-2 mb-3 md:mb-2.5 lg:mb-3 flex-wrap">
                  {order.paymentMethod && (
                    <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-green-100 text-green-700 rounded text-xs md:text-xs lg:text-xs font-medium">
                      {getPaymentLabel(order.paymentMethod)}
                    </span>
                  )}
                  {getStatusBadge(order.status)}
                </div>

                {/* Detail Pesanan */}
                <div className="border-t border-neutral-200 pt-2.5 md:pt-2.5 lg:pt-3">
                  <p className="text-xs md:text-xs lg:text-xs font-semibold text-neutral-700 mb-2">
                    Detail Pesanan:
                  </p>
                  <div className="space-y-1 md:space-y-1 lg:space-y-1.5 mb-2.5">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs md:text-xs lg:text-xs gap-2"
                      >
                        <span className="text-neutral-700 wrap-break-words">
                          {item.product?.name || "Produk"} x{item.quantity}
                        </span>
                        <span className="text-neutral-900 font-medium whitespace-nowrap">
                          Rp {formatCurrency(item.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-xs md:text-xs lg:text-xs font-bold border-t border-neutral-200 pt-2">
                    <span className="text-neutral-900">Total</span>
                    <span className="text-neutral-900">
                      Rp {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
