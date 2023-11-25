"use client";

import { CurrentEvent } from "@/components/Itinerary/CurrentEvent";
import { EventList } from "@/components/Itinerary/EventList";
import { useHomepage } from "@/context";
import { DisplayData } from "@/types";
import { Event, EventTypes } from "@/types/Event";
import { useState } from "react";
import styles from "./itinerary.module.css";

import random from "@/lib/random";

export type FlattenedEvent = Event &
  DisplayData & {
    _id: string;
    __t: EventTypes;
  };

export default function Page() {
  const { itinerary } = useHomepage();

  const { events } = itinerary;

  const [currentEvent, setEvent] = useState(events[0]);

  const handleClick = (index: number) => {
    if (index >= events.length) return;

    setEvent(events[index]);
  };

  const members = random.member({
    min: 1,
    max: 4,
  });

  return (
    <div className="flex h-full justify-center items-center overflow-y-scroll ">
      <div className={styles.content + "  w-full flex gap-8"}>
        <CurrentEvent {...currentEvent} members={members} />

        <EventList events={events} handleClick={handleClick}></EventList>
      </div>
    </div>
  );
}
