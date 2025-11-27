export default function NotificationPopup({ onClose }) {
  const notifications = [
    {
      type: "pending",
      title: "Menunggu Pembayaran",
      desc: "Pesanan #1238790 menunggu pembayaran",
      time: "2 menit yang lalu",
      color: "bg-yellow-100 text-yellow-600",
      icon: "⏱",
    },
    {
      type: "paid",
      title: "Pembayaran Berhasil",
      desc: "Pesanan #12346 pembayaran telah dikonfirmasi",
      time: "15 menit yang lalu",
      color: "bg-teal-100 text-teal-600",
      icon: "💳",
    },
    {
      type: "shipped",
      title: "Pesanan Dikirim",
      desc: "Pesanan #12345 sedang dalam perjalanan",
      time: "20 menit yang lalu",
      color: "bg-orange-100 text-orange-600",
      icon: "🚚",
    },
    {
      type: "done",
      title: "Pesanan Selesai",
      desc: "Pesanan #12344 telah sampai di tujuan",
      time: "1 jam yang lalu",
      color: "bg-green-100 text-green-600",
      icon: "✔",
    },
    {
      type: "cancel",
      title: "Pesanan Dibatalkan",
      desc: "Pesanan #12331 dibatalkan oleh sistem karena tidak ada pembayaran",
      time: "2 jam yang lalu",
      color: "bg-red-100 text-red-600",
      icon: "✖",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-lg p-5 relative overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">Notifikasi Baru</h2>
        <p className="text-sm text-gray-500 mb-4">1 notifikasi baru</p>

        {/* List */}
        <div className="space-y-5">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-4 border-b pb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-lg ${n.color}`}
              >
                {n.icon}
              </div>

              <div>
                <p className="font-semibold text-gray-900">{n.title}</p>
                <p className="text-sm text-gray-700">{n.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Link Footer */}
        <button className="w-full text-center text-sm text-gray-700 font-medium mt-5">
          Lihat Semua Notifikasi
        </button>

        {/* Close Button (kanan bawah) */}
        <button
          onClick={onClose}
          className="absolute bottom-5 right-5 text-xl bg-black/5 w-9 h-9 flex items-center justify-center rounded-full"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
