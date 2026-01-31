import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBannerQuery } from "./hooks/useBannerQuery";
import { BannerCard } from "./components/BannerCard";

export const BannersPage = () => {
  const navigate = useNavigate();

  const { getAllBannerQuery } = useBannerQuery();

  const handleNavigateAgregar = () => {
    navigate("add");
  };

  const banners = getAllBannerQuery.data ?? [];

  console.log({ banners });

  if (getAllBannerQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 min-h-screen">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-muted-foreground">Cargando Banners...</p>
      </div>
    );
  }

  if (getAllBannerQuery.isError) {
    return (
      <p className="text-center py-16 text-destructive">
        Error al cargar los Banners:{" "}
        {getAllBannerQuery.error instanceof Error
          ? getAllBannerQuery.error.message
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
              <h1 className="text-2xl font-bold text-foreground">Banners</h1>
              <p className="text-muted-foreground">Gestiona tus Banners disponibles</p>
            </div>
          </div>
          <Button variant="default" onClick={handleNavigateAgregar}>
            <Plus className="w-5 h-5 mr-2" />
            Añadir Banner
          </Button>
        </div>

        {/* banners Grid */}
        {banners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner, index) => (
              <div key={banner.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <BannerCard banner={banner} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay banners</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Comienza añadiendo tu primer banner para mostrarlo aquí.
            </p>
            <Button variant="default" onClick={() => navigate("agregar")}>
              <Plus className="w-5 h-5 mr-2" />
              Añadir Primer Banner
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
