import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Artinacci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={poppins.className}>
          <main className="min-h-[100dvh] w-full">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
