import { Hono } from "hono";
import { cors } from "hono/cors";
import { boardRoutes } from "./modules/board/board.routes";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", cors({ origin: "http://localhost:3001" }));
app.use(logger());

const routes = app.route("/boards", boardRoutes);
export type AppType = typeof routes;
export { app };
