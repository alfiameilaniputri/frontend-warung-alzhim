import React, { useState } from "react";
import {
  FiChevronLeft,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiCheck,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Button from "../components/Button";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const product = {
    name: "Telur Ayam 1/4 Kg",
    price: "8000",
    rating: 4.5,
    reviews: 50,
    stock: 200,
    description:
      "Telur Ayam 1/4 Kg berisi sekitar 4 butir telur segar. Cocok untuk kebutuhan memasak sehari-hari.",
    images: [
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&h=500&fit=crop",
    ],
  };

  const allReviews = [
    {
      name: "Siti Aminah",
      rating: 5,
      date: "2 hari yang lalu",
      comment:
        "Telurnya segar banget! Dikirim dengan packaging yang rapi, tidak ada yang pecah. Cocok untuk masak sehari-hari.",
      avatar: "SA",
    },
    {
      name: "Budi Santoso",
      rating: 4,
      date: "5 hari yang lalu",
      comment:
        "Kualitas bagus, harga terjangkau. Cuma pengiriman agak lama, tapi overall puas!",
      avatar: "BS",
    },
    {
      name: "Dewi Lestari",
      rating: 5,
      date: "1 minggu yang lalu",
      comment:
        "Sudah order berkali-kali, selalu fresh dan berkualitas. Recommended seller!",
      avatar: "DL",
    },
    {
      name: "Ahmad Yani",
      rating: 5,
      date: "1 minggu yang lalu",
      comment:
        "Telur besar-besar dan bersih. Pengiriman cepat, packing aman pakai bubble wrap.",
      avatar: "AY",
    },
    {
      name: "Rina Wati",
      rating: 4,
      date: "2 minggu yang lalu",
      comment:
        "Bagus sih telurnya, tapi 1 ada yang retak dikit. Overall masih oke lah untuk harga segini.",
      avatar: "RW",
    },
    {
      name: "Hendra Wijaya",
      rating: 5,
      date: "2 minggu yang lalu",
      comment:
        "Langganan di sini terus. Stoknya selalu ready dan kualitas konsisten.",
      avatar: "HW",
    },
  ];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const reviewsToShow = showAllReviews ? allReviews : allReviews.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="sticky top-0 bg-neutral-100 z-10 py-3 flex items-center gap-3">
        <button className="text-neutral-800 text-2xl pt-2 pr-4">
          <FiChevronLeft />
        </button>
        <h1 className="text-xl font-bold pt-2">Detail Produk</h1>
      </div>

      {/* WRAPPER */}
      <div className="px-4 py-4 flex flex-col md:flex-row md:gap-6 bg-neutral-100">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 md:h-full">
          <div className="rounded-xl overflow-hidden aspect-square">
            <img
              src={product.images[selectedImage]}
              alt="produk"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-neutral-200"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          {/* NAMA */}
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2 leading-tight">
            {product.name}
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <span className="text-base text-neutral-700 leading-none flex items-center">
              {product.rating} / 5.0
            </span>

            <span className="text-neutral-400 text-sm leading-none flex items-center">
              •
            </span>

            <span className="text-sm text-neutral-700 leading-none flex items-center">
              {product.reviews} Ulasan
            </span>
          </div>

          {/* HARGA */}
          <p className="text-2xl md:text-3xl font-bold text-primary-500 mb-4">
            Rp. {product.price}
          </p>

          {/* DESKRIPSI */}
          <p className="text-base md:text-base text-neutral-700 mb-4 leading-relaxed text-justify">
            {product.description}
          </p>

          {/* STOK */}
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg mb-6">
            <FiCheck className="text-primary-500" size={24} />
            <span className="text-base font-medium lg:font-semibold text-primary-500">
              Stok Tersedia: {product.stock} pcs
            </span>
          </div>

          {/* JUMLAH */}
          <div className="mb-6">
            <div className="flex items-center justify-between md:justify-start md:gap-4 mb-2">
              <label className="text-lg font-semibold">Jumlah:</label>

              {/* BOX QTY */}
              <div className="flex items-center bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2 gap-6">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition"
                >
                  <FiMinus />
                </button>

                <span className="w-6 text-center font-semibold text-neutral-900">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 border-green-500 text-green-600 hover:bg-green-50"
            >
              <FiPlus size={20} />
              Masukkan Keranjang
            </Button>

            <Button
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 bg-green-500 text-white hover:bg-green-600"
            >
              <FiShoppingBag size={20} />
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION ULASAN */}
      <div className="px-4 py-6 bg-white mt-4 mb-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Ulasan Pembeli
        </h3>

        {/* Review Items */}
        <div className="space-y-4">
          {reviewsToShow.map((review, index) => (
            <div
              key={index}
              className="border-b border-neutral-200 pb-4 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold shrink-0">
                  {review.avatar}
                </div>

                <div className="flex-1">
                  {/* Name & Date */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-neutral-900">
                      {review.name}
                    </h4>
                    <span className="text-xs text-neutral-500">
                      {review.date}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-neutral-300"
                        }
                        size={14}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lihat Semua Ulasan */}
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="w-full mt-4 py-3 border border-neutral-300 rounded-xl text-neutral-700 font-medium hover:bg-neutral-50 transition"
        >
          {showAllReviews
            ? "Sembunyikan Ulasan"
            : `Lihat Semua Ulasan (${product.reviews})`}
        </button>
      </div>
    </div>
  );
}