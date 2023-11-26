"use client";

import { PopupVariant, usePopup, usePopupDispatch } from "@/context/popup";
import ReactPortal from "../ReactPortal";
import { useEffect, useRef, useState } from "react";
import styles from "./popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Popup = () => {
  const setPopup = useRef(usePopupDispatch()); // NOTE: This is the function to set the popup
  const popup = usePopup();

  const [timer, setTimer] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (popup) {
      setTimer(
        setTimeout(() => {
          setPopup.current(undefined);
        }, popup.duration || 5000)
      );
    }
  }, [popup]);

  const cancelTimer = () =>
    setPopup.current(
      () =>
        setTimer((timer) => {
          clearTimeout(timer);
          return undefined;
        }) as undefined
    );

  if (popup) {
    let { variant = "info", message } = popup;
    return (
      <ReactPortal wrapperId="popup-portal">
        <PopupBox
          {...{
            variant,
            message,
            cancelTimer,
          }}
        />
      </ReactPortal>
    );
  }
  return null;
};

type PopupNode = {
  variant: PopupVariant;
  message: string;
  cancelTimer: () => void;
};

const PopupBox = ({ variant, message, cancelTimer }: PopupNode) => {
  return (
    <div className={styles.popup}>
      <header className={styles[variant]}>
        <b>{variant.toUpperCase()}</b>
        <FontAwesomeIcon icon={faXmark} onClick={cancelTimer} />
      </header>
      <div className={styles.popupInner}>
        <p>{message}</p>
      </div>
    </div>
  );
};
