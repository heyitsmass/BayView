"use client";
import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
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
import { ReactNode, SyntheticEvent, useState } from "react";
import styles from "./actions.module.css";

type ActionsProps = {
  notify: {
    email: boolean;
    phone: boolean;
    discord: boolean;
    facebook: boolean;
  };
};

export const Actions = ({ notify }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <Action largeLabel="Get Directions!" smallLabel="Map">
        {[faCar, faMapPin, faCloud]}
      </Action>

      <Action largeLabel="Get Notified!" smallLabel="Notify!">
        <>
          {notify.email && <FontAwesomeIcon icon={faEnvelope} />}
          {notify.phone && <FontAwesomeIcon icon={faPhone} />}
          {notify.discord && <FontAwesomeIcon icon={faDiscord} />}
          {notify.facebook && <FontAwesomeIcon icon={faFacebook} />}
        </>
      </Action>

      <Action largeLabel="Share Your Trip!" smallLabel="Share!">
        {[faRss, faShareNodes, faShare]}
      </Action>

      <Action
        largeLabel="Quick Updates"
        smallLabel="Updates"
        className="min-w-max"
      >
        {[faArrowsRotate, faTrashCan]}
      </Action>
    </div>
  );
};

type ActionProps = {
  largeLabel: string;
  smallLabel: string;
  children: IconDefinition[] | ReactNode;
  handlers?: ((...args: any[]) => void)[];
  className?: string;
};

const Action = ({ ...props }: ActionProps) => {
  const { largeLabel, smallLabel, className, children } = props;

  const [isOpen, setOpen] = useState(false);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    return setOpen(!isOpen);
  };

  const handlers = props.handlers || [];

  const display =
    children instanceof Array
      ? children.map((icon, i) => (
          <FontAwesomeIcon key={i} icon={icon} onClick={handlers.at(i)} />
        ))
      : children;

  return (
    <div className="flex flex-col items-center w-1/6">
      <label className={[styles.lg_label, className].join(" ")}>
        {largeLabel}
      </label>
      <label className={styles.sm_label}>{smallLabel}</label>
      <span
        className={`${styles.icons} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <span className={styles.bars}>
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            onClick={handleClick}
          />
        </span>
        {display}
      </span>
    </div>
  );
};
