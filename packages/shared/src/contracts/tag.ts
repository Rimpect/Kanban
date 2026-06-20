import { z } from "zod";

export const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string().nullable(),
});

export const createTagSchema = tagSchema.omit({
  id: true,
});

export const updateTagSchema = createTagSchema.partial();

export type Tag = z.infer<typeof tagSchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
