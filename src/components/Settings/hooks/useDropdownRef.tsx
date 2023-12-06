"use client";

import { MutableRefObject, useEffect, useRef } from "react";

export function useDropdownRef<T extends HTMLElement = HTMLElement>(
  onClose: () => void
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  return ref;
}
