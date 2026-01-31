import adminApi from "@/admin/api/admin.api";

export const updateBannerAction = async (formData: FormData, id: number) => {
  const { data } = await adminApi.post(`/banners-update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
