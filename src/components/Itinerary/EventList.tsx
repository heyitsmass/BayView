"use client";

import {} from "@/app/home/itinerary/page";

import {
  useCurrentEvent,
  useCurrentEventDispatch,
  useHomepage
} from "@/hooks";
import { SyntheticEvent } from "react";
import { ItineraryEvent } from "./Event";
import styles from "./eventlist.module.css";

export const EventList = () => {
  const events = useHomepage().itinerary.events;

  const setEvent = useCurrentEventDispatch();
  const currentEvent = useCurrentEvent();

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className="header h-[4%] min-h-max !z-2">
          <h1 className={styles.eventsHeader}>Events</h1>
        </div>
        <div className="h-[94%] flex justify-center mt-4">
          <div className="overflow-y-scroll h-full mt-2 w-[96%]">
            {events.map((event, i) => (
              <ItineraryEvent
                key={i}
                {...event}
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setEvent(i);
                }}
                className={
                  currentEvent._id === event._id ? styles.active : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
