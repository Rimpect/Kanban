import { z } from "zod";

export const columnSchema = z.object({
  id: z.uuid(),
  boardId: z.string(),
  name: z.string().min(3),
  position: z.float64(),
});

export const createColumnSchema = columnSchema.omit({
  id: true,
});

export const updateColumnSchema = createColumnSchema.partial();

export type Column = z.infer<typeof columnSchema>;
export type CreateColumnInput = z.infer<typeof createColumnSchema>;
export type UpdateColumnInput = z.infer<typeof updateColumnSchema>;
