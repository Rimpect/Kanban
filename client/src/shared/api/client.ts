import { hc } from "hono/client";
import type { AppType } from "@kanban/server";

export const client = hc<AppType>("http://localhost:3000");

