import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServiceAction } from "../actions/create-service.action";

export const useServicesMutation = () => {
  const queryClient = useQueryClient();

  const createServiceMutation = useMutation({
    mutationFn: (formData: FormData) => createServiceAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      // console.log("Servicio creado correctamente");
    },
    // onError: (error) => {
    //   console.error("Error creando el servicio:", error);
    // },
  });

  return { createServiceMutation };
};
