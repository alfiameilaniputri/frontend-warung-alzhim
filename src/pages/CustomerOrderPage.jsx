// import { useState, useEffect } from "react";
// import OrderCard from "../components/OrderCard";
// import OrderDetailPopup from "../components/OrderDetailPopUp";
// import { FiChevronLeft } from "react-icons/fi";
// import ReviewPopup from "../components/ReviewPopup";
// import useOrderStore from "../stores/useOrderStore";

// export default function CustomerOrderPage() {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
//   const [reviewOrder, setReviewOrder] = useState(null);
//   const { fetchOrders } = useOrderStore();

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getOrders = async () => {
//       const data = await fetchOrders();
//       setOrders(data)
//       console.log("Fetched orders:", data);
//     };
//     getOrders();
//   }, [fetchOrders]);

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedOrder(null);
//   };

//   const handleOpenReview = (order) => {
//     setReviewOrder(order);
//     setIsReviewPopupOpen(true);
//   };

//   const handleCloseReview = () => {
//     setIsReviewPopupOpen(false);
//     setReviewOrder(null);
//   };

//   const handleSubmitReview = (data) => {
//     setIsReviewPopupOpen(false);
//   };

//   const dummyProfile = {
//     fullName: "Rina Putri",
//     phone: "0812-3456-7890",
//     address: "Blok A12, Bintang Alam",
//   };

//   const filteredOrders = orders.filter((o) => o.status === activeTab);

//   const tabs = ["pending", "paid", "delivered", "completed"].map((statusKey) => {
//   const labelMap = {
//     pending: "Belum Bayar",
//     paid: "Dibayar",
//     delivered: "Dikirim",
//     completed: "Selesai",
//   };

//   return {
//     key: statusKey,
//     label: labelMap[statusKey],
//     count: orders.filter((o) => o.status === statusKey).length,
//   };
// });


//   console.log("order", tabs)

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <div className="flex items-center gap-3 mt-4">
//         <button className="p-2 rounded-lg hover:bg-gray-100 transition -ml-2">
//           <FiChevronLeft size={24} />
//         </button>
//         <h1 className="text-xl font-semibold text-gray-900">Pesanan Saya</h1>
//       </div>

//       {/* Tabs ikut scroll, tidak sticky */}
//       <div>
//         <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`flex-1 px-3 py-3 text-sm font-medium whitespace-nowrap relative ${
//                 activeTab === tab.key ? "text-emerald-600" : "text-gray-600"
//               }`}
//             >
//               {tab.label} ({tab.count})
//               {activeTab === tab.key && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto px-0 py-4 pb-6">
//         {filteredOrders.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">
//             Tidak ada pesanan pada status ini.
//           </p>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {filteredOrders.map((order) => (
//               <OrderCard
//                 key={order._id}
//                 data={order}
//                 onDetailClick={handleOrderClick}
//                 onOpenReview={handleOpenReview}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <OrderDetailPopup
//         isOpen={isPopupOpen}
//         onClose={handleClosePopup}
//         orderData={{ ...selectedOrder, ...dummyProfile }}
//       />

//       {isReviewPopupOpen && (
//         <ReviewPopup
//           onCancel={handleCloseReview}
//           onSubmit={handleSubmitReview}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import OrderDetailPopup from "../components/OrderDetailPopUp";
import { FiChevronLeft } from "react-icons/fi";
import ReviewPopup from "../components/ReviewPopup";
import useOrderStore from "../stores/useOrderStore";

export default function CustomerOrderPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  const { fetchOrders, fetchOrderDetail } = useOrderStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
      console.log("Fetched orders:", data);
    };
    getOrders();
  }, [fetchOrders]);

  const handleOrderClick = async (order) => {
    try {
      setIsLoadingDetail(true);
      setIsPopupOpen(true);
      
      const detailData = await fetchOrderDetail(order._id);
      
      if (detailData) {
        console.log("Detail order with reviews:", detailData);
        setSelectedOrder(detailData);
      } else {
        setSelectedOrder(order);
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
      setSelectedOrder(order);
    } finally {
      setIsLoadingDetail(false);
    }
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
    setIsReviewPopupOpen(false);
  };

  const dummyProfile = {
    fullName: "Rina Putri",
    phone: "0812-3456-7890",
    address: "Blok A12, Bintang Alam",
  };

  const filteredOrders = orders.filter((o) => o.status === activeTab);

  const tabs = ["pending", "paid", "delivered", "completed"].map((statusKey) => {
    const labelMap = {
      pending: "Belum Bayar",
      paid: "Dibayar",
      delivered: "Dikirim",
      completed: "Selesai",
    };

    return {
      key: statusKey,
      label: labelMap[statusKey],
      count: orders.filter((o) => o.status === statusKey).length,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex items-center gap-3 mt-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition -ml-2">
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Pesanan Saya</h1>
      </div>

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
                key={order._id}
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
        orderData={selectedOrder ? { ...selectedOrder, ...dummyProfile } : null}
        isLoading={isLoadingDetail}
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