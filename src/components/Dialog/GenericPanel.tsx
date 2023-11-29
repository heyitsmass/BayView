import { Dialog } from "@headlessui/react";
import { GenericDialogPanelProps } from ".";
import styles from "./styles.module.css";

export const GenericDialogPanel = ({
  title,
  description,
  children
}: GenericDialogPanelProps) => {
  return (
    <Dialog.Panel className={styles.generic_dialog_panel}>
      <Dialog.Title className={styles.dialog_title}>{title}</Dialog.Title>
      {description && (
        <Dialog.Description className={styles.dialog_description}>
          {description}
        </Dialog.Description>
      )}
      {children || (
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      )}
    </Dialog.Panel>
  );
};
