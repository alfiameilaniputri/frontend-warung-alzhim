import { useState } from "react";
import OrderCard from "../components/OrderCard";
import OrderDetailPopup from "../components/OrderDetailPopUp";
import { FiChevronLeft } from "react-icons/fi";
import ReviewPopup from "../components/ReviewPopup";

export default function CustomerOrderPage() {
  const tabs = [
    { key: "unpaid", label: "Belum Bayar", count: 2 },
    { key: "paid", label: "Dibayar", count: 1 },
    { key: "sent", label: "Dikirim", count: 2 },
    { key: "completed", label: "Selesai", count: 2 },
  ];

  const [activeTab, setActiveTab] = useState("unpaid");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenReview = (order) => {
    setReviewOrder(order);
    setIsReviewPopupOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewPopupOpen(false);
    setReviewOrder(null);
  };

  const handleSubmitReview = (data) => {
    console.log("Rating:", data.rating);
    console.log("Ulasan:", data.reviewText);
    setIsReviewPopupOpen(false);
  };

  const dummyOrders = [
    // =======================
    // 1. BELUM BAYAR
    // =======================
    {
      id: "ORD-001",
      status: "unpaid",
      transaction: "TXN-123456",
      statusText: "Belum Bayar",
      orderDate: "27 Nov 2025",

      items: [
        {
          name: "Indomie Goreng",
          quantity: 10,
          price: 4000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 10 * 4000,
    },

    {
      id: "ORD-002",
      status: "unpaid",
      statusText: "Belum Bayar",
      orderDate: "26 Nov 2025",
      transaction: "TXN-123457",

      items: [
        {
          name: "Indomie Goreng",
          quantity: 5,
          price: 4000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
        {
          name: "Air Mineral 600 ml",
          quantity: 2,
          price: 4000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 5 * 4000 + 2 * 4000,
    },

    // =======================
    // 2. DIBAYAR
    // =======================
    {
      id: "ORD-003",
      status: "paid",
      statusText: "Dibayar",
      orderDate: "26 Nov 2025",

      items: [
        {
          name: "Susu UHT Coklat",
          quantity: 3,
          price: 6500,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 3 * 6500,
    },

    {
      id: "ORD-004",
      status: "paid",
      statusText: "Dibayar",
      orderDate: "26 Nov 2025",

      items: [
        {
          name: "Telur Ayam 1 Kg",
          quantity: 1,
          price: 28000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 28000,
    },

    // =======================
    // 3. DIKIRIM
    // =======================
    {
      id: "ORD-005",
      status: "sent",
      statusText: "Dikirim",
      orderDate: "25 Nov 2025",

      items: [
        {
          name: "Beras Premium 5 Kg",
          quantity: 1,
          price: 67000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
        {
          name: "Gula Pasir 1 Kg",
          quantity: 2,
          price: 14000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 67000 + 2 * 14000,
    },

    {
      id: "ORD-008",
      status: "sent",
      statusText: "Dikirim",
      orderDate: "24 Nov 2025",

      items: [
        {
          name: "Nugget Ayam 500gr",
          quantity: 1,
          price: 22000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
        {
          name: "Sosis Ayam 500gr",
          quantity: 1,
          price: 21000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 22000 + 21000,
    },

    // =======================
    // 4. SELESAI
    // =======================
    {
      id: "ORD-006",
      status: "completed",
      statusText: "Selesai",
      orderDate: "25 Nov 2025",
      reviewGiven: true,
      review: {
        rating: 5,
        reviewText:
          "Produknya sangat bagus dan pengirimannya cepat! Kemasan rapi dan aman. Pasti akan order lagi. Terima kasih!",
        reviewDate: "26 Nov 2025",
      },
      items: [
        {
          name: "Minyak Goreng 1L",
          quantity: 2,
          price: 13000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],
      total: 2 * 13000,
    },

    {
      id: "ORD-007",
      status: "completed",
      statusText: "Selesai",
      orderDate: "24 Nov 2025",
      reviewGiven: false, // BELUM DIULAS - tampil tombol "Berikan Ulasan"

      items: [
        {
          name: "Nugget Ayam 500gr",
          quantity: 1,
          price: 22000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
        {
          name: "Sosis Ayam 500gr",
          quantity: 1,
          price: 21000,
          image: `https://picsum.photos/300/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        },
      ],

      total: 22000 + 21000,
    },
  ];

  const dummyProfile = {
    fullName: "Rina Putri",
    phone: "0812-3456-7890",
    address: "Blok A12, Bintang Alam",
  };

  const filteredOrders = dummyOrders.filter((o) => o.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex items-center gap-3 mt-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition -ml-2">
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Pesanan Saya</h1>
      </div>

      {/* Tabs ikut scroll, tidak sticky */}
      <div>
        <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-3 py-3 text-sm font-medium whitespace-nowrap relative ${
                activeTab === tab.key ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-0 py-4 pb-6">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada pesanan pada status ini.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                data={order}
                onDetailClick={handleOrderClick}
                onOpenReview={handleOpenReview}
              />
            ))}
          </div>
        )}
      </div>

      <OrderDetailPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        orderData={{ ...selectedOrder, ...dummyProfile }}
      />

      {isReviewPopupOpen && (
        <ReviewPopup
          onCancel={handleCloseReview}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}
