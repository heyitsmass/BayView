import React, { ReactNode, useState, HTMLProps } from "react";
import styles from "./itineraryEvent.module.css";

type ItineraryEventProps = { 
  date:Date, 
  time:number, 
  location:string, 
  guestNumber:number
} 

export default function ItineraryEvent({date, time, location, guestNumber}:ItineraryEventProps) {
  return (
    <div className="inline-block">
      <div data-testid="event-time" className={styles.time}>
        <p className="ml-6"> {time} AM </p>
      </div>
      <div className={styles.info}>
        <p data-testid="event-location" className="inline"> {location} Reservation | </p>
        <p data-testid="guestNumber" className="inline"> {guestNumber} guests </p>
      </div>
    </div>
  );
}
