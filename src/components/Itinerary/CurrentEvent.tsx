"use client";
import { FlattenedEvent, useCurrentEvent } from "@/app/home/itinerary/page";
import { PartyMember } from "@/types/User";
import { InfoCard, InfoMap } from "./InfoCard";
import { Party } from "./Party";
import { Upgrades } from "./Upgrades";
import styles from "./currentEvent.module.css";

type CurrentEventProps = {
  members: PartyMember[];
};

export const CurrentEvent = ({ ...props }: CurrentEventProps) => {
  const { members } = props;
  const { displayData, upgradeOptions, picture_url, location, date, name } =
    useCurrentEvent();

  return (
    <div className={styles.card}>
      <section className={styles.sub_card}>
        <h2 className="text-2xl font-bold capitalize w-full pb-2 truncate ellipsis">
          Upcoming - {name}
        </h2>
        <InfoCard
          {...{
            picture_url,
            location,
            date,
            displayData,
          }}
        />
      </section>

      <section className={styles.mid_card}>
        <h2 className="text-2xl">
          <b>Reservation Info</b>
        </h2>
        <InfoMap data={displayData} />
      </section>

      <section className={styles.modify}>
        <div className={styles.header}>
          <h1 className="text-2xl font-bold min-w-max self-baseline pb-2">
            Modify Reservation
          </h1>
          <Party members={members} />
        </div>
        <div className={styles.wrapper}>
          <Upgrades options={upgradeOptions} />
        </div>
      </section>
    </div>
  );
};
