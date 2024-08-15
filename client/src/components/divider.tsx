import React, { PropsWithChildren } from "react";

export default function Divider({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <span className="bg-gray-200 h-[1px] block w-full" />
      <span>{children}</span>
      <span className="bg-gray-200 h-[1px] block w-full" />
    </div>
  );
}
