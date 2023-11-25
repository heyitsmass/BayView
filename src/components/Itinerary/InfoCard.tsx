import {
  IconDefinition,
  faCalendar,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./infocard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Location } from "@/types/Event";
import { Actions } from "./Actions";
import { ReactNode } from "react";

export const InfoCard = ({
  picture_url,
  location,
  date,
  displayData,
}: {
  picture_url: string;
  location: Location;
  date: Date;
  displayData: Record<string, string>;
}) => {
  const locationStr = [location.street, location.city, location.state].join(
    ", "
  );

  const dateStr = date
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(",", "");

  const notify = {
    email: true,
    phone: true,
    discord: true,
    facebook: true,
  };

  return (
    <>
      <div
        className={[
          styles.info,
          "flex flex-col overflow-hidden relative min-h-max",
        ].join(" ")}
      >
        <div className={styles.infoTop + " flex"}>
          <div className={styles.infoLeft + " min-w-max flex"}>
            <div className="flex flex-col min-w-80 w-full">
              <div
                className="h-48 rounded-2xl shadow-xl border border-zinc-700"
                style={{
                  backgroundImage: `url(${picture_url})`,
                  backgroundSize: "fill",
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

export const InfoMap = ({
  data,
}: {
  data: Record<string, string | number | JSX.Element | ReactNode>;
}) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className={styles.data + " w-full p-4 flex gap-4 min-w-max"}>
      <article className={styles.keys + " h-full flex flex-col w-max"}>
        {keys.map((key, i) => (
          <p key={i} className="flex grow min-w-max justify-end">
            <b>{key} :</b>
          </p>
        ))}
      </article>
      <article
        className={
          styles.values + " w-full h-full flex flex-col capitalize"
        }
      >
        {values.map((value, i) => (
          <p className="flex grow" key={i}>
            {value}
          </p>
        ))}
      </article>
    </div>
  );
};

const IconText = ({
  icon,
  className,
  children,
}: {
  icon: IconDefinition;
  className?: string;
  children: string;
}) => {
  return (
    <div className="flex">
      <span className="w-8 flex items-center justify-center truncate ellipsis">
        <FontAwesomeIcon icon={icon} />
      </span>
      <p className={className}>{children}</p>
    </div>
  );
};
