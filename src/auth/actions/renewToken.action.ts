import authApi from "../api/auth.api";

export const renewTokenAction = async () => {
  const { data } = await authApi.get("/renew-token");
  return data;
};
