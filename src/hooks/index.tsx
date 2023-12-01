import {
  useHomepage,
  useHomepageDispatch,
  useHomepageManager
} from "./useHomepage";

import { useCurrentEvent, useCurrentEventDispatch } from "./useCurrentEvent";

import { useGetData } from "./useGetData";
import { useState } from "react";

import { useGeocoder } from "./useGeocoder";

const useOpen = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return [isOpen, open, close] as const;
};


export {
  useHomepage,
  useHomepageDispatch,
  useHomepageManager,
  useCurrentEvent,
  useCurrentEventDispatch,
  useGetData,
  useOpen,
  useGeocoder
};
