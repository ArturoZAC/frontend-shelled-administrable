import adminApi from "@/admin/api/admin.api";
import type { ProductResponse } from "@/admin/products/interfaces/product.interface";

export const getOneProductAction = async (id: number) => {
  const { data } = await adminApi.get<ProductResponse>(`/products/${id}`);

  return data;
};
