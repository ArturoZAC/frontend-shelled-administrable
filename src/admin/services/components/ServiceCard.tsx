import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Service } from "../interfaces/service.interface";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in bg-card border-border group py-0 gap-2">
      {/* Imagen */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Header (solo si quieres título + algo extra) */}
      <CardHeader className="pb-0 grid-cols-none grid-rows-none">
        <h3 className="text-lg font-semibold text-card-foreground">{service.title}</h3>
      </CardHeader>

      {/* Contenido */}
      <CardContent className="px-3 py-3">
        <p className="text-sm text-muted-foreground line-clamp-2 h-12">{service.description}</p>
      </CardContent>

      {/* Footer acciones */}
      <CardFooter className="p-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/dashboard/edit/${service.id}`)}
          className="flex-1 bg-blue-200 hover:bg-blue-300"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/20 flex-1"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};
