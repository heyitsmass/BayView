"use client";
import { Notifiers } from "@/lib/notifier";
import { ManagedModal, Modal, PrebuiltManagedModalProps } from "../Modal";
import { ActionMethods } from "./Actions";

export type InfoMethods = "map" | "directions" | "weather";

type InfoModalProps<T extends InfoMethods = InfoMethods> = {
  type: T;
} & PrebuiltManagedModalProps;

function InfoModal({ ...props }: InfoModalProps) {
  return (
    <ManagedModal {...props}>
      <Modal.Header title={props.type} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      </Modal.Body>
    </ManagedModal>
  );
}

type NotificationModalProps<T extends Notifiers = Notifiers> =
  PrebuiltManagedModalProps & {
    type: T;
  };

function NotificationModal({ ...props }: NotificationModalProps) {
  const { type } = props;

  return (
    <ManagedModal {...props}>
      <Modal.Header title={`Notifications - ${type}`} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      </Modal.Body>
    </ManagedModal>
  );
}

export type ShareMethods = "rss" | "social" | "link";

type ShareModalProps<T extends ShareMethods = ShareMethods> = {
  type: T;
} & PrebuiltManagedModalProps;

function ShareModal({ ...props }: ShareModalProps) {
  const { type } = props;

  return (
    <ManagedModal {...props}>
      <Modal.Header title={`Share - ${type}`} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      </Modal.Body>
    </ManagedModal>
  );
}

export type UpdateMethods = "delete" | "refresh";

type UpdateModalProps<T extends UpdateMethods = UpdateMethods> = {
  type: T;
} & PrebuiltManagedModalProps;

function UpdateModal({ ...props }: UpdateModalProps) {
  const { type } = props;

  return (
    <ManagedModal {...props}>
      <Modal.Header title={`${type}`} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      </Modal.Body>
    </ManagedModal>
  );
}

export type ActionModalProps<T extends ActionMethods = ActionMethods> =
  T extends UpdateMethods
    ? UpdateModalProps
    : T extends InfoMethods
    ? InfoModalProps
    : T extends Notifiers
    ? NotificationModalProps
    : T extends ShareMethods
    ? ShareModalProps
    : never;

export {
  ManagedModal,
  NotificationModal,
  ShareModal,
  InfoModal,
  UpdateModal,
  Modal,
};
