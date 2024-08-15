import { Metadata } from "next";
import React from "react";
import ContentList from "./content-list";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | ArtiNacci",
};

export default async function HomePage() {
  return (
    <>
      <Link href="/plans">Upgrade Plans</Link>
      <ContentList />
    </>
  );
}
