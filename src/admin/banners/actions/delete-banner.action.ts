import adminApi from "@/admin/api/admin.api";
import type { BannerResponse } from "../interfaces/banner.interface";

export const deleteBannerAction = async (id: number) => {
  const { data } = await adminApi.post<BannerResponse[]>(`/banners-delete/${id}`);
  return data;
};
