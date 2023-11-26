"use client";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export function Animator({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
