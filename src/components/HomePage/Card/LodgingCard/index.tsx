import Input from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import InputPair from "@/components/Input/InputPair";
import {
  faArrowRight,
  faLocationArrow,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";

export default function LodgingCard() {
  const props = {
    title: "Lodging",
    subtitle: "search for lodging reservations",
    btnTxt: "Find Hotels",
    handleSearch: async (form: FormData) =>
      findEvents({
        activity: "Reservation",
        type: "Hotel",
        params: {
          ...Object.fromEntries(form)
        }
      })
  };
  return (
    <SearchableCard {...props}>
      <Input
        label="Location"
        name="lodgingLocation"
        icon={{ icon: faLocationArrow }}
        placeholder="Going to..."
        required
      />
      <InputPair icon={faArrowRight}>
        <BayviewCalendar
          label="Check-In Date / Time"
          name="check-in-date"
          placeholder="Check-in Date / Time"
          minDate={new Date(Date.now())}
          includeTime
        />
        <BayviewCalendar
          label="Check-Out Date / Time"
          name="check-out-date"
          placeholder="Check-Out Date / Time"
          minDate={new Date(Date.now())}
          includeTime
        />
      </InputPair>
      <div className="display: flex gap-3">
        <Input
          label="Number of Guests"
          name="adult_count"
          icon={{ icon: faUser }}
          type="number"
          min="0"
          placeholder="Adults"
          required
          onKeyDown={preventMinus}
        />
        <Input
          name="children_count"
          icon={{ icon: faUser }}
          placeholder="Children"
          min="0"
          type="number"
          required
          onKeyDown={preventMinus}
        />
        <Input
          name="room_count"
          icon={{ icon: faUser }}
          placeholder="Rooms"
          min="0"
          type="number"
          required
          onKeyDown={preventMinus}
        />
      </div>
    </SearchableCard>
  );
}
const preventMinus = (e: { code: string; preventDefault: () => void }) => {
  if (e.code === "Minus") {
    e.preventDefault();
  }
};
