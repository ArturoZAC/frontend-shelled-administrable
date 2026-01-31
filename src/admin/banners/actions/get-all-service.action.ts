import adminApi from "@/admin/api/admin.api";
import type { BannerResponse } from "../interfaces/banner.interface";

export const getAllBannerAction = async () => {
  const { data } = await adminApi.get<BannerResponse[]>("/banners");
  return data;
};
