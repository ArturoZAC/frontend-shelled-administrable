import adminApi from "@/admin/api/admin.api";
import type { ProductResponse } from "../interfaces/product.interface";

export const getAllProductAction = async () => {
  const { data } = await adminApi.get<ProductResponse[]>("/products");
  return data;
};
