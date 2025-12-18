import { useEffect, useState } from "react";
import { useAuthStore } from "./auth/store/auth.store";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const AppShelled = () => {
  const renewToken = useAuthStore((state) => state.renewToken);
  const authStatus = useAuthStore((state) => state.authStatus);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await renewToken();
      setIsReady(true);
    };
    init();
  }, [renewToken]);

  if (!isReady || authStatus === "checking")
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

  return <RouterProvider router={AppRouter} />;
};
