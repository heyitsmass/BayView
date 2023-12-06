'use client';
import UserInput from "@/components/Input";
import { RelaxationType, TRelaxationType } from "@/types/Event";
import {
  faDollar,
  faLocationArrow
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown, useCurrentValue } from "./utils";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import { packages, services } from "../../EventFinder/constants";


export function RelaxationCard() {
  const props = {
    title: "Relaxation",
    subtitle: "Search for relaxation activities!",
    btnTxt: "Find Relaxation",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Relaxation",
        type: type,
        params: {
          ...Object.fromEntries(form)
        }
      });
    }
  };

  const events = RelaxationType;

  const [type, setType] = useState(events[0] as TRelaxationType);

  const [isValid, setValid] = useState(false);

  const [spaPackage, setSpaPackage] = useCurrentValue(packages[0]);
  const [spaService, setSpaService] = useCurrentValue(services[0]);

  return (
    <>
      <SearchableCard {...props}>
        <BayviewCalendar
          name="date"
          label="Date"
          placeholder="Date..."
        />
        {type !== "Park" && (
          <UserInput
            icon={{ icon: faDollar }}
            type="number"
            name="priceRange"
            label="Price"
            defaultValue="0"
            onKeyUp={(e) =>
              setValid(new RegExp(/[0-9]*/).test(e.currentTarget.value))
            }
            placeholder="Price Limit..."
          />
        )}
        {type === "Spa" && (
          <div className="border flex justify-around p-2 gap-4 rounded-3xl bg-zinc-700 pl-4 border-zinc-600 shadow-md my-2 z-10">
            <ScrollableDropdown
              data={packages}
              btnName="Package"
              title="Spa Package"
              curr={spaPackage}
              onSubmit={setSpaPackage}
            />
            <ScrollableDropdown
              data={services}
              btnName="Service"
              title="Spa Service"
              curr={spaService}
              onSubmit={setSpaService}
            />
          </div>
        )}
        <EventDropdown event={type} setEvent={setType} data={events} />
      </SearchableCard>
    </>
  );
}
