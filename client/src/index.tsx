import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@app/styles/reset.css";
import "@app/styles/colors.css";
import "@app/styles/spacing.css";
import "@app/styles/typography.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
