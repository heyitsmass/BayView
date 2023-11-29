"use client";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ReactPortal({
  children,
  wrapperId,
}: {
  children: any;
  wrapperId: string;
}) {
  const [wrapperElement, setWrapperElement] = useState(null as unknown);

  function createAndAppendToBody(wrapperId: string) {
    const elem = document.createElement("div");
    elem.setAttribute("id", wrapperId);
    document.body.appendChild(elem);
    return elem;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);

    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode)
        element.parentNode.removeChild(element);
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement as Element);
}
