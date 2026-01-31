import { useQuery } from "@tanstack/react-query";
import { getAllProductAction } from "../actions/get-all-service.action";

export const useProductQuery = () => {
  const getAllProductQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductAction,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { getAllProductQuery };
};
