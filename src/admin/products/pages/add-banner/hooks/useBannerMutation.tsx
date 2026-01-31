import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductAction } from "../actions/create-product.action";

export const useProductsMutation = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (formData: FormData) => createProductAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProductMutation };
};
