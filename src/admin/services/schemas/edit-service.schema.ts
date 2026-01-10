import z from "zod";

export const editServiceSchema = z.object({
  title: z.string().min(1, "El titulo es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  image: z
    .custom<File>((file) => file instanceof File, { message: "La imagen es requerida" })
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
      message: "Formato no permitido (Solo JPG, PNG o WebP)",
    })
    .refine((file) => file.size <= 4 * 1024 * 1024, {
      message: "La imagen debe pesar menos de 4MB",
    })
    .optional(),
});

export type EditServiceForm = z.infer<typeof editServiceSchema>;
