import { useQuery } from "@tanstack/react-query";
import { getOneServiceAction } from "../actions/get-one-service.action";

export const useOneServiceQuery = (id: number) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getOneServiceAction(id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
