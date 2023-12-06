'use client'; 

import {
  IconDefinition,
  faCalendar,
  faLocationArrow
} from "@fortawesome/free-solid-svg-icons";
import styles from "./infocard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TLocationType } from "@/types/Event";
import { Actions } from "./Actions";
import { ReactNode } from "react";
import { BlurOpacityAnimation } from "../Animations/AnimatePresenceComponent";

export type InfoCardProps = {
  picture_url: string;
  location: TLocationType;
  date: Date;
  displayData: Record<string, string>;
  isPending?: boolean;
};

export const InfoCard = ({
  picture_url,
  location,
  date,
  displayData,
  isPending = false
}: InfoCardProps) => {
  const locationStr =
    (location &&
      "street" in location &&
      [location.street, location.city, location.state].join(", ")) ||
    "Unable to gather location";

  const dateStr = new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    .replace(",", "");

  const notify = {
    email: true,
    phone: true,
    discord: true,
    facebook: true,
    slack: true,
    twitter: true,
    sms: true
  };

  return (
    <>
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <BlurOpacityAnimation
            transitionOn={isPending}
            className="flex !h-min w-full truncate"
            isField={false}
          >
            <div className={styles.infoLeft}>
              <div className="flex flex-col min-w-80 w-full">
                <div
                  className="h-48 rounded-2xl shadow-xl border border-zinc-700 bg-cover"
                  style={{
                    backgroundImage: `url(${picture_url})`
                  }}
                ></div>
                <div className="p-2 pl-0 flex flex-col gap-2 text-sm min-w-max">
                  <IconText icon={faLocationArrow}>{locationStr}</IconText>
                  <IconText icon={faCalendar}>{dateStr}</IconText>
                </div>
              </div>
            </div>
            <InfoMap data={displayData} />
          </BlurOpacityAnimation>
        </div>
        <Actions notify={notify} />
      </div>
    </>
  );
};

type InfoMapProps = {
  data: Record<string, ReactNode>;
};
export const InfoMap = ({ data }: InfoMapProps) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="pl-4 w-full truncate">
      <div className="h-full flex truncate ">
        <div className="flex flex-col min-w-max">
          {keys.map((key, i) => (
            <p
              key={i}
              className="flex-grow min-w-max text-right !font-semibold pt-1"
            >
              {key} :
            </p>
          ))}
        </div>
        <div className="flex flex-col pl-2 w-max flex-1 truncate">
          {values.map((value, i) => (
            <p className="truncate flex-grow pt-1" key={i}>
              {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

type IconTextProps = {
  icon: IconDefinition;
  className?: string;
  children: string;
};

const IconText = ({ icon, className, children }: IconTextProps) => {
  return (
    <div className="flex">
      <span className="w-8 flex items-center justify-center truncate ellipsis">
        <FontAwesomeIcon icon={icon} />
      </span>
      <p className={className}>{children}</p>
    </div>
  );
};
