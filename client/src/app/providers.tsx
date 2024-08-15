"use client";

import React, { PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SnackbarProvider>
  );
}
