import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCardInput } from "@kanban/shared";
import { client } from "@shared/api/client";

export const useCreateCard = (columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<CreateCardInput, "columnId">) => {
      const res = await client.cards.$post({
        json: { ...input, columnId },
      });
      if (!res.ok) throw new Error("Failed to create card");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", columnId] });
    },
  });
};
