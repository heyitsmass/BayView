import { Dialog } from "@headlessui/react";
import { CustomDialogProps } from ".";
import { motion } from "framer-motion";
import { GenericDialogPanel } from "./GenericPanel";

export const PrebuiltDialog = ({
  children,
  title,
  description,
  open,
  onClose
}: CustomDialogProps) => {
  return (
    <Dialog
      static
      as={motion.div}
      onClose={onClose}
      open={open}
      style={{
        border: "1px solid white"
      }}
    >
      <GenericDialogPanel title={title} description={description}>
        {children}
      </GenericDialogPanel>
    </Dialog>
  );
};
