import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import { AppRouter } from "./router/AppRouter";

import "react-quill-new/dist/quill.snow.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { AppShelled } from "./AppShelled";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={AppRouter} /> */}
      <AppShelled />

      <Toaster richColors position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
