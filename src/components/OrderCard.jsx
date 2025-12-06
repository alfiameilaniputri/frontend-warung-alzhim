// import React from "react";
// import Button from "./Button";
// import { useNavigate } from "react-router-dom";
// import OrderItemReview from "./OrderItemReview";
// import { useState } from "react";

// export default function OrderCard({ data, onDetailClick, onOpenReview }) {
//   const [reviewingItemId, setReviewingItemId] = useState(null);
//   const navigate = useNavigate();

//   const API_URL = import.meta.env.VITE_API_URL;

//   const items = Array.isArray(data?.items)
//     ? data.items.map((it) => ({
//         id: it._id ?? "",
//         name: it.product?.name ?? "",
//         image: it.product?.images?.[0] ?? "", // pakai gambar pertama
//         quantity: it.quantity ?? 0,
//         price: it.product?.price ?? 0,
//         isReviewed: it.isReviewed ?? false,
//       }))
//     : [];

//   if (items.length === 0 && data) {
//     const base = {
//       name: data.productName ?? "",
//       image: data.image ?? "",
//       quantity: data.quantity ?? 0,
//       price: data.price ?? 0,
//     };
//     items = [base];

//     if (data.hasAdditionalItem) {
//       items.push({
//         id: data._id ?? "",
//         name: data.additionalItemName ?? "",
//         image: data.image ?? "",
//         quantity: data.additionalQuantity ?? 0,
//         price: data.additionalPrice ?? 0,
//       });
//     }
//   }

//   const statusKey = (data?.status || data?.statusText || "").toLowerCase();
//   const id = (data?._id || "").toLowerCase();
//   const sudahUlas = data?.reviewGiven === true;
//   const totalFormatted = Number(data?.totalPrice ?? 0).toLocaleString("id-ID");

//   console.log("ts", data);

//   // Tombol action
//   const LihatDetailButton = (
//     <Button
//       variant="outline"
//       size="sm"
//       className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-white border-emerald-600 text-emerald-600 w-full md:w-auto"
//       onClick={() => onDetailClick?.(data)}
//     >
//       Lihat Detail
//     </Button>
//   );

//   const BayarSekarangButton = (
//     <Button
//       variant="primary"
//       size="sm"
//       className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
//       onClick={() => navigate(`/payment/${data._id}`)}
//     >
//       Bayar Sekarang
//     </Button>
//   );

//   const MenungguPengirimanButton = (
//     <Button
//       variant="outline"
//       size="sm"
//       disabled
//       className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-secondary-100 border-secondary-300 text-secondary-700 cursor-not-allowed w-full md:w-auto"
//     >
//       Menunggu Pengiriman
//     </Button>
//   );

//   const PesananDiterimaButton = (
//     <Button
//       variant="primary"
//       size="sm"
//       className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-900 text-white w-full md:w-auto"
//       onClick={async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await fetch(`${API_URL}/api/order/confirm/${id}`, {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           const data = await res.json();

//           if (res.ok && (data.success || data.data)) {
//             alert("Pesanan berhasil dikonfirmasi diterima!");
//             window.location.reload(); // <-- refresh halaman
//           } else {
//             alert(data.message || "Gagal konfirmasi pesanan");
//           }
//         } catch (err) {
//           alert(err.message || "Terjadi kesalahan");
//         }
//       }}
//     >
//       Pesanan Diterima
//     </Button>
//   );

//   const BerikanUlasanButton = (
//     <Button
//       variant="primary"
//       size="sm"
//       className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
//     >
//       Berikan Ulasan
//     </Button>
//   );

//   const renderActionButton = () => {
//     if (statusKey === "belum bayar" || statusKey === "pending")
//       return BayarSekarangButton;
//     if (statusKey === "dibayar" || statusKey === "paid")
//       return MenungguPengirimanButton;
//     if (statusKey === "dikirim" || statusKey === "delivered")
//       return PesananDiterimaButton;

//     // Selesai
//     if (statusKey === "selesai" || statusKey === "completed") {
//       // Jika sudah diulas, tidak tampilkan tombol action
//       if (sudahUlas) {
//         return null;
//       }

