import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTagInput } from "@kanban/shared";
import { client } from "@shared/api/client";

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTagInput) => {
      const res = await client.tags.$post({
        json: input,
      });
      if (!res.ok) throw new Error("Failed to create tag");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
