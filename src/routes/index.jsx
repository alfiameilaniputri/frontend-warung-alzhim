import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage"; // import ProductDetail
import CartPage from "../pages/CartPage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";
import OrderPage from "../pages/OrderPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import CustomerOrder from "../pages/CustomerOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category/:categoryName", element: <CategoryPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "order/:orderId", element: <OrderPage /> },
      { path: "payment/:transactionId", element: <PaymentPage /> },
      { path: "payment/:transactionId/success", element: <PaymentSuccess /> },
      { path: "my-orders", element: <CustomerOrder /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;