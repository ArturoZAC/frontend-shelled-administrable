import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { type LoginFormValues, loginSchema } from "../schemas/login.schema";
import { useAuthStore } from "@/auth/store/auth.store";
import { toast } from "sonner";

export const LoginForm = () => {
  const { login } = useAuthStore();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    reset();
    const isSuccess = await login(data.email, data.password);

    if (isSuccess) {
      toast.success("Logeado correctamente");
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Correo</label>
        <Input
          type="email"
          placeholder="correo@example.com"
          {...register("email")}
          className="w-full"
        />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contraseña</label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full"
        />
        {errors.password && (
          <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  );
};
