import adminApi from "@/admin/api/admin.api";
import type { ServiceResponse } from "@/admin/services/interfaces/service.interface";

export const getOneServiceAction = async (id: number) => {
  const { data } = await adminApi.get<ServiceResponse>(`/services/${id}`);

  return data;
};
