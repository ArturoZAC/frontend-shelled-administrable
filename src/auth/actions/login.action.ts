import authApi from "../api/auth.api";

export const loginAction = async (email: string, password: string) => {
  const payload = {
    email,
    password,
  };

  const { data } = await authApi.post("/login", payload);

  return data;
};
