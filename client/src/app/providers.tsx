"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.MID_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey!);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SnackbarProvider>
  );
}
