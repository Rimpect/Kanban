import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@shared/api/client";

export const useDeleteCard = (columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.cards[":id"].$delete({ param: { id } });
      if (!res.ok) throw new Error("Failed to delete card");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", columnId] });
    },
  });
};
