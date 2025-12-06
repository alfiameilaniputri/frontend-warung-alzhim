import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import useOrderStore from "../../stores/useOrderStore";
import useProductStore from "../../stores/useProductStore";

export default function OfflineTransactionPage() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("tunai");
  const [paymentAmount, setPaymentAmount] = useState("");

  const { offlineOrders, createOfflineOrder, loading, error, fetchOfflineOrders } = useOrderStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchOfflineOrders();
  }, [fetchOfflineOrders]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("offline order", offlineOrders.length)

  // const products = [
  //   { id: 1, name: "Aqua 600 ml", price: 4000 },
  //   { id: 2, name: "Indomie Goreng", price: 3500 },
  //   { id: 3, name: "Indomie Ayam Bawang", price: 3500 },
  //   { id: 4, name: "Telur Ayam 1 Butir", price: 2500 },
  //   { id: 5, name: "Gula Pasir 1/4 Kg", price: 5000 },
  //   { id: 6, name: "Minyak Goreng 1 Liter", price: 15000 },
  //   { id: 7, name: "Kopi Kapal Api Sachet", price: 1500 },
  //   { id: 8, name: "Teh Pucuk 350 ml", price: 4000 },
  //   { id: 9, name: "Susu UHT 200 ml", price: 6000 },
  //   { id: 10, name: "Beras 1 Liter", price: 12000 },
  //   { id: 11, name: "Sabun Mandi Lifebuoy", price: 3500 },
  //   { id: 12, name: "Pepsodent 75gr", price: 8000 },
  //   { id: 13, name: "Shampoo Sachet Sunsilk", price: 1000 },
  //   { id: 14, name: "Rokok Surya 12", price: 27000 },
  //   { id: 15, name: "Rokok Sampurna Mild 12", price: 26000 },
  //   { id: 16, name: "Chitato 68 gr", price: 9000 },
  //   { id: 17, name: "Malkist Crackers", price: 5000 },
  //   { id: 18, name: "Sosis Kanzler Singles", price: 8000 },
  //   { id: 19, name: "Tepung Terigu 1/2 Kg", price: 7000 },
  //   { id: 20, name: "Garam Dapur 250gr", price: 3000 },
  // ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, id: Date.now(), qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  console.log(cart)

  const payment = parseFloat(paymentAmount.replace(/\./g, "")) || 0;
  const change = payment - total;
  const canProcess = payment >= total && total > 0;

  const processTransaction = async () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    if (payment < total) {
      alert("Jumlah bayar kurang!");
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        productId: item._id,
        qty: Number(item.qty),
      })),
      paymentMethod: selectedPayment,
    };

    // Kirim langsung ke store
    console.log(payload)
    const response = await createOfflineOrder(payload);
    // const response = payload;

    if (response) {
      alert("Transaksi berhasil dibuat!");
      console.log("Order Response:", response);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-neutral-100 p-2 pt-14 md:pt-4">
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-neutral-900">
            Transaksi Offline
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          {/* PRODUK */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              Cari Produk
            </h2>

            <div className="relative mb-4">
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
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
                placeholder="Ketik nama produk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* GRID PRODUK DIBATASI 50vh DAN SCROLL */}
            <div className="max-h-[50vh] lg:max-h-screen overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product, index) => (
                  <button
                    key={product._id}
                    onClick={() => addToCart(product)}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-lg border-2 border-neutral-300 bg-white hover:border-primary-500 hover:bg-primary-50 transition group"
                    title={product.name} // Tooltip native browser
                  >
                    <span className="text-[13px] font-semibold text-neutral-900 truncate mr-3">
                      {product.name}
                    </span>
                    <span className="text-[13px] font-bold text-primary-700 shrink-0 whitespace-nowrap">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KERANJANG */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 h-fit lg:sticky lg:top-4">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              Keranjang
            </h2>

            <div className="mb-4">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-neutral-400">
                  <div className="text-4xl mb-2">🛒</div>
                  <div className="text-xs">Keranjang masih kosong</div>
                </div>
              ) : (
                <div className="max-h-[50vh] overflow-y-auto space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex justify-between mb-1">
                        <p className="font-bold text-sm">{item.name}</p>
                        <span className="font-bold text-sm text-primary-700 ml-2">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-1">
                        <p className="text-neutral-700 text-[11px]">
                          @Rp {item.price.toLocaleString("id-ID")}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center bg-[#ebebec] rounded-md text-[14px]"
                          >
                            −
                          </button>
                          <span className="text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center bg-[#ebebec] rounded-md text-[14px]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-accent-500 hover:text-accent-600 text-[11px] font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="py-3 border-t border-neutral-200 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold">Total</span>
                <span className="text-base font-bold text-primary-700">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Pembayaran */}
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block">
                Metode Pembayaran
              </label>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { id: "tunai", label: "Tunai" },
                  { id: "qris", label: "QRIS" },
                  { id: "transfer", label: "Transfer" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${selectedPayment === method.id
                      ? "bg-primary-500 text-white"
                      : "border border-neutral-300 bg-white"
                      }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              <label className="text-sm font-semibold mb-1 mt-4 block">
                Jumlah Bayar
              </label>
              <input
                type="text"
                placeholder="0"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-primary-500 mb-3"
              />

              {payment >= total && total > 0 && (
                <div className="bg-primary-50 rounded-lg py-2 px-3 mb-3 text-center">
                  <p className="text-[11px] text-primary-700 font-medium">
                    Kembalian
                  </p>
                  <p className="text-primary-700 font-bold text-base">
                    Rp {change.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>

            {/* Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={processTransaction}
              disabled={!canProcess}
              className="rounded-lg! py-2.5! text-sm! font-bold!"
            >
              Simpan Transaksi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
