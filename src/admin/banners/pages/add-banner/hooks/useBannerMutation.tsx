import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBannerAction } from "../actions/create-banner.action";

export const useBannersMutation = () => {
  const queryClient = useQueryClient();

  const createBannerMutation = useMutation({
    mutationFn: (formData: FormData) => createBannerAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return { createBannerMutation };
};
