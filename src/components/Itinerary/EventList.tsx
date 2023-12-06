"use client";

import {
  useCurrentEvent,
  useCurrentEventDispatch,
  useHomepage
} from "@/hooks";
import { Offer } from "@/types";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { SyntheticEvent } from "react";
import Card from "../HomePage/Card";
import { ItineraryEvent } from "./Event";
import styles from "./eventlist.module.css";

const OfferDisplay = ({
  isOpen,
  onClick,
  offer,
  icon
}: {
  isOpen;
  onClick: (e: SyntheticEvent) => void;
  offer: Offer;
  icon: IconDefinition;
}) => {
  const { symbol } = useHomepage().itinerary.currency;

  const [id, name, time, total_duration, below_duration, extra, price] =
    offer;

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="w-full"
      key={id}
    >
      <Card
        className={`w-full ${
          isOpen ? "ring-4 ring-red-500 ring-inset" : ""
        } "!bg-zinc-50 dark:!bg-zinc-700 dark:!border-zinc-500 !px-5 mb-3 !py-4 hover:!border-red-500`}
      >
        <div
          className="flex items-center"
          style={{ fontFamily: "var(--font-barlow-semi-condensed)" }}
        >
          <div className="flex justify-center items-center w-1/12">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="flex flex-col justify-center w-10/12 px-8 text-left gap-4">
            <div className="flex">
              <div className="flex-col justify-start min-w-max w-48 ">
                <h1 className="!font-semibold">{time}</h1>
                <h1 className="text-zinc-400 text-sm ">{name}</h1>
              </div>
              <div className="flex-col w-48 text-center relative">
                <h1 className="w-full truncate items-center">
                  {total_duration}
                </h1>
                {!!below_duration && (
                  <h1 className="text-zinc-400 text-sm justify-center absolute bottom-0 left-0 right-0">
                    {below_duration}
                  </h1>
                )}
              </div>
              <div className="flex-col min-w-max">
                <h1>{extra}</h1>
                <h1 className="text-zinc-400 text-sm"></h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-2/12">
            <h1 className="font-bold">
              {symbol}
              {price}
            </h1>
          </div>
        </div>
      </Card>
    </motion.button>
  );
};

//Lazy load search results for suspense boundary
export const SearchResult = React.lazy(async () => {
  return {
    default: OfferDisplay
  };
});

export const EventList = () => {
  const { events } = useHomepage().itinerary;

  const setEvent = useCurrentEventDispatch();
  const currentEvent = useCurrentEvent();

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className="header h-[4%] min-h-max !z-2">
          <h1 className={styles.eventsHeader}>Events</h1>
        </div>
        {events.length > 0 && (
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
                    currentEvent?._id === event._id ? styles.active : ""
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
