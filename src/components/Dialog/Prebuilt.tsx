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
    </Transition>
  );
};
