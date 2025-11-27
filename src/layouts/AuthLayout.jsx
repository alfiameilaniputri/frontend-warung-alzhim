import { Outlet, Link } from "react-router-dom";
import Container from "../components/Container";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🛒</span>
            </div>
            <span className="font-bold text-2xl text-primary-700">WARUNG ALZHIM</span>
          </Link>
        </div>
        
        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <Outlet />
        </div>
        
        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-neutral-600 hover:text-primary-500 text-sm transition-colors">
            ← Kembali ke Home
          </Link>
        </div>
      </Container>
    </div>
  );
}