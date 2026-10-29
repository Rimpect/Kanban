import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCardInput } from "@kanban/shared";
import { client } from "@shared/api/client";

export const useUpdateCard = (columnId: string, cardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCardInput) => {
      const res = await client.cards[":id"].$patch({
        param: { id: cardId },
        json: data,
      });
      if (!res.ok) throw new Error("Failed to update card");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", columnId] });
    },
  });
};
