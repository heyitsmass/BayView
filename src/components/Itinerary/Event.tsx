'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent } from "react";
import { DisplayableEvent } from "../HomePage/EventFinder";
import IconMap from "./Icons";
import styles from "./event.module.css";

type ItineraryEventProps = {
  className?: string;
  onClick: (e: SyntheticEvent) => void;
} & DisplayableEvent;

export const ItineraryEvent = ({
  className,
  ...props
}: ItineraryEventProps) => {
  const { __t, peek, picture_url, onClick } = props;

  const [title, name] = peek;

  return (
    <div className={[styles.event, className].join(" ")} onClick={onClick}>
      <div className="relative w-full flex flex-row items-center">
        <div className={styles.icon}>
          <FontAwesomeIcon
            icon={IconMap[__t]}
            className="!drop-shadow-3xl min-w-[66px] w-full mx-4"
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className="col-span-full !text-base capitalize flex">
              <span className="w-max min-w-max">
                <b>{title.label} </b> - <span>{title.value}</span>
              </span>

              <p className={styles.name}>
                - <span>{name.value}</span>
              </p>
            </h2>
            {peek.slice(2).map((item, i) => {
              return (
                <p key={i}>
                  {"label" in item && <span>{item.label}</span>}
                  <small>{item.value}</small>
                </p>
              );
            })}
          </div>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${picture_url})`,
              backgroundSize: "cover"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
