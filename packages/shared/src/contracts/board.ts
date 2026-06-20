import { z } from "zod";

export const boardSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createBoardSchema = boardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBoardSchema = createBoardSchema.partial();

export type Board = z.infer<typeof boardSchema>;
export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
