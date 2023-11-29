import {
  IconDefinition,
  faCalendar,
  faLocationArrow
} from "@fortawesome/free-solid-svg-icons";
import styles from "./infocard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Location } from "@/types/Event";
import { Actions } from "./Actions";
import { ReactNode } from "react";

export type InfoCardProps = {
  picture_url: string;
  location: Location;
  date: Date;
  displayData: Record<string, string>;
};

export const InfoCard = ({
  picture_url,
  location,
  date,
  displayData
}: InfoCardProps) => {
  const locationStr = [location.street, location.city, location.state].join(
    ", "
  );

  const dateStr = date
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
    <div className="pl-4 pb-4 w-full truncate">
      <div className="h-full flex">
        <div className="flex flex-col h-full min-w-max">
          {keys.map((key, i) => (
            <p
              key={i}
              className="flex flex-grow min-w-max justify-end items-center !font-bold"
            >
              {key} :
            </p>
          ))}
        </div>
        <div className="flex flex-col pl-2 h-full">
          {values.map((value, i) => (
            <p className="flex flex-grow capitalize items-center" key={i}>
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
