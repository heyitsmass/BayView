import { faCalendarDays, faLocationArrow, faArrowRight, faUser, faChair } from '@fortawesome/free-solid-svg-icons';
import Input from '@/components/Input';
import InputPair from '@/components/Input/InputPair';
import Button from '@/components/Button';
import Card from '@/components/HomePage/Card';
import { useState, useEffect } from "react";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ValuePiece = Date | null;
export default function FlightCard() {
	const [departureDate, setDepartureDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    null
  );
  const [returnDate, setReturnDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    null
  );
   const [disabled, setDisabled] = useState(false);
   const checkDate = (departureDate) => {
      if (departureDate != null) {
        setDisabled(false);
      }
      else {
        setDisabled(true);
      }
    }
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
