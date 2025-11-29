import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import SellerLayout from "../layouts/SellerLayout";

// Pages customer
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";
import OrderPage from "../pages/OrderPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import CustomerOrderPage from "../pages/CustomerOrderPage";
import ProfilePage from "../pages/ProfilePage";
import OrderOnlinePage from "../pages/seller/OderOnlinePage";
import OfflineTransactionPage from "../pages/seller/OfflineTransactionPage";
// Pages seller (contoh)
import SalesReportPage from "../pages/seller/SalesReportPage";
import ManageProducts from "../pages/seller/ManageProducts";

// Pages auth
import Register from "../pages/Register";


const router = createBrowserRouter([
  // ===================== CUSTOMER =====================
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "homepage", element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category/:categoryName", element: <CategoryPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "order/:orderId", element: <OrderPage /> },
      { path: "payment/:transactionId", element: <PaymentPage /> },
      { path: "payment/:transactionId/success", element: <PaymentSuccess /> },
      { path: "order", element: <CustomerOrderPage /> },
      { path: "profil", element: <ProfilePage /> },
    ],
  },

  // ===================== AUTH =====================
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ===================== SELLER LAYOUT =====================
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      { index: true, element: <SalesReportPage /> },
      { path: "sales-report", element: <SalesReportPage /> },
      { path: "order-online", element: <OrderOnlinePage /> },
       { path: "transaction-offline", element: <OfflineTransactionPage /> },
       { path: "manage-products", element: <ManageProducts /> },
    ],
  },

  // ===================== NOT FOUND =====================
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
