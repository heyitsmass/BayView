"use client";
import {
  faDiscord,
  faFacebook,
  faSlack,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  IconDefinition,
  faArrowsRotate,
  faBars,
  faCar,
  faCloud,
  faEnvelope,
  faMapPin,
  faPhone,
  faRss,
  faShare,
  faShareNodes,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, SyntheticEvent, useState } from "react";

import { Notifiers } from "@/lib/notifier";
import {
  ActionModalProps,
  InfoMethods,
  InfoModal,
  NotificationModal,
  ShareMethods,
  ShareModal,
  UpdateMethods,
  UpdateModal,
} from "./Modals";
import styles from "./actions.module.css";

type ActionsProps = {
  notify: {
    [P in Notifiers]: boolean;
  };
};
export type ActionMethods =
  | UpdateMethods
  | InfoMethods
  | Notifiers
  | ShareMethods;

type ActionsArr<T extends ActionMethods = ActionMethods> = {
  type: T;
  icon: IconDefinition;
}[];

type ActionDefinition<T extends ActionMethods = ActionMethods> = {
  labels: {
    lg: string;
    sm: string;
  };
  methods: ActionsArr<T>;
  className?: string;
  Component: ({ ...props }: ActionModalProps<T>) => JSX.Element;
};

const updateActions = {
  labels: { lg: "Quick Updates", sm: "Updates" },
  methods: [
    { type: "delete", icon: faTrashCan },
    { type: "refresh", icon: faArrowsRotate },
  ] as ActionsArr<UpdateMethods>,
  Component: UpdateModal,
};

const infomationActions = {
  labels: { lg: "Get Infomation!", sm: "Info" },
  methods: [
    { type: "map", icon: faMapPin },
    { type: "directions", icon: faCar },
    { type: "weather", icon: faCloud },
  ] as ActionsArr<InfoMethods>,
  Component: InfoModal,
};

const shareActions = {
  labels: { lg: "Share Your Trip!", sm: "Share!" },
  methods: [
    { type: "rss", icon: faRss },
    { type: "social", icon: faShareNodes },
    { type: "link", icon: faShare },
  ] as ActionsArr<ShareMethods>,
  className: "min-w-max",
  Component: ShareModal,
};

export const Actions = ({ notify }: ActionsProps) => {
  const notificationActions = {
    labels: { lg: "Get Notified!", sm: "Notify!" },
    methods: [
      { type: "email", icon: faEnvelope },
      { type: "phone", icon: faPhone },
      { type: "discord", icon: faDiscord },
      { type: "facebook", icon: faFacebook },
      { type: "slack", icon: faSlack },
      { type: "twitter", icon: faTwitter },
    ].filter(({ type }) => notify[type]) as Partial<ActionsArr<Notifiers>>,
    Component: NotificationModal,
  };

  const actions = [
    infomationActions,
    notificationActions,
    shareActions,
    updateActions,
  ] as ActionDefinition[];

  return (
    <div className={styles.actions}>
      {actions.map(({ labels, methods, Component, className }, i) => (
        <Action labels={labels} className={className} key={i}>
          {methods.map(({ type, icon }, j: number) => (
            <Component
              btn={<FontAwesomeIcon icon={icon} />}
              type={type}
              key={j}
            />
          ))}
        </Action>
      ))}
    </div>
  );
};

type ActionProps = PropsWithChildren<{
  labels: {
    lg: string;
    sm: string;
  };
  children: JSX.Element | JSX.Element[];
  className?: string;
}>;

const Action = ({ ...props }: ActionProps) => {
  const { children, labels, className } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center w-1/6">
      <label className={[styles.lg_label, className].join(" ")}>
        {labels.lg}
      </label>
      <label className={styles.sm_label}>{labels.sm}</label>
      <span
        className={`${styles.icons} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <span className={styles.bars}>
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              return setOpen(!isOpen);
            }}
          />
        </span>
        {children}
      </span>
    </div>
  );
};
