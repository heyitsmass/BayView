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

export default function FlightCard() {
  return (
    <Card title="Flights" subtitle="search, book, and add to itinerary">
      <form>
        <InputPair icon={faArrowRight}>
          <Input
            label="Departing From"
            name="departure"
            icon={{ icon: faLocationArrow }}
            placeholder="e.g.  New York"
            required
          />
          <Input
            label="Arriving To"
            name="destination"
            icon={{ icon: faLocationArrow }}
            placeholder="e.g.  Los Angeles"
            required
          />
        </InputPair>
        <InputPair icon={faArrowRight}>
          <Input
            label="Departure Date"
            name="departure-date"
            icon={{ icon: faCalendarDays }}
            placeholder="Date"
            required
          />
          <Input
            label="Return Date"
            name="return-date"
            icon={{ icon: faCalendarDays }}
            placeholder="Date"
            required
          />
        </InputPair>
        <InputPair>
          <Input
            label="Number Passengers"
            name="number_of_passengers"
            icon={{ icon: faUser }}
            type="number"
            placeholder="Passengers"
            required
          />
          <Input
            name="cabin_preference"
            icon={{ icon: faChair }}
            placeholder="Cabin Preference"
          />
        </InputPair>
        <Button variant="secondary" className="mt-4">
          Find Flights
        </Button>
      </form>
    </Card>
  );
}
