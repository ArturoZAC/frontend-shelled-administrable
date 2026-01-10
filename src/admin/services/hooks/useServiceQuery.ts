import { useQuery } from "@tanstack/react-query";
import { getAllServiceAction } from "../actions/get-all-service.action";

export const useServiceQuery = () => {
  const getAllServiceQuery = useQuery({
    queryKey: ["services"],
    queryFn: getAllServiceAction,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { getAllServiceQuery };
};
