import { useCurrentEvent, useOpen } from "@/hooks";
import { PropsWithChildren, cloneElement } from "react";
import { PrebuiltDialog } from ".";

import dialogs from "../Itinerary/Dialogs";
import { ActionMethods } from "../Itinerary/Action/static";

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
          {Component && <Component next={close} />}
        </PrebuiltDialog>
      )}
    </>
  );
}
