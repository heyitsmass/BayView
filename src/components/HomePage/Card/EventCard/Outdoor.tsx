'use client';
import UserInput from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import {
  Difficulty,
  GolfHoles,
  OutdoorType,
  TOutdoorType
} from "@/types/Event";
import {
  faLocationArrow,
  faPersonBiking,
  faPersonHiking,
  faRoad
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown, useCurrentValue } from "./utils";
import Select from "@/components/Select";
import { useHomepage } from "@/hooks";
import LocationInput from "@/components/Button/Location";

export function OutdoorCard() {
  const props = {
    title: "Outdoor",
    subtitle: "Search for outdoor activities!",
    btnTxt: "Find Activities",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Outdoor",
        type: type,
        params: {
          ...Object.fromEntries(form)
        }
      });
    }
  };

  const { distanceUnit } = useHomepage().itinerary;

  const events = OutdoorType;

  const [type, setType] = useState(events[0] as TOutdoorType);


  const [difficulty, setDifficulty] = useCurrentValue(Difficulty[0]);
  const [holes, setHoles] = useCurrentValue(GolfHoles[0]);
  return (
    <>
      <SearchableCard {...props}>
        <LocationInput
          label="Location"
          name="location"
          icon={{ icon: faLocationArrow }}
          placeholder="Going to..."
          required
        />

        {type !== "Golf" && (
          <span className="grid grid-cols-2 gap-4">
            <UserInput
              type="number"
              name="distance"
              label="Distance"
              icon={{
                icon: type === "Biking" ? faPersonBiking : faPersonHiking
              }}
              placeholder="Distance..."
              defaultValue="0"
              required
            />
            <Select
              icon={{ icon: faRoad }}
              options={[
                {
                  value: "mi",
                  label: "Miles"
                },
                {
                  value: "km",
                  label: "Kilometers"
                }
              ]}
              defaultValue={distanceUnit}
              name="distanceUnits"
              label="Units"
            />
          </span>
        )}
        {type === "Golf" && (
          <BayviewCalendar name="date" label="Date" placeholder="Date..." />
        )}
        <div className="border rounded-3xl pl-4 py-2 mt-2 bg-zinc-700 border-zinc-600 shadow-md">
          <div className="grid grid-cols-3 place-items-center">
            <span className="col-span-2 flex justify-baseline w-full gap-4 h-full">
              <ScrollableDropdown
                data={Difficulty}
                btnName={`${type !== "Golf" ? "Trail " : ""}Difficulty`}
                curr={difficulty}
                onSubmit={setDifficulty}
                title="Difficulty"
              />

              {type === "Golf" && (
                <ScrollableDropdown
                  data={GolfHoles}
                  btnName="Holes"
                  curr={holes}
                  onSubmit={setHoles}
                  title="Course Length"
                />
              )}
            </span>

            <span className="col-3">
              <EventDropdown
                event={type}
                setEvent={setType}
                data={events}
              />
            </span>
          </div>
        </div>
      </SearchableCard>
    </>
  );
}
