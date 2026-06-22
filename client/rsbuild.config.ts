import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
import { pluginSass } from "@rsbuild/plugin-sass";
// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  server: {
    port: 3001,
  },
  html: {
    tags: [
      {
        tag: "link",
        attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        },
      },
    ],
  },
});
