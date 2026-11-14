import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@shared/api/client";

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.tags[":id"].$delete({ param: { id } });
      if (!res.ok) throw new Error("Failed to delete tag");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
