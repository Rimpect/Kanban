import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTagInput } from "@kanban/shared";
import { client } from "@shared/api/client";

export const useUpdateTag = (tagId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTagInput) => {
      const res = await client.tags[":id"].$patch({
        param: { id: tagId },
        json: data,
      });
      if (!res.ok) throw new Error("Failed to update tag");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
