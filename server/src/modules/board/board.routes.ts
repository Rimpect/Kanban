import { zValidator } from "@hono/zod-validator";
import { createBoardSchema, updateBoardSchema } from "@kanban/shared";
import { Hono } from "hono";
import {
  createBoard,
  deleteBoard,
  getBoardById,
  getBoards,
  updateBoard,
} from "./board.service";

export const boardRoutes = new Hono()
  .get("/", async (c) => {
    const boards = await getBoards();
    return c.json(boards);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const board = await getBoardById(id);
    if (!board) return c.json({ error: "Not found" }, 404);
    return c.json(board);
  })

  .post("/", zValidator("json", createBoardSchema), async (c) => {
    const data = c.req.valid("json");
    const board = await createBoard(data);
    return c.json(board, 201);
  })

  .patch("/:id", zValidator("json", updateBoardSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const board = await updateBoard(id, data);
    return c.json(board);
  })

  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const board = await deleteBoard(id);
    return c.json(board);
  });
