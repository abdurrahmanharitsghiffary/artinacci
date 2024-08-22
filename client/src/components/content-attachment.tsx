import React from "react";
import { Card } from "react-bootstrap";

export interface ContentAttachmentProps {
  content: any;
}

export default function ContentAttachment({ content }: ContentAttachmentProps) {
  const attachment = content?.attachments?.[0];

  const isYoutubeVideo =
    attachment.includes("youtube") || attachment.includes("youtu.be");

  if (content?.type === "ARTICLE")
    return <Card.Img variant="top" src={attachment} />;
  if (isYoutubeVideo) return <iframe src={attachment}></iframe>;

  return (
    <video controls>
      <source src={attachment} />
    </video>
  );
}
