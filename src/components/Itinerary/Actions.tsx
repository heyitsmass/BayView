"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./actions.module.css";
import {
  faArrowsRotate,
  faBars,
  faCar,
  faEnvelope,
  faMapPin,
  faPhone,
  faRss,
  faShare,
  faShareNodes,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { SyntheticEvent, useEffect, useState } from "react";

type ActionProps = {
  notify: {
    email: boolean;
    phone: boolean;
    discord: boolean;
    facebook: boolean;
  };
};

export const Actions = ({ notify }: ActionProps) => {
  const [states, setStates] = useState({
    notify: false,
    map: false,
    share: false,
    updates: false,
  });

  const handleClick = (e: SyntheticEvent, state: keyof typeof states) => {
    e.preventDefault();
    console.log(state, states[state]);
    return setStates((states) => {
      return {
        ...states,
        [state]: !states[state],
      };
    });
  };

  return (
    <div
      className={
        styles.actions +
        " flex flex-row w-full max-w-1/2 justify-around text-lg z-1"
      }
    >
      <div className="flex flex-col items-center w-1/6">
        <label className={styles.lg_label + " text-sm mb-2"}>
          Get Directions!
        </label>
        <label className={styles.sm_label + " text-sm mb-2 min-w-max"}>
          Map!
        </label>
        <span
          className={[
            styles.icons,
            states.map ? styles.open : styles.closed,
            "bg-rose-800 map flex gap-x-3 items-center w-full justify-around p-2 rounded-full",
          ].join(" ")}
        >
          <span className={styles.bars}>
            <FontAwesomeIcon
              icon={states.map ? faXmark : faBars}
              onClick={(e) => handleClick(e, "map")}
            />
          </span>
          <FontAwesomeIcon icon={faCar} />
          <FontAwesomeIcon icon={faMapPin} />
        </span>
      </div>

      <div className="flex flex-col items-center w-1/4">
        <label className={styles.lg_label + " text-sm mb-2"}>
          Get Notified!
        </label>
        <label className={styles.sm_label + " text-sm mb-2 min-w-max"}>
          Notify!
        </label>
        <span
          className={[
            styles.icons,
            states.notify ? styles.open : styles.closed,
            "bg-rose-800 notify flex gap-x-3 items-center w-full justify-around p-2 rounded-full",
          ].join(" ")}
        >
          <span className={styles.bars}>
            <FontAwesomeIcon
              icon={states.notify ? faXmark : faBars}
              onClick={(e) => handleClick(e, "notify")}
            />
          </span>
          {notify.email && <FontAwesomeIcon icon={faEnvelope} />}
          {notify.phone && <FontAwesomeIcon icon={faPhone} />}
          {notify.discord && <FontAwesomeIcon icon={faDiscord} />}
          {notify.facebook && <FontAwesomeIcon icon={faFacebook} />}
        </span>
      </div>
      <div className="flex flex-col items-center w-1/6">
        <label className={styles.lg_label + " text-sm mb-2"}>
          Share Your Trip!
        </label>
        <label className={styles.sm_label + " text-sm mb-2 min-w-max"}>
          Share!
        </label>

        <span
          className={[
            styles.icons,
            states.share ? styles.open : styles.closed,
            "bg-rose-800 social flex gap-x-3 items-center min-w-max w-full justify-around p-2 rounded-full",
          ].join(" ")}
        >
          <span className={styles.bars}>
            <FontAwesomeIcon
              icon={states.share ? faXmark : faBars}
              onClick={(e) => handleClick(e, "share")}
            />
          </span>
          <FontAwesomeIcon icon={faRss} />
          <FontAwesomeIcon icon={faShareNodes} />
          <FontAwesomeIcon icon={faShare} />
        </span>
      </div>
      <div className="flex flex-col items-center w-1/6">
        <label className={styles.lg_label + " text-sm mb-2 min-w-max"}>
          Quick Updates
        </label>
        <label className={styles.sm_label + " text-sm mb-2 min-w-max"}>
          Updates
        </label>
        <span
          className={[
            styles.icons,
            states.updates ? styles.open : styles.closed,
            "bg-rose-800 misc flex gap-x-4 items-center min-w-max w-full justify-around p-2 rounded-full",
          ].join(" ")}
        >
          <span className={styles.bars}>
            <FontAwesomeIcon
              icon={states.updates ? faXmark : faBars}
              onClick={(e) => handleClick(e, "updates")}
            />
          </span>
          <FontAwesomeIcon icon={faArrowsRotate} />
          <FontAwesomeIcon icon={faTrashCan} />
        </span>
      </div>
    </div>
  );
};
