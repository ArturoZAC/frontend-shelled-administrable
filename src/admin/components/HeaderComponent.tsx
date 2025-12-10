import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Properties {
  title: string;
  description: string;
}

export const HeaderComponent = ({ title, description }: Properties) => {
  const navigate = useNavigate();

  return (
    <div className="pb-4">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Servicios
      </Button>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {/* <h1 className="text-3xl font-bold text-foreground">Añadir Nuevo Servicio</h1> */}
      <p className="text-muted-foreground mt-2">{description}</p>
      {/* <p className="text-muted-foreground mt-2">Completa la información del nuevo servicio</p> */}
    </div>
  );
};
