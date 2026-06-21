import { Hono } from "hono";
import { boardRoutes } from "./modules/board/board.routes";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

const routes = app.route("/boards", boardRoutes);
export type AppType = typeof routes;
export { app };
