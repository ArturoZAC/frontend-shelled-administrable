import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SideBar } from "../components/SideBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getGreeting } from "@/helpers/getGreeting";

const userEmail = "arturoyz2105@gmail.com";
const userName = "admin01";
const nameFormated = userName.charAt(0).toUpperCase() + userName.slice(1);

export const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                    {userName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{userName}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44 max-w-full">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 p-6">{/* Aquí va tu contenido principal */}</div>
      </div>
    </div>
  );
};
