export default function OfflineOrderDetailModal({
  order,
  onClose,
  formatDate,
}) {
  if (!order) return null;

  // 🔍 DEBUG - CEK DATA
  console.log("=== DEBUG ORDER ===");
  console.log("Full order:", order);

  // Format waktu dari createdAt
  const getTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalItemsCount = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Detail Transaksi</h2>
          <button onClick={onClose} className="text-2xl text-neutral-500">
            ×
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-neutral-50 p-3 rounded-lg">
            <p className="text-xs text-neutral-500">ID Transaksi</p>
            <p className="font-bold">{order.orderId || order._id}</p>
          </div>

          <div>
            <p className="text-xs text-neutral-500 mb-1">Tanggal & Waktu</p>
            <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
            <p className="text-sm text-neutral-600">{getTime(order.createdAt)}</p>
          </div>

          <div>
            <p className="text-xs text-neutral-500 mb-1">Metode Pembayaran</p>
            <p className="text-sm font-medium capitalize">
              {order.paymentMethod || "Tunai"}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-500 mb-2 font-semibold">
              Produk
            </p>
            <div className="space-y-2">
              {order.items?.map((item, idx) => {
                // ✅ Validasi price dan quantity dari backend
                const price = typeof item.price === 'number' ? item.price : 0;
                const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
                const subtotal = price * quantity;
                const productName = item.product?.name || item.name || "Produk";

                return (
                  <div
                    key={idx}
                    className="bg-neutral-50 p-3 rounded-lg border border-neutral-200"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm flex-1">{productName}</p>
                      <p className="font-bold text-sm text-primary-700">
                        Rp {subtotal.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>
                        {quantity} x Rp {price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-neutral-600">Total Item</span>
              <span className="font-medium">{totalItemsCount} pcs</span>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-lg border-2 border-primary-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Pembayaran</span>
              <span className="text-xl font-bold text-primary-700">
                Rp {(order.totalPrice || 0).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}