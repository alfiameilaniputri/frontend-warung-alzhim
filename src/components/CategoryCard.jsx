import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ image, label }) {
  return (
    <Link
      to={`/category/${label}`}
      className="flex flex-col items-center cursor-pointer"
    >
 <div className="bg-white p-3 rounded-xl shadow hover:shadow-md transition
                w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40
                flex flex-col items-center justify-center">
  <img
    src={image}
    alt={label}
    className="max-w-full max-h-2/3 object-contain"
  />
  <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-neutral-800 text-center">
    {label}
  </p>
</div>



    </Link>
  );
}
