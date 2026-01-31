import { createBrowserRouter, Navigate } from "react-router-dom";

//AdminPages
import { AdminLayout } from "@/admin/layouts/AdminLayout";

//AuthPages
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/login/LoginPage";

import { ServicesPage } from "@/admin/services/ServicesPage";
import { AddServicePage } from "@/admin/services/pages/add-service/AddServicePage";
import { EditServicePage } from "@/admin/services/pages/edit-service/EditServicePage";
import { BannersPage } from "@/admin/banners/BannersPage";
import { AddBannerPage } from "@/admin/banners/pages/add-banner/AddBannerPage";
import { EditBannerPage } from "@/admin/banners/pages/edit-banner/EditBannerPage";
import { ProductsPage } from "@/admin/products/ProductsPage";
import { AddProductsPage } from "@/admin/products/pages/add-banner/AddProductsPage";
import { EditProductsPage } from "@/admin/products/pages/edit-banner/EditProductsPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "services",
        children: [
          { index: true, element: <ServicesPage /> },
          { path: "add", element: <AddServicePage /> },
          { path: "edit/:idService", element: <EditServicePage /> },
        ],
      },
      {
        path: "banners",
        children: [
          { index: true, element: <BannersPage /> },
          { path: "add", element: <AddBannerPage /> },
          { path: "edit/:idBanner", element: <EditBannerPage /> },
        ],
      },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: "add", element: <AddProductsPage /> },
          { path: "edit/:idProduct", element: <EditProductsPage /> },
        ],
      },
      { index: true, element: <Navigate to="services" replace /> },
      { path: "*", element: <Navigate to="/admin/services" replace /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
]);
