'use client';
import { Upgrades as UpgradesProps } from "@/types";
import { Upgrade } from "./Upgrade";
import { AnimatePresence, motion } from "framer-motion";
export const Upgrades = ({ options }: { options?: UpgradesProps }) => {
  return (
    <AnimatePresence>
      {options && (
        <>
          {" "}
          <motion.h2 className="text-lg truncate ellipsis">
            <motion.b>{options.title} </motion.b>- {options.currentUpgrade}{" "}
            ({options.currency}
            {options.currentPrice})
          </motion.h2>
          <motion.div className="w-full flex overflow-x-auto h-min whitespace-nowrap gap-4 py-2">
            {options.upgrades.map((upgrade, i) => (
              <Upgrade key={i} {...upgrade} {...options} />
            ))}
          </motion.div>
        </>
      )}
      {!options && (
        <motion.div
          className="flex w-full h-full items-center justify-center italic p-4"
          style={{ opacity: 0.8 }}
        >
          <motion.p>No Upgrades available</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
