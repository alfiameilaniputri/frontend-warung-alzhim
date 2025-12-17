import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { FaCheck } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import useAuthStore from "../stores/useAuthStore";
import useOrderStore from "../stores/useOrderStore";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, fetchCart, updateCartItem, removeCartItem, loading } = useCartStore();
  const { createOrder } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stockError, setStockError] = useState(null); // State untuk error stok
  const { user } = useAuthStore();


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // TOGGLE 1 PRODUK
  const toggleItem = (id) => {
    useCartStore.setState((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      ),
    }));
  };

  // TOGGLE SEMUA PRODUK
  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);

    useCartStore.setState((state) => ({
      cartItems: state.cartItems.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
    }));
  };

  // UPDATE QTY DENGAN VALIDASI STOK
  const changeQty = (id, qty) => {
    if (qty < 1) return;

    // Cari item untuk validasi stok
    const item = cartItems.find((cartItem) => cartItem._id === id);
    const availableStock = item?.productId?.stock || 0;

    // Validasi stok
    if (qty > availableStock) {
      console.log('stock gk cukup')
      setStockError(
        `Stok tidak mencukupi untuk ${item?.productId?.name}. Stok tersedia: ${availableStock}`
      );
      
      // Auto-clear error setelah 3 detik
      // setTimeout(() => setStockError(null), 3000);
      return;
    }

    // Jika valid, update quantity
    setStockError(null);
    updateCartItem(id, qty);
  };

  // DELETE ITEM
  const deleteItem = (id) => {
    removeCartItem(id);
    setStockError(null);
  };

  const handleProceedToOrder = async () => {
  const selectedCartItems = cartItems.filter((item) => item.selected);

  if (selectedCartItems.length === 0) {
    alert("Pilih minimal 1 produk untuk melanjutkan pemesanan");
    return;
  }

  // VALIDASI DATA PENGIRIMAN
  if (
    !user ||
    !user.name?.trim() ||
    !user.phone_number?.trim() ||
    !user.address?.trim()
  ) {
    alert("Data pengiriman wajib diisi lengkap saat melakukan pemesanan");
    return;
  }

  // VALIDASI STOK
  for (const item of selectedCartItems) {
    const availableStock = item?.productId?.stock || 0;
    if (item.qty > availableStock) {
      setStockError(
        `Stok tidak mencukupi untuk ${item?.productId?.name}. Stok tersedia: ${availableStock}`
      );
      return;
    }
  }

  setIsProcessing(true);

  try {
    const items = selectedCartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.qty,
    }));

    const orderData = await createOrder(items);

    if (orderData?.orderId) {
      for (const item of selectedCartItems) {
        await removeCartItem(item._id);
      }

      await fetchCart();
      navigate(`/order/${orderData.orderId}`);
    } else {
      alert("Gagal membuat pesanan");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    alert("Terjadi kesalahan saat membuat pesanan");
  } finally {
    setIsProcessing(false);
  }
};


  // SUMMARY
  const selectedItems = cartItems.filter((item) => item.selected);

  const summary = {
    productCount: selectedItems.length,
    totalItems: selectedItems.reduce((t, item) => t + item.qty, 0),
    totalPrice: selectedItems.reduce(
      (t, item) => t + item.qty * (item.productId?.price || 0),
      0
    ),
  };

  return (
    <main className="w-full py-6 px-4 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">Keranjang Belanja</h1>
      </div>

      {/* ERROR ALERT STOK */}
      {stockError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          ⚠️ {stockError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LIST PRODUK */}
        <section className="flex-1 space-y-4">
          <div className="bg-white rounded-xl border border-neutral-100 p-3 sm:p-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleSelectAll}
                className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded border-2 shrink-0 transition-colors ${
                  cartItems.length > 0 &&
                  cartItems.every((item) => item.selected)
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-neutral-500 hover:border-primary-400"
                }`}
              >
                {cartItems.length > 0 &&
                  cartItems.every((item) => item.selected) && (
                    <FaCheck className="w-3 h-3 text-white" />
                  )}
              </button>

              <span
                onClick={toggleSelectAll}
                className="font-medium text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                Pilih Semua Produk
              </span>
            </div>

            <span className="text-neutral-600 text-xs sm:text-sm whitespace-nowrap">
              ({summary.productCount} Produk) terpilih
            </span>
          </div>

          {/* LIST ITEM */}
          <div className="space-y-4">
            {loading && cartItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-100 p-8 text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onToggle={toggleItem}
                  onQtyChange={changeQty}
                  onDelete={deleteItem}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border border-neutral-100 p-8 text-center">
                <p className="text-neutral-500 text-base">
                  Keranjang belanja kosong
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RINGKASAN */}
        <aside className="w-full lg:w-80">
          <div className="bg-white rounded-xl border border-neutral-100 p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h2>

            <div className="text-sm text-neutral-700 mb-3">
              <div className="flex justify-between py-2">
                <span>Produk terpilih</span>
                <span>{summary.productCount} produk</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Jumlah item</span>
                <span>{summary.totalItems} item</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-primary-500 font-bold text-lg">
                  Rp. {summary.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="md"
              onClick={handleProceedToOrder}
              disabled={isProcessing || selectedItems.length === 0}
            >
              {isProcessing ? "Memproses..." : "Lanjut ke Pemesanan"}
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}