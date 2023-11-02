import React, { ReactNode, useState, HTMLProps } from "react";
import styles from "./itineraryevent.module.css";

export default function ItineraryEvent(props: { date: number, time: number, location: string, guestNumber: number }) {
  return (
    <div className="inline-block">
      <div className={styles.time}>
        <p className="ml-6"> {props.time} AM </p>
      </div>
      <div className={styles.info}>
        <p className="inline"> {props.location} Reservation | </p>
        <p className="inline"> {props.guestNumber} guests </p>
      </div>
    </div>
  );
}
