"use client";

import { MutableRefObject, useEffect, useRef } from "react";

export const useDropdownRef = (onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

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
};
