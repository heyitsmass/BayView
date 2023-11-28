import { Dialog } from "@headlessui/react";
import { GenericDialogPanelProps } from ".";

export const GenericDialogPanel = ({
  title,
  description,
  children
}: GenericDialogPanelProps) => {
  return (
    <Dialog.Panel>
      <Dialog.Title>{title}</Dialog.Title>
      {description && <Dialog.Description>{description}</Dialog.Description>}
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