//       // Jika belum diulas, tampilkan tombol Berikan Ulasan
//       return (
//         <Button
//           variant="primary"
//           size="sm"
//           className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
//           onClick={() => onOpenReview?.(data)}
//         >
//           Berikan Ulasan
//         </Button>
//       );
//     }

//     return null;
//   };

//   const getStatusStyle = (s) => {
//     switch ((s || "").toLowerCase()) {
//       case "belum bayar":
//       case "unpaid":
//         return "text-green-600 italic";
//       case "dibayar":
//       case "paid":
//         return "text-secondary-600 italic";
//       case "dikirim":
//       case "sent":
//         return "text-black italic";
//       case "selesai":
//       case "completed":
//         return "text-emerald-700 italic";
//       default:
//         return "text-gray-500 italic";
//     }
//   };

//   return (
//     <div className="relative bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
//       {/* Status di pojok kanan atas */}
//       <span
//         className={`absolute top-3 right-3 text-xs md:text-sm font-medium ${getStatusStyle(
//           data?.statusText
//         )}`}
//       >
//         {data?.statusText}
//       </span>

//       <div className="p-3 sm:p-4 md:p-5">
//         {/* Semua items */}
//         <div className="space-y-3">
//           {items.map((it, idx) => (
//             <div
//               key={idx}
//               className={`flex gap-3 md:gap-4 ${
//                 idx !== items.length - 1 ? "pb-3 border-b border-gray-200" : ""
//               }`}
//             >
//               {/* Foto */}
//               <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100 shrink-0">
//                 {it.image ? (
//                   <img
//                     src={`${API_URL}/public/products/${it.image}`}
//                     alt={it.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200" />
//                 )}
//               </div>

//               {/* Nama + qty × harga */}
//               <div className="flex-1 flex flex-col justify-center min-w-0">
//                 <p className="font-semibold text-gray-900 text-sm md:text-base leading-tight truncate">
//                   {it.name} 
//                 </p>
//                 <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
//                   {it.quantity} x Rp{" "}
//                   {Number(it.price ?? 0).toLocaleString("id-ID")}
//                 </p>

//                 {/* Tombol review muncul kalau status selesai dan belum diulas */}
//                 {data.status === "completed" && !it.isReviewed && (
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     className="mt-2 px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-50"
//                     onClick={() => setReviewingItemId(it.id)}
//                   >
//                     Berikan Ulasan
//                   </Button>
//                 )}

//                 {/* Form review muncul hanya di item yang diklik */}
//                 {reviewingItemId === it.id && (
//                   <OrderItemReview
//                     item={it}
//                     API_URL={API_URL}
//                     onClose={() => setReviewingItemId(null)}
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Total & tombol */}
//         <div className="pt-3 md:pt-4 mt-3 border-t border-gray-200">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
//             <p className="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">
//               Total: Rp {totalFormatted}
//             </p>
//             <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
//               {LihatDetailButton}
//               {renderActionButton()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import OrderItemReview from "./OrderItemReview";
import { useState } from "react";

