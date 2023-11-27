"use client";

import { CurrentEvent } from "@/components/Itinerary/CurrentEvent";
import { EventList } from "@/components/Itinerary/EventList";
import { useHomepage } from "@/context";
import { DisplayData } from "@/types";
import { Event, EventTypes } from "@/types/Event";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import styles from "./itinerary.module.css";

import random from "@/lib/random";

export type FlattenedEvent = Event &
  DisplayData & {
    _id: string;
    __t: EventTypes;
  };

const CurrentEventContext = createContext<FlattenedEvent>(
  {} as FlattenedEvent
);

const CurrentEventDispatch = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

export const useCurrentEvent = () => {
  return useContext(CurrentEventContext);
};

export const useCurrentEventDispatch = () => {
  return useContext(CurrentEventDispatch);
};

export default function Page() {
  const { itinerary } = useHomepage();

  const [index, setIndex] = useState(0);

  const members = random.member({
    min: 1,
    max: 4,
  });

  return (
    <div className="flex h-full justify-center items-center overflow-y-scroll ">
      <div className={styles.content + "  w-full flex gap-8"}>
        <CurrentEventContext.Provider value={itinerary.events[index]}>
          <CurrentEventDispatch.Provider value={setIndex}>
            <CurrentEvent members={members} />
            <EventList />
          </CurrentEventDispatch.Provider>
        </CurrentEventContext.Provider>
      </div>
    </div>
  );
}
