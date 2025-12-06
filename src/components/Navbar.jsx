import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import {
  FiSearch,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiList,
  FiLogOut,
} from "react-icons/fi";
import NotificationPopup from "./NotificationPopUp";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import useNotificationStore from "../stores/useNotificationStore";
import useCartStore from "../stores/useCartStore";
import useAuthStore from "../stores/useAuthStore";

export default function Navbar() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpenDesktop, setIsPopupOpenDesktop] = useState(false);
  const [isPopupOpenMobile, setIsPopupOpenMobile] = useState(false);
  const [isProfileDropdownDesktop, setIsProfileDropdownDesktop] = useState(false);
  const [isProfileDropdownMobile, setIsProfileDropdownMobile] = useState(false);

  const navigate = useNavigate();
  const bellRefDesktop = useRef(null);
  const bellRefMobile = useRef(null);
  const profileRefDesktop = useRef(null);
  const profileRefMobile = useRef(null);

  // AUTH STORE - DYNAMIC LOGIN STATE
  const { user, token, logout, fetchProfile, loadFromStorage } = useAuthStore();
  const isLoggedIn = !!token || !!user;

  // CART STORE - DYNAMIC
  const { cartItems, fetchCart } = useCartStore();
  const cartCount = cartItems.length;

  // NOTIFICATIONS STORE
  const { notifications, fetchNotifications, readNotification } = useNotificationStore();

  // Load dari localStorage saat pertama kali mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    // Cek token di localStorage saat mount
    const savedToken = localStorage.getItem("token");
    if (savedToken && !user) {
      fetchProfile(); // Fetch user data jika token ada tapi user belum di-load
    }

    if (isLoggedIn) {
      fetchNotifications();
      fetchCart();
    }
  }, [isLoggedIn, user, fetchProfile, fetchNotifications, fetchCart]);

  // CLOSE POPUPS (DESKTOP)
  useEffect(() => {
    const handler = (e) => {
      if (bellRefDesktop.current && !bellRefDesktop.current.contains(e.target)) {
        setIsPopupOpenDesktop(false);
      }
      if (profileRefDesktop.current && !profileRefDesktop.current.contains(e.target)) {
        setIsProfileDropdownDesktop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // CLOSE POPUPS (MOBILE)
  useEffect(() => {
    const handler = (e) => {
      if (bellRefMobile.current && !bellRefMobile.current.contains(e.target)) {
        setIsPopupOpenMobile(false);
      }
      if (profileRefMobile.current && !profileRefMobile.current.contains(e.target)) {
        setIsProfileDropdownMobile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== "") navigate(`/search?q=${encodeURIComponent(val)}`);
    else navigate("/");
  };

  const handleLogout = () => {
    logout(); // Panggil logout dari store
    setShowLogoutModal(false);
    navigate("/login");
  };

  const ProfileMenu = () => (
    <div className="absolute bg-white shadow-md rounded-lg border border-neutral-200 w-52 py-2 right-0 top-12 z-50">
      <div className="px-4 py-2 border-b border-neutral-200">
        <p className="text-sm font-semibold text-neutral-900 truncate">
          {user?.name || "Pengguna"}
        </p>
        <p className="text-xs text-neutral-600 truncate">
          {user?.email || "email@example.com"}
        </p>
      </div>
      <Link
        to="/profil"
        className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 text-sm"
        onClick={() => {
          setIsProfileDropdownDesktop(false);
          setIsProfileDropdownMobile(false);
        }}
      >
        <FiUser size={18} />
        <span>Profil</span>
      </Link>
      <Link
        to="/my-order"
        className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 text-sm"
        onClick={() => {
          setIsProfileDropdownDesktop(false);
          setIsProfileDropdownMobile(false);
        }}
      >
        <FiList size={18} />
        <span>Pesanan Saya</span>
      </Link>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-neutral-100 text-sm text-red-600"
      >
        <FiLogOut size={18} />
        <span>Keluar</span>
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 px-4 lg:px-12">
        <div className="w-full flex items-center justify-between gap-4 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo-web-warung-alzhim.png"
              alt="Warung Alzhim"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="font-bold text-xl sm:text-2xl text-primary-500 hidden sm:flex whitespace-nowrap">
              WARUNG ALZHIM
            </span>
          </Link>

          {/* SEARCH BAR */}
          <div className={`flex ${isLoggedIn ? "flex-1 max-w-xl mx-3" : "flex-1 max-w-2xl mx-2"}`}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari Produk...."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-primary-500"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
            </div>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden sm:flex items-center gap-6 shrink-0">
            {!isLoggedIn ? (
              <>
                <Link to="/register">
                  <Button variant="soft" size="md">Daftar</Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" size="md">Masuk</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative text-primary-700 text-2xl pt-2">
                  <FiShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold mt-1">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* BELL DESKTOP */}
                <div ref={bellRefDesktop} className="relative flex items-center pt-2">
                  <button
                    onClick={() => setIsPopupOpenDesktop((prev) => !prev)}
                    className="text-primary-700 text-2xl hover:opacity-70"
                  >
                    <FiBell />
                  </button>
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold mt-1">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                  {isPopupOpenDesktop && (
                    <NotificationPopup
                      notifications={notifications}
                      onClose={() => setIsPopupOpenDesktop(false)}
                      dropdown
                      onRead={readNotification}
                    />
                  )}
                </div>

                {/* PROFILE DESKTOP */}
                <div ref={profileRefDesktop} className="relative">
                  <img
                    src={
                      user?.profileImage
                        ? `${API_URL}/public/user_profile/${user.profileImage}`
                        : "/avatar.png"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover cursor-pointer border-2 border-neutral-200"
                    onClick={() => setIsProfileDropdownDesktop((prev) => !prev)}
                  />
                  {isProfileDropdownDesktop && <ProfileMenu />}
                </div>
              </>
            )}
          </div>

          {/* MOBILE RIGHT */}
          <div className="flex sm:hidden items-center gap-4 shrink-0">
            {isLoggedIn ? (
              <>
                <Link to="/cart" className="relative text-primary-700 text-xl flex items-center p-1 mt-2">
                  <FiShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div ref={bellRefMobile} className="relative flex items-center">
                  <button
                    onClick={() => setIsPopupOpenMobile((prev) => !prev)}
                    className="text-primary-700 text-xl flex items-center p-1 mt-2"
                  >
                    <FiBell />
                  </button>
                  {notifications.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold mt-2">
                      {notifications.length}
                    </span>
                  )}
                  {isPopupOpenMobile && (
                    <NotificationPopup
                      notifications={notifications}
                      onClose={() => setIsPopupOpenMobile(false)}
                      dropdown
                      mobileOffset
                      onRead={readNotification}
                    />
                  )}
                </div>

                {/* PROFILE MOBILE */}
                <div ref={profileRefMobile} className="relative flex items-center">
                  <img
                    src={user?.avatar || "/avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-neutral-200"
                    onClick={() => setIsProfileDropdownMobile((prev) => !prev)}
                  />
                  {isProfileDropdownMobile && <ProfileMenu />}
                </div>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button size="sm" variant="soft">Daftar</Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" variant="primary">Masuk</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}