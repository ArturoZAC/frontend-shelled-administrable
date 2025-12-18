import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SideBar } from "../components/SideBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { getGreeting } from "@/helpers/getGreeting";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/auth/store/auth.store";

export const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authStatus, user } = useAuthStore();
  const nameFormated = (user?.name ?? "").charAt(0).toUpperCase() + (user?.name ?? "").slice(1);

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

  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex h-screen bg-background">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 flex justify-between items-center">
          <span className="text-lg md:text-xl lg:text-2xl font-semibold">
            {getGreeting()} {nameFormated}
          </span>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors focus:outline-none">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="uppercase font-bold text-lg">
                    {user?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{user?.email}</span>
                {/* <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                /> */}
              </button>
            </DropdownMenuTrigger>

            {/* <DropdownMenuContent align="end" className="w-44 max-w-full">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
