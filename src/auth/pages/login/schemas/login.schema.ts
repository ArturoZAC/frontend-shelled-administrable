import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Correo no valido").nonempty("El correo es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
