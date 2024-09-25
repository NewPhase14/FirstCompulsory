import ReactDOM from "react-dom/client";
import "./styles.css";
import React, { StrictMode } from "react";
import "jotai-devtools/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProductCatalog from "./pages/ProductCatalog.tsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx";
import ProductManagementPage from "./pages/ProductManagementPage.tsx";
import * as path from "node:path";
import ProductPage from "./pages/ProductPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/product",
    element: <ProductCatalog />,
  },
  {
    path: "/order",
    element: <OrderHistoryPage />,
  },
  {
    path: "/management",
    element: <ProductManagementPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
