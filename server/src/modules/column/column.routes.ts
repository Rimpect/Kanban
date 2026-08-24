import { zValidator } from "@hono/zod-validator";
import { createColumnSchema, updateColumnSchema } from "@kanban/shared";
import { Hono } from "hono";
import { z } from "zod";
import {
  createColumn,
  deleteColumn,
  getColumnById,
  getColumns,
  updateColumn,
} from "./column.service";

const listColumnsQuery = z.object({ boardId: z.uuid() });

export const columnRoutes = new Hono()
  .get("/", zValidator("query", listColumnsQuery), async (c) => {
    const { boardId } = c.req.valid("query");
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
