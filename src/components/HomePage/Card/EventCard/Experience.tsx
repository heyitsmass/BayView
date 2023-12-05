import UserInput from "@/components/Input";

import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ExperienceType, TExperienceType } from "@/types/Event";
import {
  faDollar,
  faLocationArrow,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";

export function ExperienceCard() {
  const props = {
    title: "Experience",
    subtitle: "Search for a fun experience!",
    btnTxt: "Find Experience",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Experience",
        type: type,
        params: {
          ...Object.fromEntries(form)
        }
      });
    }
  };

  const events = ExperienceType;

  const [type, setType] = useState(events[0] as TExperienceType);

  const [isValid, setValid] = useState(false);

  return (
    <>
      <SearchableCard {...props}>
        <BayviewCalendar name="date" label="Date" placeholder="Date..." />
        <UserInput
          placeholder="Party Size..."
          name="partySize"
          label="Party Size"
          type="number"
          icon={{ icon: faUserGroup }}
        />
        <UserInput
          icon={{ icon: faDollar }}
          type="number"
          name="priceRange"
          label="Price"
          onKeyUp={(e) =>
            setValid(new RegExp(/[0-9]*/).test(e.currentTarget.value))
          }
          placeholder="Price Limit..."
        />
        <EventDropdown event={type} setEvent={setType} data={events} />
      </SearchableCard>
    </>
  );
}
