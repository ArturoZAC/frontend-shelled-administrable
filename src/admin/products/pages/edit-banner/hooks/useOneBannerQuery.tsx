import { useQuery } from "@tanstack/react-query";
import { getOneProductAction } from "../actions/get-one-banner.action";

export const useOneProductQuery = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProductAction(id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
