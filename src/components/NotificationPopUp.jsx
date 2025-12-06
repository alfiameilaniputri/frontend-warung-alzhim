import React, { useEffect, useState } from "react";
import {
  FiClock,
  FiCheck,
  FiTruck,
  FiXCircle,
  FiCreditCard,
  FiX,
} from "react-icons/fi";
import useNotificationStore from "../stores/useNotificationStore";

export default function NotificationPopup({ onClose, dropdown }) {
  const { notifications, fetchNotifications, readNotification } =
    useNotificationStore();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchNotifications(); // fetch saat mount
  }, []);

  // Pastikan notifications selalu array
  const visibleNotifications = Array.isArray(notifications)
    ? showAll
      ? notifications
      : notifications.slice(0, 5)
    : [];

  const getStatus = (title) => {
    const t = title.toLowerCase();
    if (t.includes("belum bayar")) return "pending";
    if (t.includes("dibayar")) return "paid";
    if (t.includes("dikirim")) return "shipped";
    if (t.includes("selesai")) return "done";
    if (t.includes("dibatalkan")) return "cancel";
    return "pending";
  };

  const typeMap = {
    pending: { bg: "#FFC107", icon: <FiClock className="text-white" /> },
    paid: { bg: "#25A7BC", icon: <FiCreditCard className="text-white" /> },
    shipped: { bg: "#6C757D", icon: <FiTruck className="text-white" /> },
    done: { bg: "#0D6EFD", icon: <FiCheck className="text-white" /> },
    cancel: { bg: "#DC3545", icon: <FiXCircle className="text-white" /> },
  };

  return (
    <div
      className={`z-50 bg-white rounded-xl shadow-lg border border-neutral-200 ${
        dropdown
          ? "absolute top-full right-0 mt-2 w-72 sm:w-64 lg:w-80 max-h-[300px] overflow-y-auto"
          : "fixed inset-0 mx-auto w-10/12 max-w-sm max-h-[60vh] overflow-y-auto"
      }`}
    >
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-900 text-sm lg:text-md">
            Notifikasi Baru
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {visibleNotifications.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              Belum ada notifikasi
            </p>
          )}

          {visibleNotifications.map((n) => {
            const status = getStatus(n.title);
            const { bg, icon } = typeMap[status];

            return (
              <div
                key={n._id}
                className={`flex items-start gap-2 border-b pb-1 last:border-none ${
                  n.isRead ? "opacity-50" : "font-semibold"
                }`}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-full shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{n.title}</p>
                  <p className="text-xs text-gray-700">{n.message}</p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                {!n.isRead && (
                  <button
                    className="ml-1 text-[10px] text-primary-700 hover:underline"
                    onClick={() => readNotification(n._id)}
                  >
                    Tandai
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {notifications.length > 5 && (
          <button
            className="w-full mt-2 text-xs text-center text-primary-700 font-medium"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Sembunyikan" : "Lihat Semua"}
          </button>
        )}
      </div>
    </div>
  );
}
