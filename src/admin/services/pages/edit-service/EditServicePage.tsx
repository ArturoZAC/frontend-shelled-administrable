import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
import { ImageIcon, X } from "lucide-react";
import { HeaderComponent } from "@/admin/components/HeaderComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { editServiceSchema, type EditServiceForm } from "../../schemas/edit-service.schema";
import { useOneServiceQuery } from "./hooks/useOneServiceQuery";
import { getEnvs } from "@/helpers/getEnvs";
import { useEditServicesMutation } from "./hooks/useEditServiceMutation";
import { toast } from "sonner";

// import { addServiceSchema, type AddServiceForm } from "../../schemas/add-service.schema";
// import { useServicesMutation } from "./hooks/useServiceMutation";

const { VITE_API_URL_BASE } = getEnvs();

export const EditServicePage = () => {
  const { idService } = useParams();

  useEffect(() => {
    console.log({ idService });
  }, [idService]);

  const quillModules = {
    toolbar: [["bold", "italic"], [{ list: "bullet" }], ["link"], ["clean"]],
  };

  const oneServiceQuery = useOneServiceQuery(+idService!);
  const editMutation = useEditServicesMutation(+idService!);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<EditServiceForm>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (oneServiceQuery.data) {
      reset({
        title: oneServiceQuery.data.title,
        description: oneServiceQuery.data.description,
        image: undefined,
      });

      setTimeout(() => {
        setImagePreview(`${VITE_API_URL_BASE}/${oneServiceQuery.data!.image}`);
      }, 0);
    }
  }, [oneServiceQuery.data, reset]);

  const imageError = errors.image?.message;
  const imageErrorMessage = typeof imageError === "string" ? imageError : undefined;

  const onSubmit = (data: EditServiceForm) => {
    if (!imagePreview) {
      return toast.warning("Debe selecionar una imagen.");
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    editMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Servicio actualizado correctamente");
        navigate("/admin");
      },
      onError: () => {
        toast.error("Error al actualizar el servicio");
      },
    });

    reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  const clearImagePreview = () => {
    URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setValue("image", undefined as unknown as File, { shouldValidate: true });
  };

  if (oneServiceQuery.error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background">
        <p className="text-xl font-semibold text-destructive">Servicio no encontrado</p>
        <p className="text-sm text-muted-foreground">
          Lo sentimos, el servicio que buscas no existe o fue eliminado.
        </p>
        <Button variant="outline" onClick={() => navigate("/admin")} className="mt-4">
          Ir a Servicios
        </Button>
      </div>
    );

  if (!oneServiceQuery.data)
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 min-h-screen">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-muted-foreground">Cargando servicio...</p>
      </div>
    );

  return (
    <div className="flex bg-background justify-center items-center">
      <main className="w-full max-w-6xl">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <HeaderComponent
            title="Editar Servicio"
            description="Completa la información del servicio"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              {/* TITLE */}

              <div className="flex flex-row gap-x-10">
                <div className="flex flex-col gap-y-4 w-1/2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Servicio</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Desarrollo de Aplicaciones"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>

                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          modules={quillModules}
                          placeholder="Describe detalladamente el servicio..."
                          className="bg-white"
                        />
                      )}
                    />

                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </div>
                </div>
                {/* IMAGE */}
                <div className="space-y-2 w-1/2">
                  <Label htmlFor="image">Imagen del Servicio</Label>

                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer text-blue-900 font-bold"
                  />

                  {imageErrorMessage && (
                    <p className="text-sm text-destructive">{imageErrorMessage}</p>
                  )}

                  {/* PREVIEW */}
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border-2 border-primary/20">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="max-w-full max-h-[400px] object-contain"
                        />

                        <button
                          type="button"
                          onClick={clearImagePreview}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/80 text-background flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-xl p-8 bg-muted/50 flex flex-col items-center justify-center h-64">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <ImageIcon className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground/70">
                          Formatos permitidos: JPG, PNG, WebP
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="destructive"
                size="lg"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="lg"
                className={`
    flex-1 flex items-center justify-center gap-2
    ${editMutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""}
  `}
                disabled={editMutation.isPending}
              >
                {editMutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                    Actualizando...
                  </>
                ) : (
                  "Actualizar"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
