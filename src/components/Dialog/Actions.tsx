import { useCurrentEvent, useOpen } from "@/hooks";
import { ContainedDialog, CustomDialogProps, PrebuiltDialog } from ".";
import { ActionMethods } from "../Itinerary/Actions";
import dialogs from "../Itinerary/Dialogs";
import React, {
  Fragment,
  PropsWithChildren,
  ReactFragment,
  cloneElement
} from "react";

type ActionDialogProps<T extends ActionMethods> = {
  btn: JSX.Element;
  type: T;
};

export function ActionsDialog<T extends ActionMethods>({
  type,
  ...props
}: ActionDialogProps<T>) {
  const currEvent = useCurrentEvent();
  const [isOpen, open, close] = useOpen();

  if (!currEvent) throw new Error("No current event");

  const { title, description, Component } = dialogs[type];

  return (
    <>
      {cloneElement(props.btn, {
        onClick: open
      })}
      {isOpen && (
        <PrebuiltDialog
          title={title}
          description={description}
          open={isOpen}
          onClose={close}
        >
          {Component.length && <Component next={close} />}
        </PrebuiltDialog>
      )}
    </>
  );
}
