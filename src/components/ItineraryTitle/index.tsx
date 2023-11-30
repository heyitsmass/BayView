import { useHomepage, useHomepageManager } from "@/hooks";
import { ParkLocations, Parks } from "@/types";
import {
  faCalendar,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PrebuiltDialog } from "../Dialog";
import itineraryTitleCSS from "./itinerarytitle.module.css";

export default function ItineraryTitle() {
  const [isOpen, setIsOpen] = useState(false);
  const { location, events, title } = useHomepage().itinerary;

  const startDate = events
    .sort((a, b) => a.date.valueOf() - b.date.valueOf())
    .at(0)?.date;

  const endDate = events.at(-1)?.date;

  const dateRange =
    startDate && endDate
      ? `${startDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })} - ${endDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })}`
      : "No Events!";

  const manager = useHomepageManager();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLocationChange = async (newLocation: ParkLocations) => {
    try {
      if (newLocation === location) {
        return;
      }
      await manager({
        type: "itinerary",
        mode: "update",
        payload: {
          location: newLocation
        }
      });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    try {
      if (newTitle === title) {
        return;
      }
      await manager({
        type: "itinerary",
        mode: "update",
        payload: {
          title: newTitle
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [isActive, setActive] = useState(false);

  return (
    <div data-testid="title-check" className={itineraryTitleCSS.title}>
      <div className={itineraryTitleCSS.header}>
        <div
          className="flex relative w-full"
          onClick={() => setActive(true)}
        >
          {(isActive && (
            <input
              className="bg-transparent border-b-2 border-transparent focus:border-rose-800 outline-none"
              defaultValue={title || "Untitled Itinerary"}
              disabled={!isActive}
              onBlur={(e) => {
                setActive(false);
                handleTitleChange(e.target.value);
              }}
            />
          )) || (
            <span className="border-b-2 border-transparent selection:bg-transparent">
              {title || "Untitled Itinerary"}
            </span>
          )}
        </div>
      </div>
      <div className="pt-8">
        <div className="flex items-center w-max" onClick={openModal}>
          <FontAwesomeIcon icon={faLocationDot} className="inline" />
          <p className="font-bold px-2">
            {location || "Click to set a location!"}
          </p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendar} />
          <p className="font-bold px-2 py-0">{dateRange}</p>
        </div>

        <PrebuiltDialog
          open={isOpen}
          onClose={closeModal}
          title="Select Location!"
        >
          <div className="block mt-6">
            {Parks.map((park, i) => (
              <label className="block" key={i}>
                <input
                  type="radio"
                  value={park}
                  name="Location"
                  onChange={async (e) => {
                    e.preventDefault();
                    await handleLocationChange(park);
                  }}
                  checked={location === park}
                />{" "}
                {park}
              </label>
            ))}
          </div>
        </PrebuiltDialog>
      </div>
    </div>
  );
}
