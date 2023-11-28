"use client";
import {
  faDiscord,
  faFacebook,
  faSlack,
  faTwitter
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
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, SyntheticEvent, useState } from "react";

import { Notifiers } from "@/lib/notifier";
import {
  InfoMethods,
  NotifyMethods,
  ShareMethods,
  UpdateMethods
} from "@/types";
import { ActionsDialog } from "./Dialogs";
import styles from "./actions.module.css";

type ActionsProps = {
  notify: {
    [P in Notifiers]: boolean;
  };
};

export type ActionMethods =
  | InfoMethods
  | ShareMethods
  | UpdateMethods
  | NotifyMethods;

type ActionsArr<T extends ActionMethods> = {
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
};

const updateActions: ActionDefinition<UpdateMethods> = {
  labels: { lg: "Quick Updates", sm: "Updates" },
  methods: [
    { type: "del", icon: faTrashCan },
    { type: "refresh", icon: faArrowsRotate }
  ]
};

const infomationActions: ActionDefinition<InfoMethods> = {
  labels: { lg: "Get Infomation!", sm: "Info" },
  methods: [
    { type: "map", icon: faMapPin },
    { type: "directions", icon: faCar },
    { type: "weather", icon: faCloud }
  ]
};

const shareActions: ActionDefinition<ShareMethods> = {
  labels: { lg: "Share Your Trip!", sm: "Share!" },
  methods: [
    { type: "rss", icon: faRss },
    { type: "social", icon: faShareNodes },
    { type: "link", icon: faShare }
  ],
  className: "min-w-max"
};

export const Actions = ({ notify }: ActionsProps) => {
  const notificationActions: ActionDefinition<Partial<Notifiers>> = {
    labels: { lg: "Get Notified!", sm: "Notify!" },
    methods: [
      { type: "email", icon: faEnvelope },
      { type: "sms", icon: faPhone },
      { type: "discord", icon: faDiscord },
      { type: "facebook", icon: faFacebook },
      { type: "slack", icon: faSlack },
      { type: "twitter", icon: faTwitter }
    ].filter(({ type }) => notify[type]) as ActionsArr<Partial<Notifiers>>
  };

  const actions: ActionDefinition[] = [
    infomationActions,
    notificationActions,
    shareActions,
    updateActions
  ];

  return (
    <div className={styles.actions}>
      {actions.map(({ labels, methods, Component, className }, i) => (
        <ActionGroup labels={labels} className={className} key={i}>
          {methods.map(({ type, icon }, j: number) => (
            <ActionsDialog
              btn={<FontAwesomeIcon icon={icon} />}
              type={type}
              key={j}
            />
          ))}
        </ActionGroup>
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

const ActionGroup = ({ ...props }: ActionProps) => {
  const { children, labels, className } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center w-1/6">
      <label className={[styles.lg_label, className].join(" ")}>
        {labels.lg}
      </label>
      <label className={styles.sm_label}>{labels.sm}</label>
      <span
        className={`${styles.icons} ${isOpen ? styles.open : styles.closed}`}
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
