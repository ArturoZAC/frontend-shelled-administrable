import axios from "axios";
import { getEnvs } from "@/helpers/getEnvs";
import { useAuthStore } from "../store/auth.store";

const { VITE_API_URL } = getEnvs();

const authApi = axios.create({
  baseURL: `${VITE_API_URL}`,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authApi;
