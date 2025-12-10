import z from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "El titulo es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  image: z
    .any()
    .refine((file) => file && file.length > 0, {
      message: "La imagen es requerida",
    })
    .refine(
      (file) =>
        file && file.length > 0 && ["image/jpeg", "image/png", "image/webp"].includes(file[0].type),
      {
        message: "Formato no permitido (Solo JPG, PNG o WebP)",
      }
    )
    .refine((file) => file && file.length > 0 && file[0].size <= 4 * 1024 * 1024, {
      message: "La imagen debe pesar menos de 4MB",
    }),
});

export type ServiceForm = z.infer<typeof serviceSchema>;
