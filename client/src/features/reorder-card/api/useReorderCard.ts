import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@shared/api/client";

export const useReorderCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, position }: { id: string; position: number }) => {
      const res = await client.cards[":id"].$patch({
        param: { id },
        json: { position },
      });
      if (!res.ok) throw new Error("Failed to reorder card");
      return res.json();
    },
    onSuccess: (updatedCard) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", updatedCard.columnId],
      });
    },
  });
};
 