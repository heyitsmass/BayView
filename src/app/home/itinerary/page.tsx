"use client";

import { CurrentEvent } from "@/components/Itinerary/CurrentEvent";
import { EventList } from "@/components/Itinerary/EventList";
import { useHomepage } from "@/context";
import { DisplayData } from "@/types";
import { Event, EventTypes } from "@/types/Event";
import { useState } from "react";
import styles from "./itinerary.module.css";

export type FlattenedEvent = Event &
  DisplayData & {
    _id: string;
    __t: EventTypes;
  };

export default function Page() {
  const { itinerary } = useHomepage();

  const { events } = itinerary;

  return (
    <div className="flex h-full justify-center items-center overflow-y-scroll ">
      <div className={styles.content + "  w-full flex gap-8"}>
      </div>
    </div>
  );
}
