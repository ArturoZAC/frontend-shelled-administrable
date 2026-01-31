import adminApi from "@/admin/api/admin.api";
import type { BannerResponse } from "@/admin/banners/interfaces/banner.interface";

export const getOneBannerAction = async (id: number) => {
  const { data } = await adminApi.get<BannerResponse>(`/banners/${id}`);

  return data;
};
