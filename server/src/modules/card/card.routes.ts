import { zValidator } from "@hono/zod-validator";
import { createCardSchema, updateCardSchema } from "@kanban/shared";
import { Hono } from "hono";
import { z } from "zod";
import {
  createCard,
  deleteCard,
  getCardById,
  getCards,
  updateCard,
} from "./card.service";

const listCardsQuery = z.object({ columnId: z.uuid() });

export const cardRoutes = new Hono()
  .get("/", zValidator("query", listCardsQuery), async (c) => {
    const { columnId } = c.req.valid("query");
    const cards = await getCards(columnId);
    return c.json(cards);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const card = await getCardById(id);
    if (!card) return c.json({ error: "Not found" }, 404);
    return c.json(card);
  })

  .post("/", zValidator("json", createCardSchema), async (c) => {
    const data = c.req.valid("json");
    const card = await createCard(data);
    return c.json(card, 201);
  })

  .patch("/:id", zValidator("json", updateCardSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const card = await updateCard(id, data);
    return c.json(card);
  })

  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const card = await deleteCard(id);
    return c.json(card);
  });
