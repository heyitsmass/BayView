import {
  faCalendarDays,
  faLocationArrow,
  faArrowRight,
  faUser,
  faChair,
  faUserGroup,
  faClock,
  faClockFour
} from '@fortawesome/free-solid-svg-icons';
import Input from '@/components/Input';
import InputPair from '@/components/Input/InputPair';
import Button from '@/components/Button';
import Card from '@/components/HomePage/Card';

export default function DiningCard() {
  return (
    <Card
      title="Dining"
      subtitle="search dining availability and add to itinerary"
    >
      <form>
        <Input
          label="Party Size"
          icon={{ icon: faUserGroup }}
          placeholder="Party Size"
          type="number"
          max={10}
        ></Input>
        <Input
          label="Booking Date"
          icon={{ icon: faCalendarDays }}
          placeholder="Booking Date"
        ></Input>
        <InputPair icon={faArrowRight}>
          <Input icon={{icon:faClock}} label="Start Time" placeholder="Start time"></Input>
          <Input icon={{icon:faClock}} label="End Time" placeholder="End time"></Input>
        </InputPair>
        <Button variant="secondary" className="mt-4">
          Find Availability
        </Button>
      </form>
    </Card>
  );
}
