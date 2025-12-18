import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const AuthLayout = () => {
  const { authStatus } = useAuthStore();

  console.log({ authStatus });

  if (authStatus === "authenticated") {
    return <Navigate to="/admin" />;
  }

  if (authStatus === "checking") {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-border"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Outlet />
    </div>
  );
};
