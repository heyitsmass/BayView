import { Dialog, Transition } from "@headlessui/react";

import { useOpen } from "@/hooks";
import { motion } from "framer-motion";
import React, { Fragment, PropsWithChildren, Suspense } from "react";
import { Loading } from "../Loading";

export type ContainedDialogProps<T = unknown> = PropsWithChildren<
  {
    btn: JSX.Element;
  } & T
>;

export type PrebuiltDialogProps<T> = ContainedDialogProps<{
  type: T;
}>;

const ContainedDialog = ({ children, ...props }: ContainedDialogProps) => {
  const [isOpen, open, close] = useOpen();

  if (!props.btn) throw new Error("No button provided");

  return (
    <>
      {React.cloneElement(props.btn, {
        onClick: open
      })}

      <Transition
        show={isOpen}
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
          as={motion.div}
          onClose={close}
          open={isOpen}
          style={{
            border: "1px solid white"
          }}
        >
          {children}
        </Dialog>
      </Transition>
    </>
  );
};

type GenericDialogProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const GenericDialog = ({ ...props }: GenericDialogProps) => {
  const { title, description, children } = props;

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

const SuspenedDialog = ({
  children,
  ...props
}: ContainedDialogProps & GenericDialogProps) => {
  return (
    <ContainedDialog {...props}>
      <Suspense fallback={<Loading />}>
        <GenericDialog {...props}>{children}</GenericDialog>
      </Suspense>
    </ContainedDialog>
  );
};

export { ContainedDialog, GenericDialog, SuspenedDialog };
