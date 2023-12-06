"use client";
import { useCurrentEvent } from "@/hooks";
import { DisplayData } from "@/types";
import { PartyMember } from "@/types/User";
import { DisplayableEvent } from "../HomePage/EventFinder";
import { InfoCard, InfoMap } from "./InfoCard";
import { Party } from "./Party";
import { Upgrades } from "./Upgrades";
import styles from "./currentEvent.module.css";

import { faker } from "@faker-js/faker";
import { Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useEffect, useRef } from "react";
import { Loading } from "../HomePage/Card";

type CurrentEventProps = {
  members: PartyMember[];
};

const InfoPanel = ({
  event,
  isPending
}: {
  event: DisplayableEvent;
  isPending?: boolean;
}) => {
  const { name } = event;

  /**
  const splitName = (name: string) => {
    const split = name.split(/[A-Z]/).filter((s) => !!s);

    if (split.length > 1) {
      return [
        name.charAt(0) + split[0],
        name.charAt(split[0].length + 1) + split[1]
      ].join(" ");
    }

    return name;
  };
 */
  return (
    <motion.section className={styles.sub_card}>
      <motion.h2 className="text-xl font-bold capitalize w-full pb-2 truncate ellipsis">
        {isPending ? `Checking for updates` : `${event.__t} - ${name}`}
        {isPending && <Loading />}
      </motion.h2>
      <InfoCard {...event} isPending={isPending} />
    </motion.section>
  );
};

const ModifyPanel = ({
  upgradeOptions
}: {
  upgradeOptions: DisplayData["upgradeOptions"];
}) => {
  return (
    <motion.section className={styles.modify}>
      <motion.div className={styles.header}>
        <motion.h1 className="text-xl font-bold min-w-max self-baseline pb-2">
          Modify Reservation
        </motion.h1>
        <Party />
      </motion.div>
      <motion.div className={styles.wrapper}>
        <Upgrades options={upgradeOptions} />
      </motion.div>
    </motion.section>
  );
};

const MiddlePanel = ({
  displayData
}: {
  displayData: DisplayData["displayData"];
}) => {
  return (
    <motion.section className={styles.mid_card}>
      <motion.h2 className="text-2xl font-bold">Reservation Info</motion.h2>
      <InfoMap data={displayData} />
    </motion.section>
  );
};

export const CurrentEvent = () => {
  const currEvent = useCurrentEvent();

  const eventRef = useRef(currEvent);

  const ref = React.useRef<HTMLDivElement>(null);

  const [isPending, setIsPending] = React.useState(false);

  useEffect(() => {
    if (eventRef?.current !== currEvent) {
      setIsPending(true);
      setTimeout(() => {
        eventRef.current = currEvent;
        setIsPending(false);
      }, faker.number.int({ min: 1200, max: 2400 }));
    }
  }, [currEvent]);

  return (
    <AnimatePresence>
      <Transition show={!!currEvent} ref={ref} as={Fragment}>
        <motion.div
          className={styles.card}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          }}
          initial={{
            opacity: 0,
            y: -10,
            filter: "blur(5px)"
          }}
          exit={{
            opacity: 0,
            y: -10,
            filter: "blur(5px)"
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.2
          }}
        >
          {eventRef.current && (
            <>
              <InfoPanel event={eventRef.current} isPending={isPending} />
              <MiddlePanel {...eventRef.current} />
              <ModifyPanel
                upgradeOptions={eventRef.current.upgradeOptions}
              />
            </>
          )}

          {!currEvent && (
            <motion.div className={styles.empty}>
              <motion.div className="header h-[4%] min-h-max !z-2">
                <motion.h2 className="text-3xl font-bold px-8 pl-2 z-[999]">
                  No Upcoming Events
                </motion.h2>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </Transition>
    </AnimatePresence>
  );
};
