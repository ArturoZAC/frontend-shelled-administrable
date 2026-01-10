import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Service } from "../interfaces/service.interface";
import { getEnvs } from "@/helpers/getEnvs";
import { useServiceDeleteMutation } from "../hooks/useServiceDeleteMutation";
import { toast } from "sonner";

interface ServiceCardProps {
  service: Service;
}

const { VITE_API_URL_BASE } = getEnvs();

const normalizeHtml = (html: string) => {
  return html.replace(/&nbsp;/g, " ").replace(/<p>\s*<\/p>/g, "");
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  const fullImageUrl = `${VITE_API_URL_BASE}/${service.image}`;

  const { deleteServiceMutation } = useServiceDeleteMutation();

  const handleDelete = () => {
    deleteServiceMutation.mutate(+service.id, {
      onSuccess: () => {
        toast.success("Servicio eliminado correctamente");
      },
      onError: () => {
        toast.error("Error al eliminar el servicio");
      },
    });
  };

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in bg-card border-border group py-0 gap-2">
      {/* Imagen */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={fullImageUrl}
          alt={service.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Header (solo si quieres título + algo extra) */}
      <CardHeader className="pb-0 grid-cols-none grid-rows-none">
        <h3 className="text-lg font-semibold text-card-foreground">{service.title}</h3>
      </CardHeader>

      <CardContent className="px-3 py-3 h-16">
        <div
          className="
      text-gray-700
      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4
      [&>li]:mb-2
      [&>strong]:font-semibold
      [&>em]:italic
      text-[13.5px]
      line-clamp-2
      overflow-hidden
    "
          dangerouslySetInnerHTML={{ __html: normalizeHtml(service.description) }}
        />
      </CardContent>

      {/* Footer acciones */}
      <CardFooter className="p-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`edit/${service.id}`)}
          className="flex-1 bg-blue-200 hover:bg-blue-300"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/20 flex-1 ${
            deleteServiceMutation.isPending ? "bg-gray-400 cursor-not-allowed text-white" : ""
          }`}
          onClick={handleDelete}
          disabled={deleteServiceMutation.isPending}
        >
          {/* <Trash2 className="w-4 h-4" />
          Eliminar */}
          {deleteServiceMutation.isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              Eliminando...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              Eliminar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
