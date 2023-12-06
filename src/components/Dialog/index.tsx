'use client';
import { AnimatedDialog } from "./Animated";
import { ContainedDialog } from "./Contained";
import { PrebuiltDialog } from "./Prebuilt";
import { SuspendedDialog } from "./Suspended";
import "./GenericPanel";
import { PropsWithChildren } from "react";
import { ActionsDialog } from "./Actions";
export type GenericDialogPanelProps<T = unknown> = PropsWithChildren<
  {
    title: string;
    description?: string;
  } & T
>;

type StateDialogProps = {
  open: boolean;
  onClose: () => void;
};

export type CustomDialogProps<T = unknown> = GenericDialogPanelProps<
  StateDialogProps & T
>;

export {
  AnimatedDialog,
  ContainedDialog,
  PrebuiltDialog,
  SuspendedDialog,
  ActionsDialog
};
