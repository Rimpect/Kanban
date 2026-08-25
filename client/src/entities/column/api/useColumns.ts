import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const useColumns = (boardId: string | undefined) =>
  useQuery({
    queryKey: ["columns", boardId],
    enabled: boardId !== undefined,
    queryFn: async () => {
      if (boardId === undefined) throw new Error("boardId is required");
      const res = await client.columns.$get({ query: { boardId } });
      if (!res.ok) throw new Error("Failed to fetch columns");
      return res.json();
    },
  });
