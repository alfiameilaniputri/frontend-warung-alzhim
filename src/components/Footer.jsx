import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-neutral-50 font-poppins px-4 md:px-6 lg:px-8 xl:px-18 py-10">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        {/* BRAND */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo-web-warung-alzhim.png" 
            alt="Warung" 
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-2xl font-semibold tracking-wide">
            WARUNG ALZHIM
          </h2>
        </div>

        {/* WHATSAPP */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Whatsapp</h3>
          <div className="flex justify-center md:justify-start items-center gap-2 mt-1">
            <FaWhatsapp size={18} />
            <span className="text-sm">085710441934</span>
          </div>
        </div>

        {/* ALAMAT */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Alamat</h3>
          <div className="flex justify-center md:justify-start items-center gap-2 mt-1">
            <IoLocationSharp size={18} />
            <span className="text-sm">Kp. Parung, Bintang Alam</span>
          </div>
        </div>
      </div>

      {/* GARIS PEMISAH */}
      <div className="border-t border-neutral-100 opacity-40 mt-8"></div>

      {/* COPYRIGHT */}
      <p className="text-center text-neutral-100 text-sm mt-4">
        © 2025 Warung Alzhim — Solusi Belanja Harian Lebih Mudah
      </p>

    </footer>
  );
}
