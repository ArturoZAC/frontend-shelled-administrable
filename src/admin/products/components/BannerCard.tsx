import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEnvs } from "@/helpers/getEnvs";
import { toast } from "sonner";
import { type Product } from "../interfaces/product.interface";
import { useProductDeleteMutation } from "../hooks/useProductDeleteMutation";

interface ProductCardProps {
  product: Product;
}

const { VITE_API_URL_BASE } = getEnvs();

const normalizeHtml = (html: string) => {
  return html.replace(/&nbsp;/g, " ").replace(/<p>\s*<\/p>/g, "");
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const fullImageUrl = `${VITE_API_URL_BASE}/${product.image}`;

  const { deleteProductMutation } = useProductDeleteMutation();

  const handleDelete = () => {
    deleteProductMutation.mutate(+product.id, {
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
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Header (solo si quieres título + algo extra) */}
      <CardHeader className="pb-0 grid-cols-none grid-rows-none">
        <h3 className="text-lg font-semibold text-card-foreground">{product.title}</h3>
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
          dangerouslySetInnerHTML={{ __html: normalizeHtml(product.description) }}
        />
      </CardContent>

      {/* Footer acciones */}
      <CardFooter className="p-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`edit/${product.id}`)}
          className="flex-1 bg-blue-200 hover:bg-blue-300"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/20 flex-1 ${
            deleteProductMutation.isPending ? "bg-gray-400 cursor-not-allowed text-white" : ""
          }`}
          onClick={handleDelete}
          disabled={deleteProductMutation.isPending}
        >
          {/* <Trash2 className="w-4 h-4" />
          Eliminar */}
          {deleteProductMutation.isPending ? (
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
