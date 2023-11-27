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
          <Input
            label="Check-In Date"
            name="check-in-date"
            icon={{ icon: faCalendarDays }}
            placeholder="Check-in Date"
            required
          />
          <Input
            label="Check-Out Date"
            name="check-out-date"
            icon={{ icon: faCalendarDays }}
            placeholder="Check-Out Date"
            required
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
