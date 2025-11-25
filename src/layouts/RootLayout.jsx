import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header className="p-4 shadow">
        <nav className="container mx-auto flex items-center justify-between">
          <div>
            <Link to="/" className="font-bold text-xl">
              Warung Alzhim
            </Link>
          </div>
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/products/1">Sample Product</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-sm">© Warung Alzhim</footer>
    </>
  );
}
