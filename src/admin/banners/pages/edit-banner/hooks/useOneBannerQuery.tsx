import { useQuery } from "@tanstack/react-query";
import { getOneBannerAction } from "../actions/get-one-banner.action";

export const useOneBannerQuery = (id: number) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => getOneBannerAction(id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
