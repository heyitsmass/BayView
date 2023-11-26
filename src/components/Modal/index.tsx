"use client";
import { Animator } from "@/components/Animator";
import AnimationComponent from "../Animations/AnimatePresenceComponent";
import ReactPortal from "../ReactPortal";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import styles from "./modal.module.css";

export type OpenUtils = [isOpen: boolean, open: () => void, close: () => void];

export const useOpen = (): OpenUtils => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>;

function Modal({ children }: { children: any; wrapperId?: string }) {
  return (
    <ReactPortal wrapperId="modal-portal">
      <Animator>
        <AnimationComponent className="flex items-center justify-center">
          <div className={styles.modal}>{children}</div>
        </AnimationComponent>
      </Animator>
    </ReactPortal>
  );
}

const Header = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.modalHeader}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalBody}>{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalFooter}>{children}</div>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export { Modal };
