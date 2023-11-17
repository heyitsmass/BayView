"use client";

import AnimationComponent from "@/components/Animations/AnimatePresenceComponent";
import DiningCard from "@/components/HomePage/Card/DiningCard";
import FlightCard from "@/components/HomePage/Card/FlightCard";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.css";

export default function Page() {
  return (
    <AnimatePresence>
      <AnimationComponent transition={{ duration: 0.5 }}>
        <div className={styles.contentGrid}>
          {/* Card Components here */}
          <FlightCard></FlightCard>
          <DiningCard></DiningCard>
        </div>
      </AnimationComponent>
    </AnimatePresence>
  );
}
