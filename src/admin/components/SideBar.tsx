import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LogOut } from "lucide-react";

export const SideBar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="w-60 border-r border-border bg-sidebar">
      <div className="p-6 flex flex-col h-full">
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground mb-8 mx-auto text-center">
            Dashboard Panel
          </h1>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground cursor-pointer">
              <LayoutGrid className="w-5 h-5" />
              <span className="font-medium">Servicios</span>
            </div>
          </nav>
        </div>

        <Button
          variant={"destructive"}
          className="flex items-center gap-2 mt-auto"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesion
        </Button>
      </div>
    </div>
  );
};
