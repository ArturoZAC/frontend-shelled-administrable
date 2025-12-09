import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  //TODO: Validar el token y el authStatus.

  return (
    <div className="flex min-h-screen">
      <Outlet />
    </div>
  );
};
