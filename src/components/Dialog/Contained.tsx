import { useOpen } from "@/hooks";
import { CustomDialogProps, PrebuiltDialog } from ".";
import React from "react";

export const ContainedDialog = ({
  ...props
}: Omit<CustomDialogProps<{ btn: JSX.Element }>, "open" | "onClose">) => {
  const [isOpen, open, close] = useOpen();

  return (
    <>
      {React.cloneElement(props.btn, {
        onClick: open
      })}
      {isOpen && (
        <PrebuiltDialog {...props} open={isOpen} onClose={close} />
      )}
    </>
  );
};
