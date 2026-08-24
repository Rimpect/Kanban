import { zValidator } from "@hono/zod-validator";
import { createTagSchema, updateTagSchema } from "@kanban/shared";
import { Hono } from "hono";
import {
  createTag,
  deleteTag,
  getTagById,
  getTags,
  updateTag,
} from "./tag.service";

export const tagRoutes = new Hono()
  .get("/", async (c) => {
    const tags = await getTags();
    return c.json(tags);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const tag = await getTagById(id);
    if (!tag) return c.json({ error: "Not found" }, 404);
    return c.json(tag);
  })

  .post("/", zValidator("json", createTagSchema), async (c) => {
    const data = c.req.valid("json");
    const tag = await createTag(data);
    return c.json(tag, 201);
  })

  .patch("/:id", zValidator("json", updateTagSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const tag = await updateTag(id, data);
    return c.json(tag);
  })

  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const tag = await deleteTag(id);
    return c.json(tag);
  });
