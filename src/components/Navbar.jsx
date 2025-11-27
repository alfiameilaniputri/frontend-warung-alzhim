import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { FiSearch, FiShoppingCart, FiBell } from "react-icons/fi";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fungsi handle change input search
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    // Navigate HANYA jika input TIDAK kosong
    if (val.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(val)}`);
    } else {
      // Kembali ke home jika user menghapus semua teks
      navigate("/");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full flex items-center justify-between gap-3 py-3 px-4 md:px-6 lg:px-8 xl:px-18">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/logo-web-warung-alzhim.png"
            alt="Warung Alzhim"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <span className="font-bold text-2xl text-primary-500 hidden sm:flex">
            WARUNG ALZHIM
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex flex-1 max-w-xl mx-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari Produk...."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-primary-500"
            />
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700"
              size={18}
            />
          </div>
        </div>

        {/* DESKTOP RIGHT SECTION */}
        <div className="hidden sm:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <Link to="/register">
                <Button variant="soft" size="sm">
                  Daftar
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Masuk
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="text-primary-700 text-2xl hover:opacity-70"
              >
                <FiShoppingCart />
              </Link>
              <button className="relative text-primary-700 text-2xl hover:opacity-70">
                <FiBell />
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] rounded-full px-1">
                  1
                </span>
              </button>
              <img
                src="/avatar.png"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            </>
          )}
        </div>

        {/* MOBILE RIGHT SECTION */}
        <div className="flex sm:hidden items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="text-primary-700 text-2xl">
                <FiShoppingCart />
              </Link>
              <button className="relative text-primary-700 text-2xl">
                <FiBell />
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] rounded-full px-1">
                  1
                </span>
              </button>
              <button
                className="text-neutral-700 text-2xl"
                onClick={() => setOpenMenu(!openMenu)}
              >
                ☰
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button size="sm" variant="soft">
                  Daftar
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" variant="primary">
                  Masuk
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {openMenu && isLoggedIn && (
        <div className="sm:hidden px-4 pb-4 space-y-3">
          <div className="flex items-center gap-4 pt-2">
            <button className="relative text-primary-700 text-2xl">
              🔔
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] rounded-full px-1">
                1
              </span>
            </button>
            <img
              src="/profile.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
