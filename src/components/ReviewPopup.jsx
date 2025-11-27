import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import Button from "./Button";

export default function ReviewPopup({ onCancel, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-lg p-6">
        {/* Judul */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Beri Ulasan Produk
        </h2>

        {/* Bintang */}
        <div className="flex gap-3 mb-6 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="cursor-pointer"
            >
              {(hover || rating) >= star ? (
                <BsStarFill size={32} className="text-yellow-400" />
              ) : (
                <BsStar size={32} className="text-gray-300" />
              )}
            </span>
          ))}
        </div>

        {/* Label */}
        <p className="text-sm text-gray-700 text-center mb-2">Ulasan</p>

        {/* Input */}
        <textarea
          className="w-full h-28 p-3 rounded-lg bg-gray-100 text-gray-700 text-sm outline-none resize-none"
          placeholder="Masukkan ulasan di sini..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        {/* Tombol */}
        <div className="flex gap-4 mt-6 justify-center w-full">
          <Button variant="soft" size="md" fullWidth={false} onClick={onCancel}>
            Batal
          </Button>

          <Button
            variant="primary"
            size="md"
            fullWidth={false}
            onClick={() => onSubmit({ rating, reviewText })}
          >
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
}
