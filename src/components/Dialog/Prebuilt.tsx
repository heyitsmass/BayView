import { Dialog, Transition } from "@headlessui/react";
import { CustomDialogProps } from ".";
import { motion } from "framer-motion";
import { GenericDialogPanel } from "./GenericPanel";
import styles from "./styles.module.css";
import { Fragment } from "react";
import { AnimationComponent } from "../Animations/AnimatePresenceComponent";

export const PrebuiltDialog = ({
  children,
  title,
  description,
  open,
  onClose
}: CustomDialogProps) => {
  return (
    <AnimationComponent>
      {open && (
        <Dialog
          static
          className={styles.prebuilt_dialog}
          as={motion.div}
          onClose={onClose}
          open={open}
        >
          <AnimationComponent>
            <GenericDialogPanel title={title} description={description}>
              {children}
            </GenericDialogPanel>
          </AnimationComponent>
        </Dialog>
      )}
    </AnimationComponent>
  );
};
