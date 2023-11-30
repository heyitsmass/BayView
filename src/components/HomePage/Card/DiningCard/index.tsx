import Button from "@/components/Button";
import Input from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import InputPair from "@/components/Input/InputPair";
import { useHomepageManager } from "@/hooks";
import { DisplayableEvent } from "@/lib/random/handler";
import {
  faArrowRight,
  faClock,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { findEvents } from "../Activity/handlers/findEvents";
import { SearchableCard } from "../Searchable";

export default function DiningCard() {
  const manager = useHomepageManager();

  const props = {
    title: "Dining",
    subtitle: "search dining availability and add to itinerary",
    btnTxt: "Find Availability",
    handleAddEvent: async (event: DisplayableEvent) =>
      manager({
        type: "event",
        mode: "add",
        payload: event
      }),
    handleSearch: async (form: FormData) =>
      findEvents(form, { event: "Dining" })
  };

  return (
    <SearchableCard {...props}>
      <Input
        label="Party Size"
        icon={{ icon: faUserGroup }}
        placeholder="Party Size"
        type="number"
        max={10}
      ></Input>
      <BayviewCalendar
        label="Booking Date"
        name="booking_date"
        placeholder="Booking Date"
        minDate={new Date(Date.now())}
      />
      <InputPair icon={faArrowRight}>
        <Input
          icon={{ icon: faClock }}
          label="Start Time"
          placeholder="Start time"
        ></Input>
        <Input
          icon={{ icon: faClock }}
          label="End Time"
          placeholder="End time"
        ></Input>
      </InputPair>
    </SearchableCard>
  );
}
