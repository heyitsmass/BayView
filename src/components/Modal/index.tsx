"use client";
import { Animator } from "@/components/Animator";
import { PropsWithChildren, cloneElement, useState } from "react";
import AnimationComponent from "../Animations/AnimatePresenceComponent";
import ReactPortal from "../ReactPortal";
import styles from "./modal.module.css";

export type PrebuiltManagedModalProps = {
  btn: JSX.Element;
};

export type ManagedModalProps = PropsWithChildren<{
  btnStyles?: string;
  /** The button to open the modal */
  btn: JSX.Element;
}>;

const useOpen = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return [isOpen, open, close] as const;
};

function ManagedModal({ children, btn }: ManagedModalProps) {
  const [isOpen, open, close] = useOpen();

  return (
    <>
      {cloneElement(btn, { onClick: open })}
      <Modal isOpen={isOpen} close={close}>
        {children}
      </Modal>
    </>
  );
}

function Modal({
  children,
  isOpen,
  close,
}: PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>) {
  const getElem = (
    type: (...args: any) => JSX.Element
  ): JSX.Element | null => {
    return children instanceof Array
      ? children.find((child) => child.type === type)
      : (children as JSX.Element).type === type
      ? children
      : null;
  };

  const Header = getElem(Modal.Header);
  const Body = getElem(Modal.Body);
  const Footer = getElem(Modal.Footer);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="modal-portal">
      <Animator>
        <AnimationComponent className="flex items-center justify-center">
          <div className={styles.modal}>
            {Header}
            {Body}
            <div className={styles.modalFooter}>
              {Footer}
              <button onClick={close}>Close</button>
            </div>
          </div>
        </AnimationComponent>
      </Animator>
    </ReactPortal>
  );
}

type ModalHeaderProps = PropsWithChildren<{
  title: string;
}>;

const Header = ({ title, children }: ModalHeaderProps) => {
  return (
    <div className={styles.modalHeader}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const Body = ({ children }: PropsWithChildren) => {
  return <div className={styles.modalBody}>{children}</div>;
};

const Footer = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export { Modal, useOpen, ManagedModal };
