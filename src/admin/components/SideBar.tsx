import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="w-60 border-r border-border bg-sidebar">
      <div className="p-6 flex flex-col h-full">
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground mb-8 mx-auto text-center">
            Dashboard Panel
          </h1>

          <nav className="space-y-2 flex flex-col gap-y-2">
            <Link to={"/admin/banners"}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground cursor-pointer">
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">Banners</span>
              </div>
            </Link>
            <Link to={"/admin/services"}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground cursor-pointer">
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">
                  <Link to={"/admin/services"}>Servicios</Link>
                </span>
              </div>
            </Link>

            <Link to={"/admin/products"}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground cursor-pointer">
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">
                  <Link to={"/admin/products"}>Productos</Link>
                </span>
              </div>
            </Link>
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
