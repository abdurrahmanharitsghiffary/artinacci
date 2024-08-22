"use client";
import { useGetContents } from "@/hooks/api/get-contents";
import React from "react";
import { Spinner } from "react-bootstrap";
import Content from "./ui/content";

export default function ContentList() {
  const { data, isError, isLoading } = useGetContents();

  const articles = data?.data?.articles ?? [];
  const videos = data?.data?.videos ?? [];

  if (isLoading) return <Spinner />;

  if (isError) return null;

  return (
    <Content.Container>
      <Content.Section id="articles">
        <Content.Title>Articles</Content.Title>
        <Content.List>
          {articles.map((content: any) => (
            <Content.Item content={content} key={content?.id} />
          ))}
        </Content.List>
      </Content.Section>
      <Content.Section id="videos">
        <Content.Title>Videos</Content.Title>
        <Content.List>
          {videos.map((content: any) => (
            <Content.Item content={content} key={content?.id} />
          ))}
        </Content.List>
      </Content.Section>
    </Content.Container>
  );
}
