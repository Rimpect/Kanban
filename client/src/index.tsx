import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@app/styles/reset.css";
import "@app/styles/colors.css";
import "@app/styles/spacing.css";
import "@app/styles/typography.css";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";
import "@app/styles/toast.css";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    // срабатывает при ошибке любой мутации в приложении
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

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
