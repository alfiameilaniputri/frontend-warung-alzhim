import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiCheck,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Button from "../components/Button";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";
import useOrderStore from "../stores/useOrderStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    productDetail,
    fetchProductDetail,
    detailLoading,
    detailError,
    productReviews,
    fetchProductReviews,
    reviewsLoading,
  } = useProductStore();

  const { addCartItem, fetchCart } = useCartStore();
  const { createOrder } = useOrderStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetchProductDetail(productId);
    fetchProductReviews(productId);
  }, [productId, fetchProductDetail, fetchProductReviews]);

  // Calculate average rating
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, review) => sum + review.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  const totalReviews = productReviews.length;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (productDetail && quantity < productDetail.stock)
      setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!productDetail || isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const success = await addCartItem(productDetail, quantity);

      if (success) {
        alert("Produk berhasil ditambahkan ke keranjang!");
        await fetchCart(); // Refresh cart count
      } else {
        alert("Gagal menambahkan produk ke keranjang");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Terjadi kesalahan saat menambahkan ke keranjang");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!productDetail || isBuying) return;

    setIsBuying(true);
    try {
      // Format sesuai backend: items: [{ productId, quantity }]
      const items = [
        {
          productId: productDetail._id,
          quantity: quantity,
        },
      ];

      const itemsSelect = [
        {
          productId: {
            _id : productDetail._id,
            price: productDetail.price,
            images: productDetail.images,
          },
          qty: quantity,
        },
      ];

      const orderData = await createOrder(items);

      if (orderData && orderData.orderId) {
        const selectedItems = itemsSelect;
        console.log("Order created:", itemsSelect);
        // Redirect ke halaman order
        navigate(`/order/${orderData.orderId}`, { state: { selectedItems } });
      } else {
        alert("Gagal membuat pesanan");
        setIsBuying(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Terjadi kesalahan saat membuat pesanan");
      setIsBuying(false);
    }
  };

  if (detailLoading) return <p className="p-4">Loading produk...</p>;
  if (detailError) return <p className="p-4 text-red-500">{detailError}</p>;
  if (!productDetail) return <p className="p-4">Produk tidak ditemukan.</p>;

  const images = Array.isArray(productDetail.images)
    ? productDetail.images
    : [];
  const mainImage = images[selectedImage] || "";
  const reviewsToShow = showAllReviews
    ? productReviews
    : productReviews.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="sticky top-0 bg-neutral-100 z-10 py-3 flex items-center gap-3">
        <button
          className="text-neutral-800 text-2xl pt-2 pr-4"
          onClick={() => navigate(-1)}
        >
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
              src={mainImage ? `${API_URL}/public/products/${mainImage}` : ""}
              alt={productDetail.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-neutral-200"
                }`}
              >
                <img
                  src={`${API_URL}/public/products/${img}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2 leading-tight">
            {productDetail.name}
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(averageRating)
                      ? "text-yellow-400"
                      : "text-neutral-300"
                  }
                />
              ))}
            </div>
            <span className="text-base text-neutral-700 leading-none flex items-center">
              {averageRating} / 5.0
            </span>
            <span className="text-neutral-400 text-sm leading-none flex items-center">
              •
            </span>
            <span className="text-sm text-neutral-700 leading-none flex items-center">
              {totalReviews} Ulasan
            </span>
          </div>

          {/* HARGA */}
          <p className="text-2xl md:text-3xl font-bold text-primary-500 mb-4">
            Rp. {productDetail.price?.toLocaleString("id-ID")}
          </p>

          {/* DESKRIPSI */}
          <p className="text-base md:text-base text-neutral-700 mb-4 leading-relaxed text-justify">
            {productDetail.description}
          </p>

          {/* STOK */}
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg mb-6">
            <FiCheck className="text-primary-500" size={24} />
            <span className="text-base font-medium lg:font-semibold text-primary-500">
              Stok Tersedia: {productDetail.stock} pcs
            </span>
          </div>

          {/* JUMLAH */}
          <div className="mb-6">
            <div className="flex items-center justify-between md:justify-start md:gap-4 mb-2">
              <label className="text-lg font-semibold">Jumlah:</label>
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
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <FiPlus size={20} />
              {isAddingToCart ? "Menambahkan..." : "Masukkan Keranjang"}
            </Button>

            <Button
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 bg-green-500 text-white hover:bg-green-600"
              onClick={handleBuyNow}
              disabled={isBuying}
            >
              <FiShoppingBag size={20} />
              {isBuying ? "Memproses..." : "Beli Sekarang"}
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION ULASAN */}
      <div className="px-4 py-6 bg-white mt-4 mb-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Ulasan Pembeli
        </h3>

        {reviewsLoading ? (
          <p>Loading ulasan...</p>
        ) : productReviews.length === 0 ? (
          <p>Belum ada ulasan untuk produk ini.</p>
        ) : (
          <>
            <div className="space-y-4">
              {reviewsToShow.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-neutral-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold shrink-0">
                      {review.buyer?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-neutral-900">
                          {review.buyer?.name || "Anonymous"}
                        </h4>
                        <span className="text-xs text-neutral-500">
                          {new Date(review.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
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
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {productReviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full mt-4 py-3 border border-neutral-300 rounded-xl text-neutral-700 font-medium hover:bg-neutral-50 transition"
              >
                {showAllReviews
                  ? "Sembunyikan Ulasan"
                  : `Lihat Semua Ulasan (${productReviews.length})`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
