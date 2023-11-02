import React, { ReactNode, useState, HTMLProps } from "react";
import styles from "./itineraryevent.module.css";


export default function ItineraryEvent( {time, location, guestNumber}) {
  return (
    <div className = "inline-block">
        <div className = {styles.time} > 
      <p className="ml-6"> {time} AM </p>
      </div> 
      <div className = {styles.info} > 
      <p className = "inline"> {location} Reservation | </p>
      <p className = "inline" > {guestNumber} guests </p>
      </div>
    </div>
  );
}
