import adminApi from "@/admin/api/admin.api";

export const createServiceAction = async (formData: FormData) => {
  const { data } = await adminApi.post("/services", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
