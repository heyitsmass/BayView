"use client";
import { PartyMember } from "@/types/User";
import { InfoCard, InfoMap } from "./InfoCard";
import { Party } from "./Party";
import { Upgrades } from "./Upgrades";
import styles from "./currentEvent.module.css";
import { useCurrentEvent } from "@/hooks";
import { DisplayData } from "@/types";
import { DisplayableEvent } from "../HomePage/EventFinder";

type CurrentEventProps = {
  members: PartyMember[];
};

const InfoPanel = ({ event }: { event: DisplayableEvent }) => {
  const { name } = event;
  return (
    <section className={styles.sub_card}>
      <h2 className="text-xl font-bold capitalize w-full pb-2 truncate ellipsis">
        Upcoming - {name}
      </h2>
      <InfoCard {...event} />
    </section>
  );
};

const ModifyPanel = ({
  upgradeOptions
}: {
  upgradeOptions: DisplayData["upgradeOptions"];
}) => {
  return (
    <section className={styles.modify}>
      <div className={styles.header}>
        <h1 className="text-xl font-bold min-w-max self-baseline pb-2">
          Modify Reservation
        </h1>
        <Party />
      </div>
      <div className={styles.wrapper}>
        <Upgrades options={upgradeOptions} />
      </div>
    </section>
  );
};

const MiddlePanel = ({
  displayData
}: {
  displayData: DisplayData["displayData"];
}) => {
  return (
    <section className={styles.mid_card}>
      <h2 className="text-2xl">
        <b>Reservation Info</b>
      </h2>
      <InfoMap data={displayData} />
    </section>
  );
};

export const CurrentEvent = () => {
  const currEvent = useCurrentEvent();

  return (
    <div className={styles.card}>
      {currEvent && (
        <>
          <InfoPanel event={currEvent} />
          <MiddlePanel {...currEvent} />
          <ModifyPanel upgradeOptions={currEvent.upgradeOptions} />
        </>
      )}
      {!currEvent && (
        <div className={styles.empty}>
          <div className="header h-[4%] min-h-max !z-2">
            <h2 className="text-3xl font-bold px-8 pl-2 z-[999]">
              No Upcoming Events
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
