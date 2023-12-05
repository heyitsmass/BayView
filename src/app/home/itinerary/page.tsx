"use client";

import { CurrentEvent } from "@/components/Itinerary/CurrentEvent";
import { EventList } from "@/components/Itinerary/EventList";

import { useState } from "react";
import styles from "./itinerary.module.css";

import {
  CurrentEventContext,
  CurrentEventDispatch
} from "@/context/currentEvent";

import { useHomepage } from "@/hooks";

export default function Page() {
  const { itinerary } = useHomepage();

  const [index, setIndex] = useState(0);

  return (
    <div className="flex h-full justify-center items-center">
      <div className={styles.content}>
        <CurrentEventContext.Provider value={itinerary.events[index]}>
          <CurrentEventDispatch.Provider value={setIndex}>
            <CurrentEvent />
            <EventList />
          </CurrentEventDispatch.Provider>
        </CurrentEventContext.Provider>
      </div>
    </div>
  );
}
