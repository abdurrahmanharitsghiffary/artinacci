"use client";
import { useGetContents } from "@/hooks/api/get-contents";
import React from "react";
import Content from "./content";

export default function ContentList() {
  const { data, isError } = useGetContents();

  const articles = data?.data?.articles ?? [];
  const videos = data?.data?.videos ?? [];

  if (isError) return null;

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <section>
        <h2>Articles ({articles?.length})</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((content: any) => (
            <Content content={content} key={content?.id} />
          ))}
        </div>
      </section>
      <section>
        <h2>Videos ({videos?.length})</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((content: any) => (
            <Content content={content} key={content?.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
