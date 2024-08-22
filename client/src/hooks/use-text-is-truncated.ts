"use client";

import { RefObject, useEffect, useState } from "react";

export const useTextIsTruncated = (ref: RefObject<HTMLParagraphElement>) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    console.log(element, "Element");
    if (!element) return;

    setIsTruncated(element.offsetHeight < element.scrollHeight);
  }, [ref]);

  return isTruncated;
};
