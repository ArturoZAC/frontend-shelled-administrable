import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HeaderComponent } from "@/admin/components/HeaderComponent";
import { serviceSchema, type ServiceForm } from "@/admin/schemas/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill-new";

const AgregarPage = () => {
  const quillModules = {
    toolbar: [["bold", "italic"], [{ list: "bullet" }], ["link"], ["clean"]],
  };

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  const imageError = errors.image?.message;
  const imageErrorMessage = typeof imageError === "string" ? imageError : undefined;

  const onSubmit = (data: ServiceForm) => {
    console.log({ data });
    toast.success("Servicio añadido correctamente");
    navigate("/dashboard");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    setValue("image", e.target.files, { shouldValidate: true });
  };

  const clearImagePreview = () => {
    setImagePreview("");
    URL.revokeObjectURL(imagePreview);
    setValue("image", undefined, { shouldValidate: true });
  };
  return (
    <div className="flex bg-background justify-center items-center">
      <main className="w-full max-w-6xl">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <HeaderComponent
            title="Añadir Nuevo Servicio"
            description="Completa la información del nuevo servicio"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
              {/* TITLE */}
              <div className="space-y-2">
                <Label htmlFor="title">Título del Servicio</Label>
                <Input
                  id="title"
                  placeholder="Ej: Desarrollo de Aplicaciones"
                  {...register("title")}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              {/* DESCRIPTION */}
              {/* <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe detalladamente el servicio..."
                  className="min-h-[90px]"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div> */}

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

              {/* IMAGE */}
              <div className="space-y-4">
                <Label htmlFor="image">Imagen del Servicio</Label>

                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />

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
              <Button type="submit" size="lg" className="flex-1" onClick={() => navigate(-1)}>
                Crear Servicio
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AgregarPage;
