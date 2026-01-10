import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./components/ServiceCard";
import { useServiceQuery } from "./hooks/useServiceQuery";

export const ServicesPage = () => {
  const navigate = useNavigate();

  const { getAllServiceQuery } = useServiceQuery();

  const handleNavigateAgregar = () => {
    navigate("add");
  };

  const services = getAllServiceQuery.data ?? [];

  if (getAllServiceQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 min-h-screen">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-muted-foreground">Cargando servicios...</p>
      </div>
    );
  }

  if (getAllServiceQuery.isError) {
    return (
      <p className="text-center py-16 text-destructive">
        Error al cargar los servicios:{" "}
        {getAllServiceQuery.error instanceof Error
          ? getAllServiceQuery.error.message
          : "Algo salió mal"}
      </p>
    );
  }

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
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
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
