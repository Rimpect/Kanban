import { z } from "zod";
import { tagSchema } from "./tag";

export const cardSchema = z.object({
  id: z.uuid(),
  columnId: z.uuid(),
  title: z.string(),
  text: z.string(),
  position: z.float64(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tags: tagSchema.array(),
});

export const createCardSchema = cardSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    tags: true,
  })
  .extend({ tagIds: z.uuid().array().optional() });

export const updateCardSchema = createCardSchema.partial();

export type Card = z.infer<typeof cardSchema>;
export type CreateCardInput = z.infer<typeof createCardSchema>;
export type UpdateCardInput = z.infer<typeof updateCardSchema>;
