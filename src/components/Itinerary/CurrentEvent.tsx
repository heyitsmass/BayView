import { DisplayData } from "@/types";
import { Event } from "@/types/Event";
import { InfoCard, InfoMap } from "./InfoCard";
import { Party } from "./Party";
import { Upgrades } from "./Upgrades";
import styles from "./currentEvent.module.css";
import { PartyMember } from "@/types/User";

type CurrentEventProps = DisplayData &
  Pick<Event, "date" | "location" | "name"> & {
    members: PartyMember[];
  };

export const CurrentEvent = ({ ...props }: CurrentEventProps) => {
  const {
    displayData,
    upgradeOptions,
    picture_url,
    location,
    date,
    name,
    members,
  } = props;

  return (
    <div
      className={
        styles.card +
        " h-min w-full bg-zinc-800 rounded-2xl p-4 border border-zinc-700 min-w-[480px]"
      }
    >
      <section className={styles.sub_card + " h-max"}>
        <h2 className=" text-2xl font-bold capitalize w-full pb-2 truncate ellipsis">
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

      <section
        className={
          styles.modify + " rounded-b-2xl flex min-w-[450px] gap-4"
        }
      >
        <div className={styles.header}>
          <h1 className="text-2xl font-bold min-w-max self-baseline pb-2">
            Modify Reservation
          </h1>
          <Party members={members} />
        </div>
        <div
          className={
            styles.wrapper +
            " bg-zinc-700 rounded-2xl border border-zinc-600 w-full p-4"
          }
        >
          <Upgrades options={upgradeOptions} />
        </div>
      </section>
    </div>
  );
};
