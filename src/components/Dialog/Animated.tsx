import { Transition } from "@headlessui/react";
import { CustomDialogProps, PrebuiltDialog } from ".";
import { Fragment } from "react";

export const AnimatedDialog = ({ ...props }: CustomDialogProps) => {
  const { open, children } = props;

  return (
    <Transition
      show={open}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-75 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <PrebuiltDialog {...props}>{children}</PrebuiltDialog>
    </Transition>
  );
};
