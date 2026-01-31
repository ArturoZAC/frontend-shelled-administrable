import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBannerAction } from "../actions/update-banner.action";

export const useEditBannersMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateBannerAction(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner", id] });
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      // console.log("Servicio creado correctamente");
    },
  });
};
