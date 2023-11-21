import { faCalendarDays, faLocationArrow, faArrowRight, faUser, faChair } from '@fortawesome/free-solid-svg-icons';
import Input from '@/components/Input';
import InputPair from '@/components/Input/InputPair';
import Button from '@/components/Button';
import Card from '@/components/HomePage/Card';
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import ReactCalendarDemo from '@/components/Input/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ValuePiece = Date | null;
export default function FlightCard() {
	const [departureDate, setDepartureDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    new Date()
  );
  const [returnDate, setReturnDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    new Date()
  );
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
          <ReactCalendarDemo
            label="Departure Date"
            placeholder="Date"
            name="departure-date"
            date={departureDate}
            setDate={setDepartureDate}
          />
          <ReactCalendarDemo
            label="Return Date"
            placeholder="Date"
            name="return-date"
            date={returnDate}
            setDate={setReturnDate}
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
