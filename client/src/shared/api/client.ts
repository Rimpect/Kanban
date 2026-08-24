import type { AppType } from "@kanban/server";
import { hc } from "hono/client";

export const client = hc<AppType>("http://localhost:3000");
