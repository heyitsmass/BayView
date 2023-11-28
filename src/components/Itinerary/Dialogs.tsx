"use client";

import { useCurrentEvent } from "@/hooks";
import { Dialog } from "@headlessui/react";
import { PropsWithChildren, Suspense } from "react";
import {
  ContainedDialog,
  GenericDialog,
  PrebuiltDialogProps
} from "../ContainedDialog";

import { Geocoder } from "./utils/Geocoder";
import {
  InfoMethods,
  NotifyMethods,
  ShareMethods,
  UpdateMethods
} from "@/types";

const Loading = () => {
  return <div>Loading...</div>;
};

type InfoDialogProps = PrebuiltDialogProps<InfoMethods>;

const InfoDialog = ({ type, ...props }: InfoDialogProps) => {
  const currEvent = useCurrentEvent();

  if (!currEvent) throw new Error("No current event");

  const { location } = currEvent;

  const map = () => {
    const data = {
      title: "Map",
      description: "See where you're going!"
    };
    return <GenericDialog {...data}></GenericDialog>;
  };

  const directions = () => {
    const data = {
      title: "Directions",
      description: "Get directions to your event!"
    };

    return <GenericDialog {...data}></GenericDialog>;
  };

  const weather = () => {
    const data = {
      title: "Weather",
      description: "See what the weather will be like!"
    };

    return <GenericDialog {...data}></GenericDialog>;
  };

  const Component = {
    map,
    directions,
    weather
  }[type];

  return (
    <ContainedDialog {...props}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ContainedDialog>
  );
};

type ShareDialogProps = PrebuiltDialogProps<ShareMethods>;

const ShareDialog = ({ type, ...props }: ShareDialogProps) => {
  const rss = () => {
    return <></>;
  };

  const social = () => {
    return <></>;
  };

  const link = () => {
    return <></>;
  };

  const Component = {
    rss,
    social,
    link
  }[type];

  return (
    <ContainedDialog {...props}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ContainedDialog>
  );
};

type NotifyDialogProps = PrebuiltDialogProps<NotifyMethods>;

const NotifyDialog = ({ type, ...props }: NotifyDialogProps) => {
  const Component = () => {
    return <></>;
  };
  return (
    <ContainedDialog {...props}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ContainedDialog>
  );
};

type UpdateDialogProps = PrebuiltDialogProps<UpdateMethods>;

const UpdateDialog = ({ type, ...props }: UpdateDialogProps) => {
  const del = () => {
    return <></>;
  };

  const refresh = () => {
    return <></>;
  };

  const Component = {
    del,
    refresh
  }[type];

  return (
    <ContainedDialog {...props}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ContainedDialog>
  );
};

export { InfoDialog, ShareDialog, NotifyDialog, UpdateDialog };
