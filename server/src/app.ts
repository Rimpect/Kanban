import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { boardRoutes } from "./modules/board/board.routes";
import { cardRoutes } from "./modules/card/card.routes";
import { columnRoutes } from "./modules/column/column.routes";
import { tagRoutes } from "./modules/tag/tag.routes";

const app = new Hono();
app.use("*", cors({ origin: "http://localhost:3001" }));
app.use(logger());
app.onError((err, c) => {
  console.error(err);
  return c.json({ message: "Internal Server Error" }, 500);
});
const routes = app
  .route("/boards", boardRoutes)
  .route("/columns", columnRoutes)
  .route("/cards", cardRoutes)
  .route("/tags", tagRoutes);
export type AppType = typeof routes;
export { app };
