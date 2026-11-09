import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const useTags = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await client.tags.$get();
      if (!res.ok) throw new Error("Failed to fetch tags");
      return res.json();
    },
  });
