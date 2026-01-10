import axios from "axios";
import { getEnvs } from "@/helpers/getEnvs";
import { useAuthStore } from "@/auth/store/auth.store";

const { VITE_API_URL } = getEnvs();

const adminApi = axios.create({
  baseURL: `${VITE_API_URL}`,
});

adminApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminApi;
