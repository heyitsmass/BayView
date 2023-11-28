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
import {useState} from "react";
type ValuePiece = Date | null;
export default function LodgingCard() {
  const [departureDate, setDepartureDate] = useState<
    ValuePiece | [ValuePiece, ValuePiece]
  >(null);
  const [returnDate, setReturnDate] = useState<
    ValuePiece | [ValuePiece, ValuePiece]
  >(null);
  const [disabled, setDisabled] = useState(false);
  const checkDate = (departureDate) => {
    if (departureDate != null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

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
              label="Departure Date"
              placeholder="Date"
              title="Departure"
              date={departureDate}
              minDate={new Date()}
              setDate={setDepartureDate}
              disabled={false}
            />
            <BayviewCalendar
              label="Return Date"
              placeholder="Date"
              title="Return"
              date={returnDate}
              minDate={departureDate}
              setDate={setReturnDate}
              disabled={departureDate === null ? true : false}
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
