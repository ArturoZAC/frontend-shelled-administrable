import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAction } from "../actions/update-banner.action";

export const useEditBannersMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProductAction(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // console.log("Servicio creado correctamente");
    },
  });
};
