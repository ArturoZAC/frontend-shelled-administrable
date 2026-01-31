import { useQuery } from "@tanstack/react-query";
import { getAllBannerAction } from "../actions/get-all-service.action";

export const useBannerQuery = () => {
  const getAllBannerQuery = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBannerAction,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { getAllBannerQuery };
};
