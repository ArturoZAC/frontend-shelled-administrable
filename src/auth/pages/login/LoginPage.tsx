import { LoginForm } from "./components/LoginForm";
import { ImagenLogin } from "./ui/ImagenLogin";

export const LoginPage = () => {
  return (
    <>
      <div className="w-1/2 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md px-8 py-12 rounded-xl bg-linear-to-r from-zinc-400/10 to-zinc-300/10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
          <p className="text-muted-foreground mb-8">Inicia sesión en tu cuenta administrativa</p>

          <LoginForm />

          {/* <p className="text-xs text-muted-foreground mt-6 text-center">
            Credenciales de prueba: admin@example.com / password123
          </p> */}
        </div>
      </div>
      <ImagenLogin />
    </>
  );
};
