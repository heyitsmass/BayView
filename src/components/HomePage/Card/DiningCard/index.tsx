'use client';
import Button from "@/components/Button";
import Input from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import InputPair from "@/components/Input/InputPair";
import { useHomepageManager } from "@/hooks";

import {
  faArrowRight,
  faClock,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { DisplayableEvent, findEvents } from "../../EventFinder";
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
      findEvents({
        activity: "Reservation",
        type: "Dining",
        params: {
          ...Object.fromEntries(form)
        }
      })
  };

  return (
    <SearchableCard {...props}>
      <Input
        label="Party Size"
        icon={{ icon: faUserGroup }}
        placeholder="Party Size"
        type="number"
        min={0}
        defaultValue={1}
        max={10}
      ></Input>
      <BayviewCalendar
        label="Booking Date"
        name="booking_date"
        placeholder="Booking Date"
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
