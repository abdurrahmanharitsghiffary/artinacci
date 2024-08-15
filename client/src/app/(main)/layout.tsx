import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-center gap-4 p-4">{children}</div>;
}
