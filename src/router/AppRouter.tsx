import { createBrowserRouter, Navigate } from "react-router-dom";

//AdminPages
import { AdminLayout } from "@/admin/layouts/AdminLayout";

//AuthPages
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/login/LoginPage";

import { ServicesPage } from "@/admin/services/ServicesPage";
import { AddServicePage } from "@/admin/services/pages/add-service/AddServicePage";
import { EditServicePage } from "@/admin/services/pages/edit-service/EditServicePage";

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
