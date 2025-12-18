import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Correo no valido").nonempty("El correo es requerido"),
  password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
