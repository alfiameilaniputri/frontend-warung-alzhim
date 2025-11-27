import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { FaCheck } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";

const initial = [
  {
    id: 1,
    name: "Indomie Goreng Original",
    price: 3500,
    qty: 10,
    img: `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
  },
  {
    id: 2,
    name: "Teh Botol Sosro",
    price: 5000,
    qty: 5,
    img: `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
  },
  {
    id: 3,
    name: "Susu UHT Full Cream",
    price: 7000,
    qty: 8,
    img: `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
  },
  {
    id: 4,
    name: "Snack Kacang Garuda",
    price: 12000,
    qty: 12,
    img: `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
  },
  {
    id: 5,
    name: "Roti Tawar Gandum",
    price: 15000,
    qty: 7,
    img: `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const toggleItem = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );

  const toggleSelectAll = () => {
    const allSelected = items.every((i) => i.selected);
    setItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const changeQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

  const deleteItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const selectedItems = items.filter((i) => i && i.selected);
  const summary = {
    productCount: selectedItems.length,
    totalItems: selectedItems.reduce((s, it) => s + it.qty, 0),
    totalPrice: selectedItems.reduce((s, it) => s + it.qty * it.price, 0),
  };

  return (
    <main className="w-full py-6 px-4 max-w-6xl mx-auto">
      {" "}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <FiChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">Keranjang Belanja</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {" "}
        <section className="flex-1 space-y-4">
          {" "}
          <div className="bg-white rounded-xl border border-neutral-100 p-3 sm:p-4 flex items-center justify-between gap-2">
            {" "}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleSelectAll}
                className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded border-2 shrink-0 transition-colors ${
                  items.length > 0 && items.every((i) => i.selected)
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-neutral-500 hover:border-primary-400"
                }`}
              >
                {items.length > 0 && items.every((i) => i.selected) && (
                  <FaCheck className="w-3 h-3 text-white" />
                )}{" "}
              </button>{" "}
              <span
                className="font-medium text-sm sm:text-base whitespace-nowrap cursor-pointer"
                onClick={toggleSelectAll}
              >
                Pilih Semua Produk{" "}
              </span>{" "}
            </div>{" "}
            <span className="text-neutral-600 text-xs sm:text-sm whitespace-nowrap shrink-0">
              ({summary.productCount} Produk) terpilih{" "}
            </span>{" "}
          </div>
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((it) => (
                <CartItem
                  key={it.id}
                  item={it}
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

            <Button variant="primary" fullWidth size="md">
              Lanjut ke Pemesanan
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
