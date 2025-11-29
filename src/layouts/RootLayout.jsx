import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";
import Footer from "../components/Footer";

export default function RootLayout() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <Navbar onLogoutClick={() => setLogoutModalOpen(true)} />

      <div className="min-h-screen bg-neutral-100">
        <main className="px-4 md:px-6 lg:px-8 xl:px-18">
          <Outlet />
        </main>
        <Footer />
      </div>

      {logoutModalOpen && (
        <LogoutConfirmationModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={() => {
            setLogoutModalOpen(false);
            // tambahkan aksi logout di sini, misal hapus token, redirect, dll
          }}
        />
      )}
    </>
  );
}
