import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import OfflineOrderDetailModal from "../../components/OfflineOrderDetailModal";
import jsPDF from "jspdf";

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
      <div
        className={`w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white`}
      >
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOfflineOrder, setSelectedOfflineOrder] = useState(null);
  const [showAllOnlineOrders, setShowAllOnlineOrders] = useState(false);
  const [showAllOfflineOrders, setShowAllOfflineOrders] = useState(false);

  // Get today's date for dummy data
  const getTodayDateStr = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const todayDateStr = getTodayDateStr();

  // Data Online Orders - Sinkronisasi dengan PesananOnlinePage
  const onlineOrders = [
    {
      id: "12345",
      buyer: "Ansela Maharani",
      products: "Indomie Goreng, Floridina",
      qty: 2,
      total: "Rp 48.000",
      time: "14:30",
      date: todayDateStr,
      status: "Selesai",
    },
    {
      id: "12346",
      buyer: "Budi Santoso",
      products: "Aqua 600 ml, Susu Ultra 1L, Roti Tawar",
      qty: 3,
      total: "Rp 67.000",
      time: "13:15",
      date: todayDateStr,
      status: "Dibayar",
    },
    {
      id: "12344",
      buyer: "Andi Wijaya",
      products: "Telur 1/4 Kg, Minyak 1/2 Liter",
      qty: 2,
      total: "Rp 18.000",
      time: "12:30",
      date: todayDateStr,
      status: "Dibayar",
    },
    {
      id: "12343",
      buyer: "Andi Wijaya",
      products: "Beras 1 Liter",
      qty: 1,
      total: "Rp 120.000",
      time: "10:00",
      date: todayDateStr,
      status: "Dikirim",
    },
    {
      id: "12342",
      buyer: "Andi Wijaya",
      products: "Pasta Gigi Pepsodent Kecil",
      qty: 1,
      total: "Rp 25.000",
      time: "08:30",
      date: todayDateStr,
      status: "Selesai",
    },
  ];

  // Data Offline Orders - Dummy transaksi hari ini >5
  const offlineOrders = [
    {
      id: "OFF-001-2024",
      date: todayDateStr,
      time: "08:00",
      items: [
        { name: "Indomie Goreng", qty: 20, price: 40000 },
        { name: "Mie Telur", qty: 15, price: 50000 },
      ],
      total: 1550000,
    },

    {
      id: "OFF-002-2024",
      date: todayDateStr,
      time: "09:30",
      items: [{ name: "Gula Putih 1 Kg", qty: 10, price: 120000 }],
      total: 1200000,
    },

    {
      id: "OFF-003-2024",
      date: todayDateStr,
      time: "10:15",
      items: [{ name: "Minyak Goreng 2 Liter", qty: 8, price: 35000 }],
      total: 280000,
    },

    {
      id: "OFF-004-2024",
      date: todayDateStr,
      time: "11:00",
      items: [{ name: "Telur Ayam 1 Kg", qty: 12, price: 75000 }],
      total: 900000,
    },

    {
      id: "OFF-005-2024",
      date: todayDateStr,
      time: "14:30",
      items: [{ name: "Kopi Premium 500gr", qty: 6, price: 85000 }],
      total: 510000,
    },

    {
      id: "OFF-006-2024",
      date: todayDateStr,
      time: "15:45",
      items: [{ name: "Tepung Terigu 5 Kg", qty: 5, price: 95000 }],
      total: 475000,
    },

    {
      id: "OFF-007-2024",
      date: todayDateStr,
      time: "16:20",
      items: [{ name: "Susu Murni 1 Liter", qty: 8, price: 60000 }],
      total: 480000,
    },

    {
      id: "OFF-008-2024",
      date: todayDateStr,
      time: "17:00",
      items: [{ name: "Roti Tawar Premium", qty: 10, price: 45000 }],
      total: 450000,
    },

    {
      id: "OFF-009-2024",
      date: todayDateStr,
      time: "17:30",
      items: [{ name: "Keju Mozarella 500gr", qty: 4, price: 150000 }],
      total: 600000,
    },

    {
      id: "OFF-010-2024",
      date: todayDateStr,
      time: "18:00",
      items: [{ name: "Mentega 200gr", qty: 7, price: 65000 }],
      total: 455000,
    },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
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
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // FILTER FUNCTION
  const filterOrders = (orders) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.date);
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

  const filteredOnlineOrders = filterOrders(onlineOrders);
  const filteredOfflineOrders = filterOrders(offlineOrders);

  // Display limited or full data
  const displayOnlineOrders = showAllOnlineOrders
    ? filteredOnlineOrders
    : filteredOnlineOrders.slice(0, 5);
  const displayOfflineOrders = showAllOfflineOrders
    ? filteredOfflineOrders
    : filteredOfflineOrders.slice(0, 5);

  // Calculate total revenue
  const calculateTotal = (orders) => {
    return orders.reduce((sum, order) => {
      let total = 0;
      if (typeof order.total === "string") {
        total = parseInt(order.total.replace(/\D/g, "")) || 0;
      } else {
        total = order.total || 0;
      }
      return sum + total;
    }, 0);
  };

  // Calculate today's data (not affected by filter)
  const getTodayData = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const todayOnline = onlineOrders.filter((order) => order.date === todayStr);
    const todayOffline = offlineOrders.filter(
      (order) => order.date === todayStr
    );
    const todayRevenue =
      calculateTotal(todayOnline) + calculateTotal(todayOffline);

    return {
      onlineCount: todayOnline.length,
      offlineCount: todayOffline.length,
      revenue: todayRevenue,
    };
  };

  const todayData = getTodayData();

  const formatCurrency = (num) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

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

      // Online Orders Header
      doc.setFontSize(11);
      doc.text("Pesanan Online", 10, yPosition);
      yPosition += 8;

      // Online Orders Table Header
      doc.setFontSize(9);
      doc.setFillColor(34, 197, 94);
      doc.setTextColor(255, 255, 255);
      const onlineHeaders = ["ID", "Pembeli", "Produk", "Total", "Status"];
      const colWidths = [25, 30, 50, 30, 35];
      let xPos = 10;

      onlineHeaders.forEach((header, idx) => {
        doc.rect(xPos, yPosition - 5, colWidths[idx], 7, "F");
        doc.text(header, xPos + 2, yPosition, { maxWidth: colWidths[idx] - 2 });
        xPos += colWidths[idx];
      });

      yPosition += 10;
      doc.setTextColor(0, 0, 0);

      // Online Orders Data
      displayOnlineOrders.forEach((order) => {
        xPos = 10;
        const rowData = [
          order.id,
          order.buyer,
          order.products.split(",")[0].trim(),
          order.total,
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

      // Offline Orders Header
      doc.setFontSize(11);
      doc.text("Transaksi Offline", 10, yPosition);
      yPosition += 8;

      // Offline Orders Table Header
      doc.setFontSize(9);
      doc.setFillColor(34, 197, 94);
      doc.setTextColor(255, 255, 255);
      const offlineHeaders = ["ID", "Produk", "Jumlah", "Total"];
      const offlineColWidths = [30, 80, 25, 40];
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

      // Offline Orders Data
      displayOfflineOrders.forEach((order) => {
        const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);
        xPos = 10;
        const rowData = [
          order.id,
          order.items.map((i) => i.name).join(", "),
          totalItems.toString(),
          `Rp ${order.total.toLocaleString("id-ID")}`,
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

      // Save PDF
      const filename = `Laporan_Penjualan_${
        today.toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF. Silakan coba lagi.");
    }
  };

  // Handle view detail untuk online orders
  const handleViewOnlineOrderDetail = (orderId) => {
    navigate(`/seller/order-online`, { state: { selectedOrderId: orderId } });
  };

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
                    ID TRANSAKSI
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    WAKTU
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[120px] text-xs">
                    NAMA PEMBELI
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[140px] text-xs">
                    PRODUK
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    TOTAL
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[130px] text-xs">
                    STATUS
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-neutral-300 w-[100px] text-xs">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayOnlineOrders.length > 0 ? (
                  displayOnlineOrders.map((order, idx) => {
                    const firstProduct = order.products.split(",")[0].trim();
                    const hasMore = order.products.includes(",");
                    return (
                      <tr key={idx} className="border-b border-neutral-300">
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs text-center">
                          {order.id}
                        </td>
                        <td className="px-2 py-1.5 border-r border-neutral-300 text-center text-xs">
                          <span className="text-[10px] block">
                            {formatDate(order.date)}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">
                            {order.time}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                          {order.buyer}
                        </td>
                        <td
                          className="px-2 py-1.5 border-r border-neutral-300 text-xs"
                          title={order.products}
                        >
                          <span className="truncate block">
                            {firstProduct}
                            {hasMore ? "..." : ""}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                          {order.total}
                        </td>
                        <td className="px-2 py-1.5 border-r border-neutral-300 whitespace-nowrap text-center">
                          {order.status === "Selesai" && (
                            <span className="px-1.5 py-0.5 rounded-lg text-[10px] bg-green-100 text-green-700 border border-green-300">
                              Selesai
                            </span>
                          )}
                          {order.status === "Dibayar" && (
                            <span className="px-1.5 py-0.5 rounded-lg text-[10px] bg-yellow-100 text-yellow-700 border border-yellow-300">
                              Dibayar
                            </span>
                          )}
                          {order.status === "Dikirim" && (
                            <span className="px-1.5 py-0.5 rounded-lg text-[10px] bg-blue-100 text-blue-700 border border-blue-300">
                              Dikirim
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <button
                            onClick={() =>
                              handleViewOnlineOrderDetail(order.id)
                            }
                            className="px-2 py-0.5 border border-green-300 rounded-lg text-green-700 text-[10px] whitespace-nowrap hover:bg-green-50"
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
                      Tidak ada data yang sesuai
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
                    <span className="text-xs text-neutral-500 text-center">
                      {order.id}
                    </span>
                    {order.status === "Selesai" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Selesai
                      </span>
                    )}
                    {order.status === "Dibayar" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Dibayar
                      </span>
                    )}
                    {order.status === "Dikirim" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Dikirim
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-neutral-900">
                    {order.buyer}
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    {order.products.split(",")[0]}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900">
                      {order.total}
                    </span>
                    <button
                      onClick={() => handleViewOnlineOrderDetail(order.id)}
                      className="px-2 py-1 text-green-600 border border-green-300 rounded text-xs font-medium hover:bg-green-50"
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
                    ID TRANSAKSI
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    TANGGAL
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[180px] text-xs">
                    PRODUK
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    JUMLAH ITEM
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[110px] text-xs">
                    HARGA SATUAN
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-r border-neutral-300 w-[100px] text-xs">
                    TOTAL
                  </th>
                  <th className="px-2 py-1.5 text-center border-b border-neutral-300 w-[100px] text-xs">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayOfflineOrders.length > 0 ? (
                  displayOfflineOrders.map((order, idx) => {
                    const firstItem = order.items[0];
                    const totalItems = order.items.reduce(
                      (sum, item) => sum + item.qty,
                      0
                    );
                    return (
                      <tr key={idx} className="border-b border-neutral-300">
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs text-center">
                          {order.id}
                        </td>
                        <td className="px-2 py-1.5 border-r border-neutral-300 text-center text-xs">
                          {formatDate(order.date)}
                        </td>
                        <td
                          className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs"
                          title={order.items.map((i) => i.name).join(", ")}
                        >
                          {firstItem.name}
                          {order.items.length > 1 ? "..." : ""}
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs text-center">
                          {totalItems}
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                          Rp {firstItem.price.toLocaleString("id-ID")}
                        </td>
                        <td className="px-2 py-1.5 truncate border-r border-neutral-300 text-xs">
                          Rp {order.total.toLocaleString("id-ID")}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <button
                            onClick={() => setSelectedOfflineOrder(order)}
                            className="px-2 py-0.5 border border-green-300 rounded-lg text-green-700 text-[10px] whitespace-nowrap hover:bg-green-50"
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
                      colSpan="7"
                      className="px-2 py-4 text-center text-neutral-500"
                    >
                      Tidak ada data yang sesuai
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
                const firstItem = order.items[0];
                const totalItems = order.items.reduce(
                  (sum, item) => sum + item.qty,
                  0
                );
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-neutral-500 text-center">
                        {order.id}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <p className="font-semibold text-neutral-900 mb-1">
                      {firstItem.name}
                      {order.items.length > 1 ? " & lainnya" : ""}
                    </p>
                    <p className="text-sm text-neutral-600 mb-2">
                      {totalItems} pcs
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral-900">
                        Rp {order.total.toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={() => setSelectedOfflineOrder(order)}
                        className="px-2 py-1 text-green-600 border border-green-300 rounded text-xs font-medium hover:bg-green-50"
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
      </div>
      {/* Modal */}
      <OfflineOrderDetailModal
        order={selectedOfflineOrder}
        onClose={() => setSelectedOfflineOrder(null)}
        formatDate={formatDate}
      />
    </div>
  );
}
