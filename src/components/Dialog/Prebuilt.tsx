import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDialogProps } from ".";
import { AnimationComponent } from "../Animations/AnimatePresenceComponent";
import { GenericDialogPanel } from "./GenericPanel";
import styles from "./styles.module.css";

export const PrebuiltDialog = ({
  children,
  title,
  description,
  open,
  onClose
}: CustomDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <AnimationComponent>
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
        </AnimationComponent>
      )}
    </AnimatePresence>
  );
};
