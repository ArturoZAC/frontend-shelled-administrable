import adminApi from "@/admin/api/admin.api";

export const updateProductAction = async (formData: FormData, id: number) => {
  const { data } = await adminApi.post(`/products-update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
