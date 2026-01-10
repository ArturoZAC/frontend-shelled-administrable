import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateServiceAction } from "../actions/update-service.action";

export const useEditServicesMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateServiceAction(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service", id] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      // console.log("Servicio creado correctamente");
    },
  });
};
