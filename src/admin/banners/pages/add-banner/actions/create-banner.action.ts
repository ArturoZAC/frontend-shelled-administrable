import adminApi from "@/admin/api/admin.api";

export const createBannerAction = async (formData: FormData) => {
  const { data } = await adminApi.post("/banners", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
