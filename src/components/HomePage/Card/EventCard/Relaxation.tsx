import UserInput from "@/components/Input";
import { RelaxationType, TRelaxationType } from "@/types/Event";
import {
  faDollar,
  faLocationArrow
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";

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

  return (
    <>
      <SearchableCard {...props}>
        <BayviewCalendar name="date" label="Date" placeholder="Date..." />
        {type !== "Park" && (
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
        )}
        <EventDropdown event={type} setEvent={setType} data={events} />
      </SearchableCard>
    </>
  );
}
