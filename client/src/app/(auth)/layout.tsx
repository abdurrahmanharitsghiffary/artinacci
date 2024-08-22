import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen w-full"
      style={{
        backgroundImage: "url(/form-image-v18.avif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-1 flex-col w-full py-4 md:py-0 md:w-[50%] justify-center items-center max-h-[100dvh]">
        <div className="bg-[rgba(255,255,255,.5)] w-[90%] max-w-md rounded-lg shadow-md flex-col flex items-center h-[95%] px-4 py-8 overflow-auto hide-scrollbar">
          <h1 className="font-bold">Artinacci</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
