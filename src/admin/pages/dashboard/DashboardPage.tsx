import { useNavigate } from "react-router-dom";
import { Briefcase, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ServiceCard } from "./components/ServiceCard";

import type { Service } from "./interfaces/service.interface";

const initialServices: Service[] = [
  {
    id: "1",
    title: "Desarrollo Web",
    description: "Creación de sitios web modernos y responsivos con las últimas tecnologías.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Diseño UI/UX",
    description: "Diseño de interfaces intuitivas centradas en la experiencia del usuario.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Consultoría Tech",
    description: "Asesoramiento estratégico para transformación digital de empresas.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
  },
];

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigateAgregar = () => {
    navigate("/admin/agregar");
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-7xlxl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
              <p className="text-muted-foreground">Gestiona tus servicios disponibles</p>
            </div>
          </div>
          <Button variant="default" onClick={handleNavigateAgregar}>
            <Plus className="w-5 h-5 mr-2" />
            Añadir Servicio
          </Button>
        </div>

        {/* Services Grid */}
        {initialServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialServices.map((service, index) => (
              <div key={service.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay servicios</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Comienza añadiendo tu primer servicio para mostrarlo aquí.
            </p>
            <Button variant="default" onClick={() => navigate("agregar")}>
              <Plus className="w-5 h-5 mr-2" />
              Añadir Primer Servicio
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
