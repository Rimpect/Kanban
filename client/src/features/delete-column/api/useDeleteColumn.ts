import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@shared/api/client";

export const useDeleteColumn = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.columns[":id"].$delete({ param: { id } });
      if (!res.ok) throw new Error("Failed to delete column");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
