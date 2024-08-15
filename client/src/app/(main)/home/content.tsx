import React from "react";
import Card from "react-bootstrap/Card";

export default function Content({ content }: { content: any }) {
  const attachment = content?.attachments?.[0];

  const isYoutubeVideo =
    attachment.includes("youtube") || attachment.includes("youtu.be");

  return (
    <Card>
      {content?.type === "ARTICLE" ? (
        <Card.Img variant="top" src={content?.attachments?.[0]} />
      ) : isYoutubeVideo ? (
        <iframe src={attachment}></iframe>
      ) : (
        <video controls>
          <source src={attachment} />
        </video>
      )}

      <Card.Body>
        <Card.Title className="font-semibold">{content?.title}</Card.Title>
        <Card.Text>{content?.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
