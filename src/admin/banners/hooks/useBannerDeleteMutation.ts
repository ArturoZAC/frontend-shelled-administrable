import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBannerAction } from "../actions/delete-banner.action";

export const useBannerDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteBannerMutation = useMutation({
    mutationFn: (id: number) => deleteBannerAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return {
    deleteBannerMutation,
  };
};
