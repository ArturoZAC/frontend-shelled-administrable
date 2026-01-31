import adminApi from "@/admin/api/admin.api";

export const createProductAction = async (formData: FormData) => {
  const { data } = await adminApi.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
