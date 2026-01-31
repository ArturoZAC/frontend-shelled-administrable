import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAction } from "../actions/delete-banner.action";

export const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => deleteProductAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    deleteProductMutation,
  };
};
