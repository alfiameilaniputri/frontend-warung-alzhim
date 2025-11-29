import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

export default function Sidebar() {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const links = [
    { label: "Laporan Penjualan", path: "/seller/sales-report" },
    { 
      label: "Pesanan Online", 
      path: "/seller/order-online", 
      badge: 3 // Dummy data: 3 pesanan online baru
    },
    { label: "Transaksi Offline", path: "/seller/transaction-offline" },
    { label: "Kelola Produk", path: "/seller/manage-products" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ==================== MOBILE NAVBAR (Always Visible) ==================== */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-300 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -ml-2 text-neutral-700"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-green-700 font-extrabold text-xl tracking-tight">
          WARUNG ALZHIM
        </h1>
        <div className="w-6"></div>
      </nav>

      {/* Spacer for fixed navbar - Prevents content from being hidden */}
      <div className="md:hidden h-[57px]"></div>

      {/* ==================== MOBILE OVERLAY ==================== */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ==================== MOBILE SIDEBAR ==================== */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 w-80 bg-[#F7F9F7] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Mobile Sidebar */}
        <div className="shrink-0 p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-green-700 font-extrabold text-2xl leading-none tracking-tight">
              WARUNG ALZHIM
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-neutral-700 hover:bg-neutral-200 rounded-md -mr-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="border-b border-neutral-300 mt-2"></div>
        </div>

        {/* Navigation Mobile */}
        <div className="flex-1 overflow-y-auto px-6">
          <h2 className="text-neutral-500 font-medium text-sm mb-3">
            Laporan Penjualan
          </h2>
          <nav className="flex flex-col gap-2 text-neutral-700 font-medium">
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-all duration-150
                    ${
                      active
                        ? "bg-green-100 text-green-700"
                        : "hover:bg-neutral-200"
                    }
                  `}
                >
                  <span className="truncate">{link.label}</span>
                  {link.badge && (
                    <span className="shrink-0 w-6 h-6 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowLogoutModal(true);
              }}
              className="flex items-center w-full px-4 py-3 rounded-md text-neutral-700 font-medium hover:bg-neutral-200 text-left"
            >
              <span className="truncate flex-1">Keluar</span>
            </button>
          </nav>
        </div>

        {/* Profile Mobile */}
        <div className="shrink-0 p-6 border-t border-neutral-300 bg-[#F7F9F7]">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <img
                src="/logo-web-warung-alzhim.png"
                alt="Profil"
                className="w-10 h-10"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                Warung Alzhim
              </p>
              <p className="text-xs text-neutral-600 truncate">
                ucansr@gmail.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <aside className="w-64 shrink-0 bg-[#F7F9F7] h-screen border-r border-neutral-300 px-5 py-6 hidden md:flex md:flex-col justify-between sticky top-0">
        <div>
          <h1 className="text-green-700 font-extrabold text-2xl leading-none whitespace-nowrap tracking-tight text-center">
            WARUNG ALZHIM
          </h1>
          <div className="border-b border-neutral-300 mt-2 mb-5" />
          <nav className="flex flex-col gap-2 text-neutral-700 font-medium">
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-all duration-150
                    ${
                      active
                        ? "bg-green-100 text-green-700"
                        : "hover:bg-neutral-200"
                    }
                  `}
                >
                  <span className="truncate">{link.label}</span>
                  {link.badge && (
                    <span className="shrink-0 w-5 h-5 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center ml-2">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center w-full px-4 py-2 rounded-md text-neutral-700 font-medium hover:bg-neutral-200 text-left"
            >
              <span className="truncate flex-1">Keluar</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-300">
          <div className="shrink-0">
            <img
              src="/logo-web-warung-alzhim.png"
              alt="Profil"
              className="w-8 h-8"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-neutral-900 truncate">
              Warung Alzhim
            </p>
            <p className="text-xs text-neutral-600 truncate">
              ucansr@gmail.com
            </p>
          </div>
        </div>
      </aside>

      {/* ==================== LOGOUT MODAL ==================== */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          localStorage.clear();
          setShowLogoutModal(false);
          window.location.href = "/login";
        }}
      />
    </>
  );
}