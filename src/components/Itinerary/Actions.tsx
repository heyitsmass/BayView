"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionsDialog } from "../Dialog";
import { getAvailableActions } from "./Action/static";
import styles from "./actions.module.css";
import { PropsWithChildren, SyntheticEvent, useState } from "react";
import { NotifyMethods } from "@/types";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

type ActionsProps = {
  notify: {
    [P in NotifyMethods]: boolean;
  };
};

export const Actions = ({ notify }: ActionsProps) => {
  const actions = getAvailableActions({ notify });

  return (
    <div className={styles.actions}>
      {actions.map(({ labels, methods, className }, i) => (
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
