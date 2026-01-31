import adminApi from "@/admin/api/admin.api";
import type { ProductResponse } from "../interfaces/product.interface";

export const deleteProductAction = async (id: number) => {
  const { data } = await adminApi.post<ProductResponse[]>(`/products-delete/${id}`);
  return data;
};
