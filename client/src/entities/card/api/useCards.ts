import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const useCards = (columnId: string) =>
  useQuery({
    queryKey: ["cards", columnId],
    queryFn: async () => {
      const res = await client.cards.$get({ query: { columnId } });
      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    },
  });
