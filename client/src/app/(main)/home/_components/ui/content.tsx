"use client";

import ContentAttachment from "@/components/content-attachment";
import { ContentModal } from "@/components/modal/content-modal";
import { useTextIsTruncated } from "@/hooks/use-text-is-truncated";
import { HTMLProps } from "@/types/html-props";
import { forwardRef, PropsWithChildren, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";

type ContentContainerProps = PropsWithChildren & HTMLProps<HTMLDivElement>;
const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(
  (props, ref) => (
    <div className="flex flex-col gap-4 max-w-5xl" {...props} ref={ref} />
  )
);

ContentContainer.displayName = "ContentContainer";

type ContentSectionProps = PropsWithChildren & HTMLProps;
const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  (props, ref) => <section {...props} ref={ref} />
);

ContentSection.displayName = "ContentSection";

type ContentTitleProps = PropsWithChildren & HTMLProps<HTMLHeadingElement>;
const ContentTitle = forwardRef<HTMLHeadingElement, ContentTitleProps>(
  (props, ref) => <h2 {...props} ref={ref} />
);

ContentTitle.displayName = "ContentTitle";

type ContentListProps = PropsWithChildren & HTMLProps<HTMLDivElement>;
const ContentList = forwardRef<HTMLDivElement, ContentListProps>(
  (props, ref) => (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      {...props}
      ref={ref}
    />
  )
);

ContentList.displayName = "ContentList";

type ContentItemProps = { content: any };

const ContentItem = forwardRef<HTMLDivElement, ContentItemProps>(
  ({ content }, ref) => {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);
    const isTruncated = useTextIsTruncated(paragraphRef);

    const handleOpenReadMore = () => {
      setIsShowReadMore(true);
    };

    const handleCloseReadMore = () => {
      setIsShowReadMore(false);
    };

    return (
      <Card ref={ref}>
        <ContentAttachment content={content} />
        <Card.Body>
          <Card.Title className="font-semibold">{content?.title}</Card.Title>
          <Card.Text className="read-more" ref={paragraphRef}>
            {content?.content}
          </Card.Text>
        </Card.Body>
        <div className="p-3 pt-0">
          {isTruncated && (
            <Button onClick={handleOpenReadMore}>Read More</Button>
          )}
        </div>
        <ContentModal
          isOpen={isShowReadMore}
          onClose={handleCloseReadMore}
          content={content}
        />
      </Card>
    );
  }
);
ContentItem.displayName = "ContentItem";

export default function Content({ children }: PropsWithChildren) {
  return <>{children}</>;
}

Content.Item = ContentItem;
Content.Container = ContentContainer;
Content.Section = ContentSection;
Content.Title = ContentTitle;
Content.List = ContentList;
