import adminApi from "@/admin/api/admin.api";
import type { ServiceResponse } from "../interfaces/service.interface";

export const getAllServiceAction = async () => {
  const { data } = await adminApi.get<ServiceResponse[]>("/services");
  return data;
};
