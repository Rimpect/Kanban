import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateColumnInput } from "@kanban/shared";
import { client } from "@shared/api/client";

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<CreateColumnInput, "boardId">) => {
      const res = await client.columns.$post({
        json: { ...input, boardId },
      });
      if (!res.ok) throw new Error("Failed to create column");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
