import {
  faCalendarDays,
  faLocationArrow,
  faArrowRight,
  faUser,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import InputPair from "@/components/Input/InputPair";
import Button from "@/components/Button";
import Card from "@/components/HomePage/Card";
import BayviewCalendar from "@/components/Input/BayviewCalendar";

export default function LodgingCard() {
  return (
    <Card title="Lodging" subtitle="search for lodging reservations">
      <form>
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
        <Button variant="secondary" className="mt-4">
          Find Hotels
        </Button>
      </form>
    </Card>
  );
}
const preventMinus = (e: { code: string; preventDefault: () => void }) => {
  if (e.code === "Minus") {
    e.preventDefault();
  }
};
