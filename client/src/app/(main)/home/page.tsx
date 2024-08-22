import { Metadata } from "next";
import React from "react";
import ContentList from "./_components/content-list";

export const metadata: Metadata = {
  title: "Home | Artinacci",
};

export default async function HomePage() {
  return <ContentList />;
}
