import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function SellerLayout() {
return (
<div className="flex min-h-screen font-poppins bg-neutral-100">
{/* Sidebar selalu tampil */}
<Sidebar />


{/* Konten halaman sesuai route */}
<main className="flex-1 p-4">
<Outlet />
</main>
</div>
);
}