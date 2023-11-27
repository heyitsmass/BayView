"use client";
import { Notifiers } from "@/lib/notifier";
import { ManagedModal, Modal, PrebuiltManagedModalProps } from "../Modal";
import { ActionMethods } from "./Actions";
import { PropsWithChildren } from "react";

export type InfoMethods = "map" | "directions" | "weather";

type RequiredPropsWithChildren<T> = PropsWithChildren<Required<T>>;
export type PrebuiltModalPropsWithType<T> = PrebuiltManagedModalProps<{
  type: T;
}>;

type InfoModalProps = PrebuiltModalPropsWithType<InfoMethods>;

function InfoModal({ ...props }: InfoModalProps) {
  const { type } = props;

  const bodies = {
    map: Map,
    directions: Directions,
    weather: Weather,
  } as {
    [P in InfoMethods]: () => JSX.Element;
  };

  const Body = bodies[type];

  return (
    <ManagedModal {...props}>
      <Modal.Header title={props.type} />
      <Modal.Body>
        <Body />
      </Modal.Body>
    </ManagedModal>
  );
}

type WeatherProps = RequiredPropsWithChildren<{}>;

const Weather = ({ ...props }: WeatherProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-center">
        <b>Coming Soon!</b>
      </p>
    </div>
  );
};

type DirectionsProps = RequiredPropsWithChildren<{}>;

const Directions = ({ ...props }: DirectionsProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-center">
        <b>Coming Soon!</b>
      </p>
    </div>
  );
};

type MapProps = RequiredPropsWithChildren<{}>;

const Map = ({ ...props }: MapProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-center">
        <b>Coming Soon!</b>
      </p>
    </div>
  );
};

type NotificationModalProps = PrebuiltModalPropsWithType<Notifiers>;

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

type ShareModalProps = PrebuiltModalPropsWithType<ShareMethods>;

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

type UpdateModalProps = PrebuiltModalPropsWithType<UpdateMethods>;

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

export type ActionModalProps =
  | UpdateModalProps
  | InfoModalProps
  | NotificationModalProps
  | ShareModalProps;

export {
  ManagedModal,
  NotificationModal,
  ShareModal,
  InfoModal,
  UpdateModal,
  Modal,
};
