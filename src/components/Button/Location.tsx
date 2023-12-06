"use client";

import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import UserInput, { UserInputProps } from "../Input";
import { useHomepage } from "@/hooks";
import { useState } from "react";
import Button from ".";

const LocationInput = ({ ...props }: UserInputProps) => {
  const { itinerary } = useHomepage();

  const events = itinerary.events.sort(
    (a, b) => a.date.valueOf() - b.date.valueOf()
  );

  const [currLoc, setLocation] = useState<string>("");

  const [readonly, setReadonly] = useState(false);

  return (
    <UserInput
      label="Location"
      name="location"
      icon={{
        icon: faLocationArrow,
        className: "cursor-pointer",
        onClick: () => {
          if (events.length > 0) {
            setLocation(Object.values(events[0].location).join(" "));
          }
        }
      }}
      className="!w-full"
      onChange={(e) => setLocation(e.currentTarget.value)}
      placeholder="Going to..."
      value={currLoc}
      required
    />
  );
};

export default LocationInput;
