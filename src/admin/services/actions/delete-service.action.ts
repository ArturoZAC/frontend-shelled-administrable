import adminApi from "@/admin/api/admin.api";
import type { ServiceResponse } from "../interfaces/service.interface";

export const deleteServiceAction = async (id: number) => {
  const { data } = await adminApi.post<ServiceResponse[]>(`/services-delete/${id}`);
  return data;
};
