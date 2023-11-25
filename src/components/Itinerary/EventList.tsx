import { FlattenedEvent } from "@/app/home/itinerary/page";

import styles from "./eventlist.module.css";
import { SyntheticEvent } from "react";
import { ItineraryEvent } from "./Event";

export const EventList = ({
  events,
  handleClick,
}: {
  events: FlattenedEvent[];
  handleClick: (index: number) => void;
}) => {
  return (
    <div
      className={
        styles.wrapper +
        " max-w-1/2 w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 dark:text-white"
      }
    >
      <div className={styles.subWrapper + " h-full"}>
        <div className="header h-[4%] min-h-max !z-2">
          <h1
            className={
              styles.eventsHeader + " text-4xl font-bold px-8 z-999"
            }
          >
            Events
          </h1>
        </div>
        <div className="h-[94%] flex justify-center mt-4">
          <div className="overflow-y-scroll h-full mt-2 w-[96%]">
            {events.map((event, i) => (
              <ItineraryEvent
                key={i}
                {...event}
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  handleClick(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};