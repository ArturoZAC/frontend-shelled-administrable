import { createBrowserRouter, Navigate } from "react-router-dom";

//AdminPages
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";

//AuthPages
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/login/LoginPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
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
