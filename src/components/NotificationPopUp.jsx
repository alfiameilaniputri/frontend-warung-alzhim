import React, { useState } from "react";
import { FiClock, FiCheck, FiTruck, FiXCircle, FiCreditCard, FiX } from "react-icons/fi";

export default function NotificationPopup({ notifications, onClose, dropdown }) {
  const [showAll, setShowAll] = useState(false);

  const typeMap = {
    pending: { bg: "#FFC107", icon: <FiClock className="text-white" /> },
    paid: { bg: "#25A7BC", icon: <FiCreditCard className="text-white" /> },
    shipped: { bg: "#6C757D", icon: <FiTruck className="text-white" /> },
    done: { bg: "#0D6EFD", icon: <FiCheck className="text-white" /> },
    cancel: { bg: "#DC3545", icon: <FiXCircle className="text-white" /> },
  };

  const visibleNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
   <div
  className={`
    z-999 bg-white rounded-xl shadow-lg
    ${
      dropdown
        ? `
          absolute top-full mt-2
          right-0               /* Tempelkan ke kanan */
          pr-3                  /* Tambahkan Jarak dari tepi kanan */
          w-fit                 /* Biarkan lebar mengikuti max-w */
          max-w-[85vw]          /* Batas lebar mobile */
          sm:right-0
          sm:pr-0
          sm:w-72 sm:max-w-none
        `
        : `
          fixed inset-0
          w-[85vw] max-w-[300px] mx-auto
          sm:w-72
        `
    }
  `}
>

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-900 text-md lg:text-lg">Notifikasi Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={18} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {visibleNotifications.map((n, i) => {
            const { bg, icon } = typeMap[n.type] || {};
            return (
              <div key={i} className="flex items-start gap-3 border-b pb-2 last:border-none">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: bg }}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{n.title}</p>
                  <p className="text-sm text-gray-700">{n.desc}</p>
                  <p className="text-xs text-gray-500">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lihat Semua */}
        {notifications.length > 5 && (
          <button
            className="w-full mt-3 text-sm text-center text-primary-700 font-medium"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Sembunyikan Notifikasi" : "Lihat Semua Notifikasi"}
          </button>
        )}
      </div>
    </div>
  );
}
