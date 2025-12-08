import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import OfflineOrderDetailModal from "../../components/OfflineOrderDetailModal";
import jsPDF from "jspdf";
import useOrderStore from "../../stores/useOrderStore";

function Button({ variant, className, children, ...props }) {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantClass =
    variant === "primary"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white">
        <Icon size={32} />
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-neutral-900">{value}</p>
        <p className="text-neutral-600 text-sm">{label}</p>
      </div>
    </div>
  );
}

export default function SalesReportPage() {
  const navigate = useNavigate();
  const {
    onlineOrders,
    offlineOrders,
    loading,
    error,
    fetchOnlineOrders,
    fetchOfflineOrders,
  } = useOrderStore();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOfflineOrder, setSelectedOfflineOrder] = useState(null);
  const [showAllOnlineOrders, setShowAllOnlineOrders] = useState(false);
  const [showAllOfflineOrders, setShowAllOfflineOrders] = useState(false);

  // Cek admin di awal
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Decode token & cek role
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        alert("Akses ditolak! Halaman ini khusus admin.");
        navigate("/");
      }
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  // useEffect fetch data yang sudah ada
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await Promise.all([fetchOnlineOrders(), fetchOfflineOrders()]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [fetchOnlineOrders, fetchOfflineOrders]);

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
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const formatCurrency = (num) => {
    const value = typeof num === "number" ? num : 0;
    return "Rp " + value.toLocaleString("id-ID");
  };

  const getTimeFromDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterOrders = (orders, orderType = "all") => {
    return orders.filter((order) => {
      // Filter STATUS: Exclude pending & cancelled untuk ONLINE orders
      if (orderType === "online") {
        if (order.status === "pending" || order.status === "cancelled") {
          return false;
        }
      }

      const orderDate = new Date(order.createdAt || order.date);
      const orderDateOnly = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      );

      let afterStart = true;
      let beforeEnd = true;

      if (startDate) {
        const start = new Date(startDate);
        const startDateOnly = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate()
        );
        afterStart = orderDateOnly >= startDateOnly;
      }

      if (endDate) {
        const end = new Date(endDate);
        const endDateOnly = new Date(
          end.getFullYear(),
          end.getMonth(),
          end.getDate()
        );
        beforeEnd = orderDateOnly <= endDateOnly;
      }

      const matchesSearch = searchQuery
        ? Object.values(order).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;

      return afterStart && beforeEnd && matchesSearch;
    });
  };

  const filteredOnlineOrders = filterOrders(onlineOrders, "online");
  const filteredOfflineOrders = filterOrders(offlineOrders, "offline");

  const displayOnlineOrders = showAllOnlineOrders
    ? filteredOnlineOrders
    : filteredOnlineOrders.slice(0, 5);
  const displayOfflineOrders = showAllOfflineOrders
    ? filteredOfflineOrders
    : filteredOfflineOrders.slice(0, 5);

  // Debug logging
  useEffect(() => {
    console.log("Online Orders:", onlineOrders);
    console.log("Offline Orders:", offlineOrders);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [onlineOrders, offlineOrders, loading, error]);

  const calculateTotal = (orders) => {
    return orders.reduce((sum, order) => {
      let total = 0;
      if (typeof order.totalPrice === "number") {
        total = order.totalPrice;
      } else if (typeof order.totalPrice === "string") {
        total = parseInt(order.totalPrice.replace(/\D/g, "")) || 0;
      }
      return sum + total;
    }, 0);
  };

  const getTodayData = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    // Filter online orders: exclude pending & cancelled
    const todayOnline = onlineOrders.filter((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      const isToday = orderDate === todayStr;
      const isValidStatus =
        order.status !== "pending" && order.status !== "cancelled";
      return isToday && isValidStatus;
    });

    const todayOffline = offlineOrders.filter((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      return orderDate === todayStr;
    });

    const todayRevenue =
      calculateTotal(todayOnline) + calculateTotal(todayOffline);

    return {
      onlineCount: todayOnline.length,
      offlineCount: todayOffline.length,
      revenue: todayRevenue,
    };
  };

  const todayData = getTodayData();

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPosition = 15;

      // Title
      doc.setFontSize(16);
      doc.text("Laporan Penjualan", pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 10;

      // Date
      doc.setFontSize(10);
      const today = new Date();
      const dateStr = today.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.text(`Tanggal: ${dateStr}`, pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 15;

      // Summary
      doc.setFontSize(11);
      doc.text("Ringkasan Hari Ini", 10, yPosition);
      yPosition += 8;
      doc.setFontSize(10);
      doc.text(`Pesanan Online: ${todayData.onlineCount}`, 15, yPosition);
      yPosition += 6;
      doc.text(`Transaksi Offline: ${todayData.offlineCount}`, 15, yPosition);
      yPosition += 6;
      doc.text(
        `Pendapatan: ${formatCurrency(todayData.revenue)}`,
        15,
        yPosition
      );
      yPosition += 15;

      // Online Orders
      doc.setFontSize(11);
      doc.text("Pesanan Online", 10, yPosition);
      yPosition += 8;

      doc.setFontSize(9);
      doc.setFillColor(34, 197, 94);
      doc.setTextColor(255, 255, 255);
      const onlineHeaders = ["ID", "Produk", "Qty", "Total", "Status"];
      const colWidths = [30, 60, 20, 35, 35];
      let xPos = 10;

      onlineHeaders.forEach((header, idx) => {
        doc.rect(xPos, yPosition - 5, colWidths[idx], 7, "F");
        doc.text(header, xPos + 2, yPosition, { maxWidth: colWidths[idx] - 2 });
        xPos += colWidths[idx];
      });

      yPosition += 10;
      doc.setTextColor(0, 0, 0);

      displayOnlineOrders.forEach((order) => {
        xPos = 10;
        const itemCount = order.items?.length || 0;
        const rowData = [
          order.orderId || order._id, // ID pesanan penuh
          order.items?.[0]?.product?.name || "N/A",
          itemCount.toString(),
          formatCurrency(order.totalPrice),
          order.status,
        ];

        rowData.forEach((data, idx) => {
          doc.text(String(data), xPos + 2, yPosition, {
            maxWidth: colWidths[idx] - 4,
            fontSize: 8,
          });
          xPos += colWidths[idx];
        });

        yPosition += 7;
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 15;
        }
      });

      yPosition += 10;

      // Offline Orders
      doc.setFontSize(11);
      doc.text("Transaksi Offline", 10, yPosition);
      yPosition += 8;

      doc.setFontSize(9);
      doc.setFillColor(34, 197, 94);
      doc.setTextColor(255, 255, 255);
      const offlineHeaders = ["ID", "Produk", "Jumlah", "Total"];
      const offlineColWidths = [30, 80, 25, 45];
      xPos = 10;

      offlineHeaders.forEach((header, idx) => {
        doc.rect(xPos, yPosition - 5, offlineColWidths[idx], 7, "F");
        doc.text(header, xPos + 2, yPosition, {
          maxWidth: offlineColWidths[idx] - 2,
        });
        xPos += offlineColWidths[idx];
      });

      yPosition += 10;
      doc.setTextColor(0, 0, 0);

      displayOfflineOrders.forEach((order) => {
        const totalItems =
          order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) ||
          0;
        xPos = 10;
        const rowData = [
          order.orderId || order._id, // ID pesanan penuh
          order.items?.[0]?.product?.name || "N/A",
          totalItems.toString(),
          formatCurrency(order.totalPrice),
        ];

        rowData.forEach((data, idx) => {
          doc.text(String(data), xPos + 2, yPosition, {
            maxWidth: offlineColWidths[idx] - 4,
            fontSize: 8,
          });
          xPos += offlineColWidths[idx];
        });

        yPosition += 7;
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 15;
        }
      });

      const filename = `Laporan_Penjualan_${
        today.toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF. Silakan coba lagi.");
    }
  };

  const handleViewOnlineOrderDetail = (orderId) => {
    navigate(`/seller/order-online`, { state: { selectedOrderId: orderId } });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-300",
        label: "Pending",
      },
      paid: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300",
        label: "Dibayar",
      },
      delivered: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        label: "Dikirim",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        label: "Selesai",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
        label: "Dibatalkan",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
        label: "Gagal",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading && onlineOrders.length === 0 && offlineOrders.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 p-2 pt-14 md:pt-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error && !localStorage.getItem("token")) {
    return (
      <div className="w-full min-h-screen bg-gray-50 p-2 pt-14 md:pt-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
          <p className="text-red-600 mb-4">Anda belum login</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 pt-14 md:pt-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-neutral-900 mb-1">
            Laporan Penjualan
          </h1>
          <p className="text-xs md:text-xs lg:text-sm text-neutral-600">
            Pantau penjualan online dan offline Anda
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3 lg:gap-4 mb-4 md:mb-5 lg:mb-6">
          <SummaryCard
            icon={FiShoppingBag}
            label="Pesanan Online"
            value={todayData.onlineCount}
          />
          <SummaryCard
            icon={FiShoppingCart}
            label="Transaksi Offline"
            value={todayData.offlineCount}
          />
          <SummaryCard
            icon={FiDollarSign}
            label="Pendapatan hari ini"
            value={formatCurrency(todayData.revenue)}
          />
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="text-neutral-700 text-sm font-semibold whitespace-nowrap">
              Filter Tanggal
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <span className="text-neutral-600 text-sm font-medium text-center">
              s/d
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            <div className="relative flex-1 min-w-[200px]">
              <svg
                className="absolute left-4 top-3 text-neutral-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Cari Pesanan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-neutral-300 rounded-lg pl-11 pr-4 py-2.5 w-full text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <Button
              variant="primary"
              className="flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              onClick={handleExportPDF}
            >
              <span>Unduh Semua</span>
            </Button>
          </div>
        </div>

        {/* ONLINE ORDERS TABLE */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-green-500 rounded"></div>
            <h3 className="text-neutral-900 font-bold text-lg">
              Pesanan Online
            </h3>
            <button
              onClick={() => setShowAllOnlineOrders(!showAllOnlineOrders)}
              className="text-green-600 text-sm font-medium hover:underline ml-auto"
            >
              {showAllOnlineOrders ? "Tampilkan Lebih Sedikit" : "Lihat semua"}
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto border border-neutral-300 rounded-lg">
            <table className="min-w-full w-full text-xs border-collapse">
              <thead className="bg-neutral-100 text-neutral-700">
                <tr>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[130px] text-xs">
                    Id Pesanan
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    Waktu
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[120px] text-xs">
                    Produk
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    Jumlah <span>(pcs)</span>
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    Total
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[130px] text-xs">
                    Status
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-neutral-300 w-[100px] text-xs">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayOnlineOrders.length > 0 ? (
                  displayOnlineOrders.map((order, idx) => (
                    <tr key={idx} className="border-b border-neutral-300">
                      <td className="px-2 py-1.5 border-r border-neutral-300 text-xs text-center">
                        {order.orderId || order._id}
                      </td>
                      <td className="px-2 py-1.5 border-r border-neutral-300 text-center text-xs">
                        <span className="text-[10px] block">
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="text-[10px] text-neutral-500 block">
                          {getTimeFromDate(order.createdAt)}
                        </span>
                      </td>
                      <td
                        className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs"
                        title={order.items
                          ?.map((i) => i.product?.name)
                          .join(", ")}
                      >
                        {order.items?.[0]?.product?.name || "N/A"}
                        {order.items?.length > 1 ? "..." : ""}
                      </td>
                      <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs text-center">
                        {order.items?.length || 0}
                      </td>
                      <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                        {formatCurrency(order.totalPrice)}
                      </td>
                      <td className="px-2 py-1.5 border-r border-neutral-300 whitespace-nowrap text-center">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-2 py-1.5 text-center">
                        <button
                          onClick={() => handleViewOnlineOrderDetail(order._id)}
                          className="px-3 py-1.5 border border-green-300 rounded-lg text-green-700 text-xs font-medium whitespace-nowrap hover:bg-green-50 transition-colors"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-2 py-4 text-center text-neutral-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-3">
            {displayOnlineOrders.length > 0 ? (
              displayOnlineOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-neutral-500">
                      {order.orderId || order._id}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="font-semibold text-neutral-900">
                    {order.items?.[0]?.product?.name || "N/A"}
                    {order.items?.length > 1 ? "..." : ""}
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    {order.items?.length || 0} item
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900">
                      {formatCurrency(order.totalPrice)}
                    </span>
                    <button
                      onClick={() => handleViewOnlineOrderDetail(order._id)}
                      className="px-3 py-1.5 text-green-600 border border-green-300 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-500 py-8">
                Tidak ada data
              </p>
            )}
          </div>
        </section>

        {/* OFFLINE ORDERS TABLE */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-green-500 rounded"></div>
            <h3 className="text-neutral-900 font-bold text-lg">
              Transaksi Offline
            </h3>
            <button
              onClick={() => setShowAllOfflineOrders(!showAllOfflineOrders)}
              className="text-green-600 text-sm font-medium hover:underline ml-auto"
            >
              {showAllOfflineOrders ? "Tampilkan Lebih Sedikit" : "Lihat semua"}
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto border border-neutral-300 rounded-lg">
            <table className="min-w-full w-full text-xs border-collapse">
              <thead className="bg-neutral-100 text-neutral-700">
                <tr>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[130px] text-xs">
                    Id Pesanan
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    Tanggal
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[180px] text-xs">
                    Produk
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    Jumlah <span>(pcs)</span>
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    Total
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-neutral-300 w-[100px] text-xs">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayOfflineOrders.length > 0 ? (
                  displayOfflineOrders.map((order, idx) => {
                    const totalItems =
                      order.items?.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                      ) || 0;
                    return (
                      <tr key={idx} className="border-b border-neutral-300">
                        <td className="px-2 py-1.5 border-r border-neutral-300 text-xs text-center">
                          {order.orderId || order._id}
                        </td>
                        <td className="px-2 py-1.5 border-r border-neutral-300 text-center text-xs">
                          {formatDate(order.createdAt)}
                        </td>
                        <td
                          className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs"
                          title={order.items
                            ?.map((i) => i.product?.name)
                            .join(", ")}
                        >
                          {order.items?.[0]?.product?.name || "N/A"}
                          {order.items?.length > 1 ? "..." : ""}
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs text-center">
                          {totalItems}
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <button
                            onClick={() => setSelectedOfflineOrder(order)}
                            className="px-3 py-1.5 border border-green-300 rounded-lg text-green-700 text-xs font-medium whitespace-nowrap hover:bg-green-50 transition-colors"
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-2 py-4 text-center text-neutral-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-3">
            {displayOfflineOrders.length > 0 ? (
              displayOfflineOrders.map((order, idx) => {
                const totalItems =
                  order.items?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) || 0;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-neutral-500">
                        {order.orderId || order._id}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <p className="font-semibold text-neutral-900">
                      {order.items?.[0]?.product?.name || "N/A"}
                      {order.items?.length > 1 ? "..." : ""}
                    </p>
                    <p className="text-sm text-neutral-600 mb-2">
                      {totalItems} item
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral-900">
                        {formatCurrency(order.totalPrice)}
                      </span>
                      <button
                        onClick={() => setSelectedOfflineOrder(order)}
                        className="px-3 py-1.5 text-green-600 border border-green-300 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-neutral-500 py-8">
                Tidak ada data
              </p>
            )}
          </div>
        </section>

        {/* Modal */}
        <OfflineOrderDetailModal
          order={selectedOfflineOrder}
          onClose={() => setSelectedOfflineOrder(null)}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
