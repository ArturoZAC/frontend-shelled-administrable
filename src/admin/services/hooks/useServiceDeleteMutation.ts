import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteServiceAction } from "../actions/delete-service.action";

export const useServiceDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteServiceMutation = useMutation({
    mutationFn: (id: number) => deleteServiceAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  return {
    deleteServiceMutation,
  };
};
