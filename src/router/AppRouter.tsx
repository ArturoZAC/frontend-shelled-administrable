import { createBrowserRouter, Navigate } from "react-router-dom";

//AdminPages
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";

//AuthPages
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import AgregarPage from "@/admin/pages/agregar/AgregarPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "agregar",
        element: <AgregarPage />,
      },
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
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
