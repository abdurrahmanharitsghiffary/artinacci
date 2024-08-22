import React, { PropsWithChildren } from "react";
import AppNavbar from "@/components/app-navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center relative">
      <AppNavbar />
      <div className="p-4 flex flex-col items-center gap-4">{children}</div>
    </div>
  );
}
