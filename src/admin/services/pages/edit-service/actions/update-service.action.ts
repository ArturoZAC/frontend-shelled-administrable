import adminApi from "@/admin/api/admin.api";

export const updateServiceAction = async (formData: FormData, id: number) => {
  const { data } = await adminApi.post(`/services-update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
