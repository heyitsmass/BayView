import UserInput from "@/components/Input";
import {
  EntertainmentType,
  TEntertainmentType,
  TSportEvent
} from "@/types/Event";
import { TEntertainmentQuery } from "@/types/query";
import {
  faChild,
  faDollar,
  faLocationArrow,
  faPerson,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import { Concerts } from "../../EventFinder/findEntertainment";
import Select from "@/components/Select";

export function EntertainmentCard<
  T extends TEntertainmentType,
  S extends TSportEvent
>() {
  const props = {
    title: "Entertainment",
    subtitle: "Search for something entertaining!",
    btnTxt: "Find Event",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Entertainment",
        type: type,
        subtype: type === "Sports" ? (form.get("subtype") as S) : undefined,
        params: {
          ...Object.fromEntries(form)
        } as TEntertainmentQuery<T, S>
      });
    }
  };
  const events = EntertainmentType;

  const [type, setType] = useState(events[0] as TEntertainmentType);

  const [isValid, setValid] = useState(false);
  return (
    <>
      <SearchableCard {...props}>
        <BayviewCalendar name="date" label="Date" placeholder="Date..." />
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
        <div className="flex">
          <UserInput
            name="childCount"
            label="Children"
            type="number"
            placeholder="Children..."
            defaultValue={"0"}
            icon={{ icon: faChild }}
          ></UserInput>
          <UserInput
            name="adultCount"
            label="Adults"
            type="number"
            placeholder="Adults..."
            defaultValue={1}
            icon={{ icon: faPerson }}
          ></UserInput>
        </div>
        {type === "Concert" && (
          <>
            <ScrollableDropdown
              data={Concerts}
              btnName="Concert"
              title="Concert Selection"
              peek={Concerts[0]}
            />
          </>
        )}
        {type === "Sports" && (
          <ScrollableDropdown
            data={[
              "Basketball",
              "Baseball",
              "Hockey",
              "Tennis",
              "Football",
              "Soccer"
            ]}
            btnName="Sport"
            title="Sport Selection"
            peek="Basketball"
          />
        )}
        <EventDropdown event={type} setEvent={setType} data={events} />
      </SearchableCard>
    </>
  );
}
