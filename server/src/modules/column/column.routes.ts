import { zValidator } from "@hono/zod-validator";
import { createColumnSchema, updateColumnSchema } from "@kanban/shared";
import { Hono } from "hono";
import {
  createColumn,
  deleteColumn,
  getColumnById,
  getColumns,
  updateColumn,
} from "./column.service";

export const columnRoutes = new Hono()
  .get("/", async (c) => {
    const boardId = c.req.query("boardId");
    if (!boardId) return c.json({ error: "boardId is required" }, 400);
    const columns = await getColumns(boardId);
    return c.json(columns);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const column = await getColumnById(id);
    if (!column) return c.json({ error: "Not found" }, 404);
    return c.json(column);
  })

  .post("/", zValidator("json", createColumnSchema), async (c) => {
    const data = c.req.valid("json");
    const column = await createColumn(data);
    return c.json(column, 201);
  })

  .patch("/:id", zValidator("json", updateColumnSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const column = await updateColumn(id, data);
    return c.json(column);
  })

  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const column = await deleteColumn(id);
    return c.json(column);
  });