export default function OrderCard({ data, onDetailClick }) {
  const [reviewingItemId, setReviewingItemId] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  let items = Array.isArray(data?.items)
    ? data.items.map((it) => ({
        id: it._id ?? "",
        name: it.product?.name ?? "",
        image: it.product?.images?.[0] ?? "",
        quantity: it.quantity ?? 0,
        price: it.product?.price ?? 0,
        isReviewed: it.isReviewed ?? false,
      }))
    : [];

  if (items.length === 0 && data) {
    const base = {
      name: data.productName ?? "",
      image: data.image ?? "",
      quantity: data.quantity ?? 0,
      price: data.price ?? 0,
    };
    items = [base];

    if (data.hasAdditionalItem) {
      items.push({
        id: data._id ?? "",
        name: data.additionalItemName ?? "",
        image: data.image ?? "",
        quantity: data.additionalQuantity ?? 0,
        price: data.additionalPrice ?? 0,
      });
    }
  }

  const statusKey = (data?.status || data?.statusText || "").toLowerCase();
  const id = (data?._id || "").toLowerCase();
  const totalFormatted = Number(data?.totalPrice ?? 0).toLocaleString("id-ID");

  console.log("ts", data);

  // Tombol action
  const LihatDetailButton = (
    <Button
      variant="outline"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-white border-emerald-600 text-emerald-600 w-full md:w-auto"
      onClick={() => onDetailClick?.(data)}
    >
      Lihat Detail
    </Button>
  );

  const BayarSekarangButton = (
    <Button
      variant="primary"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-full md:w-auto"
      onClick={() => navigate(`/payment/${data._id}`)}
    >
      Bayar Sekarang
    </Button>
  );

  const MenungguPengirimanButton = (
    <Button
      variant="outline"
      size="sm"
      disabled
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-secondary-100 border-secondary-300 text-secondary-700 cursor-not-allowed w-full md:w-auto"
    >
      Menunggu Pengiriman
    </Button>
  );

  const PesananDiterimaButton = (
    <Button
      variant="primary"
      size="sm"
      className="px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-900 text-white w-full md:w-auto"
      onClick={async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${API_URL}/api/order/confirm/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.ok && (data.success || data.data)) {
            alert("Pesanan berhasil dikonfirmasi diterima!");
            window.location.reload();
          } else {
            alert(data.message || "Gagal konfirmasi pesanan");
          }
        } catch (err) {
          alert(err.message || "Terjadi kesalahan");
        }
      }}
    >
      Pesanan Diterima
    </Button>
  );

  const renderActionButton = () => {
    if (statusKey === "belum bayar" || statusKey === "pending")
      return BayarSekarangButton;
    if (statusKey === "dibayar" || statusKey === "paid")
      return MenungguPengirimanButton;
    if (statusKey === "dikirim" || statusKey === "delivered")
      return PesananDiterimaButton;

    // Untuk status selesai, tidak ada tombol action global
    // Karena tombol review sudah ada per item
    return null;
  };

  const getStatusStyle = (s) => {
    switch ((s || "").toLowerCase()) {
      case "belum bayar":
      case "unpaid":
        return "text-green-600 italic";
      case "dibayar":
      case "paid":
        return "text-secondary-600 italic";
      case "dikirim":
      case "sent":
        return "text-black italic";
      case "selesai":
      case "completed":
        return "text-emerald-700 italic";
      default:
        return "text-gray-500 italic";
    }
  };

  return (
    <div className="relative bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
      {/* Status di pojok kanan atas */}
      <span
        className={`absolute top-3 right-3 text-xs md:text-sm font-medium ${getStatusStyle(
          data?.statusText
        )}`}
      >
        {data?.statusText}
      </span>

      <div className="p-3 sm:p-4 md:p-5">
        {/* Semua items */}
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx}>
              <div
                className={`flex gap-3 md:gap-4 ${
                  idx !== items.length - 1 && !reviewingItemId ? "pb-3 border-b border-gray-200" : ""
                }`}
              >
                {/* Foto */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  {it.image ? (
                    <img
                      src={`${API_URL}/public/products/${it.image}`}
                      alt={it.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* Nama + qty × harga */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <p className="font-semibold text-gray-900 text-sm md:text-base leading-tight truncate">
                    {it.name} 
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
                    {it.quantity} x Rp{" "}
                    {Number(it.price ?? 0).toLocaleString("id-ID")}
                  </p>

                  {/* Tombol review muncul kalau status selesai dan belum diulas */}
                  {data.status === "completed" && !it.isReviewed && reviewingItemId !== it.id && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-2 px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white w-fit"
                      onClick={() => setReviewingItemId(it.id)}
                    >
                      Berikan Ulasan
                    </Button>
                  )}
                </div>
              </div>

              {/* Form review muncul hanya di item yang diklik */}
              {reviewingItemId === it.id && (
                <OrderItemReview
                  item={it}
                  API_URL={API_URL}
                  onClose={() => setReviewingItemId(null)}
                />
              )}
              
              {/* Border pemisah antar item, kecuali item terakhir */}
              {idx !== items.length - 1 && reviewingItemId !== it.id && (
                <div className="border-b border-gray-200 mt-3"></div>
              )}
            </div>
          ))}
        </div>

        {/* Total & tombol */}
        <div className="pt-3 md:pt-4 mt-3 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">
              Total: Rp {totalFormatted}
            </p>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              {LihatDetailButton}
              {renderActionButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}