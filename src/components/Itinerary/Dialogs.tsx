"use client";

import { useCurrentEvent } from "@/hooks";
import { PrebuiltDialogProps, SuspenedDialog } from "../Dialog";

import { ActionMethods } from "./Actions";
import dialogs from "./components";
import { Loading } from "../Loading";

function ActionsDialog<T extends ActionMethods>({
  type,
  ...props
}: PrebuiltDialogProps<T>) {
  const currEvent = useCurrentEvent();

  if (!currEvent) throw new Error("No current event");

  const { Component } = dialogs[type] || {
    Component: {
      title: "Loading...",
      description: "Loading...",
      Component: Loading
    }
  };

  return (
    <SuspenedDialog {...props} {...dialogs[type]}>
      <Component />
    </SuspenedDialog>
  );
}

export { ActionsDialog };
