"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
