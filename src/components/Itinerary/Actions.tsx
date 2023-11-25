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
    <div className={styles.actions}>
      <div className="flex flex-col items-center w-1/6">
        <label className={styles.lg_label}>Get Directions!</label>
        <label className={styles.sm_label}>Map!</label>
        <span
          className={[
            styles.icons,
            states.map ? styles.open : styles.closed,
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
        <label className={styles.lg_label}>Get Notified!</label>
        <label className={styles.sm_label}>Notify!</label>
        <span
          className={[
            styles.icons,
            states.notify ? styles.open : styles.closed,
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
        <label className={styles.lg_label}>Share Your Trip!</label>
        <label className={styles.sm_label}>Share!</label>

        <span
          className={[
            styles.icons,
            states.share ? styles.open : styles.closed,
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
        <label className={styles.lg_label + " min-w-max"}>
          Quick Updates
        </label>
        <label className={styles.sm_label}>Updates</label>
        <span
          className={[
            styles.icons,
            states.updates ? styles.open : styles.closed,
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
