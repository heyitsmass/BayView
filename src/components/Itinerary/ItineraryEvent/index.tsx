import React, { ReactNode, useState, HTMLProps } from "react";
import itineraryTitleCSS from "./itinerarytitle.module.css";
import EditableInputField from "@/components/Input/EditableInputField";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
