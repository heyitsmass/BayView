import React, { ReactNode, useState, HTMLProps } from "react";
import styles from "./itineraryevent.module.css";

type ItineraryEventProps = { 
  date:Date, 
  time:number, 
  location:string, 
  guestNumber:number
} 

export default function ItineraryEvent({date, time, location, guestNumber}:ItineraryEventProps) {
  return (
    <div className="inline-block">
      <div className={styles.time}>
        <p className="ml-6"> {time} AM </p>
      </div>
      <div className={styles.info}>
        <p className="inline"> {location} Reservation | </p>
        <p className="inline"> {guestNumber} guests </p>
      </div>
    </div>
  );
}
