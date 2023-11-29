"use client";

import {
  useCurrentEvent,
  useCurrentEventDispatch,
  useHomepageManager
} from "@/hooks";
import { Notifiers } from "@/lib/notifier";
import { PrettyPrint } from "@/utils/PrettyPrint";
import { PropsWithChildren, Suspense, SyntheticEvent } from "react";
import { ManagedModal, Modal, PrebuiltManagedModalProps } from "../Modal";
import { Geocoder } from "./utils/Geocoder";
import { Weather } from "./utils/Weather";
import Button from "../Button";

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
    weather: WeatherBody
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

const WeatherBody = ({ ...props }: WeatherProps) => {
  const currentEvent = useCurrentEvent();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Suspense fallback={<Loading />}>
        <Weather location={currentEvent.location} />
      </Suspense>
    </div>
  );
};

type DirectionsProps = RequiredPropsWithChildren<{}>;

const Directions = ({ ...props }: DirectionsProps) => {
  const currentEvent = useCurrentEvent();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Suspense fallback={<Loading />}>
        <Geocoder location={currentEvent.location} />
      </Suspense>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-center">
        <b>Loading...</b>
      </p>
    </div>
  );
};

type MapProps = RequiredPropsWithChildren<{}>;

const Map = ({ ...props }: MapProps) => {
  const currentEvent = useCurrentEvent();

  console.log(currentEvent.location);

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

  const manager = useHomepageManager();
  const currentEvent = useCurrentEvent();
  const setEvent = useCurrentEventDispatch();

  const handler = async (action: { mode: "delete" | "refresh" }) => {
    switch (action.mode) {
      case "delete":
        await manager({
          type: "event",
          mode: "delete",
          payload: currentEvent
        });
        setEvent(0);
        break;
      case "refresh":
        await manager({
          type: "event",
          mode: "refresh",
          payload: currentEvent
        });
        break;
    }
  };

  const execute = async (e: SyntheticEvent) => {
    await handler({ mode: type });
  };

  return (
    <ManagedModal {...props}>
      <Modal.Header title={`${type}`} />
      <Modal.Body>
        {type === "delete" ? (
          <>
            <div className="flex flex-col justify-center">
              <p className="p-4 text-center">
                Are you sure you want to delete this event?
              </p>
              <Button onClick={execute}>Confirm</Button>
            </div>
          </>
        ) : (
          <button onClick={execute}>Refresh Event</button>
        )}
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
  InfoModal,
  ManagedModal,
  Modal,
  NotificationModal,
  ShareModal,
  UpdateModal
};
