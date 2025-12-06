import React, { useState } from "react";
import Button from "./Button";

// export default function OrderItemReview({ item, API_URL }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   console.log("item", item)

//   const handleSubmitReview = async () => {
//     if (rating === 0) return alert("Berikan rating terlebih dahulu");

//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem("token");

//       const payload = {
//         orderItemId: item.id,
//         rating,
//         comment,
//       };

//       const res = await fetch(`${API_URL}/api/review`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Review berhasil dikirim!");
//         // opsional: update UI atau set item.isReviewed = true
//       } else {
//         alert(data.message || "Gagal mengirim review");
//       }
//     } catch (err) {
//       alert(err.message || "Terjadi kesalahan");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-2 p-2 border border-gray-200 rounded-md">
//       {/* Rating bintang */}
//       <div className="flex items-center mt-1 gap-1">
//         {[1, 2, 3, 4, 5].map((n) => (
//           <span
//             key={n}
//             className={`cursor-pointer text-lg ${
//               rating >= n ? "text-yellow-400" : "text-gray-300"
//             }`}
//             onClick={() => setRating(n)}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       {/* Komentar */}
//       <textarea
//         className="w-full border px-2 py-1 mt-2 rounded-md"
//         rows={3}
//         placeholder="Tulis komentar..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />

//       {/* Submit */}
//       <Button
//         variant="primary"
//         size="sm"
//         className="mt-2 px-3 py-1.5 text-xs md:text-sm rounded-lg whitespace-nowrap bg-emerald-600 text-white"
//         onClick={handleSubmitReview}
//         disabled={submitting}
//       >
//         {submitting ? "Mengirim..." : "Kirim Review"}
//       </Button>
//     </div>
//   );
// }

export default function OrderItemReview({ item, API_URL, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  console.log("item", item)

  const handleSubmitReview = async () => {
    if (rating === 0) return alert("Berikan rating terlebih dahulu");

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const payload = {
        orderItemId: item.id,
        rating,
        comment,
      };

      const res = await fetch(`${API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Review berhasil dikirim!");
        onClose?.();
        window.location.reload();
      } else {
        alert(data.message || "Gagal mengirim review");
      }
    } catch (err) {
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-2 p-3 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Rating bintang */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`cursor-pointer text-xl ${
                  rating >= n ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(n)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Komentar */}
          <textarea
            className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm"
            rows={3}
            placeholder="Tulis komentar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit button di sebelah kanan */}
        <div className="flex flex-col gap-2 pt-1">
          <Button
            variant="primary"
            size="sm"
            className="px-3 py-1.5 text-xs rounded-lg whitespace-nowrap bg-emerald-600 text-white"
            onClick={handleSubmitReview}
            disabled={submitting}
          >
            {submitting ? "..." : "Kirim"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 py-1.5 text-xs rounded-lg whitespace-nowrap border-gray-300 text-gray-600"
            onClick={onClose}
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
