import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";

export const useBoards = () =>
  useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await client.boards.$get();
      return res.json();
    },
  });
