import UserInput from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import { OutdoorType, TOutdoorType } from "@/types/Event";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";

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

  const events = OutdoorType;

  const [type, setType] = useState(events[0] as TOutdoorType);

  return (
    <>
      <SearchableCard {...props}>
        <UserInput
          label="Location"
          name="location"
          icon={{ icon: faLocationArrow }}
          placeholder="Going to..."
          required
        />
        <BayviewCalendar name="date" label="Date" placeholder="Date..." />
        {type === "Golf" && (
          <>
            <ScrollableDropdown
              data={["9 Holes", "18 Holes"]}
              btnName="Holes"
              peek={"18 Holes"}
              title="Course Length"
            />
            <ScrollableDropdown
              data={[
                "Beginner",
                "Intermediate",
                "Advanced",
                "Professional"
              ]}
              btnName="Difficulty"
              peek={"Beginner"}
              title="Difficulty"
            />
          </>
        )}

        <EventDropdown event={type} setEvent={setType} data={events} />
      </SearchableCard>
    </>
  );
}
