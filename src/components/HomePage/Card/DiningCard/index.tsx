import Button from "@/components/Button";
import Card from "@/components/HomePage/Card";
import Input from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import InputPair from "@/components/Input/InputPair";
import { ItineraryEvent } from "@/components/Itinerary/Event";
import { Modal, useOpen } from "@/components/Modal";
import { useHomepageManager } from "@/hooks";
import { DisplayableEvent } from "@/lib/random/handler";
import {
  faArrowRight,
  faClock,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { Suspense, useState } from "react";
import { findEvents } from "../Activity/handlers/findEvents";

export default function DiningCard() {
  const [data, setData] = useState(null as DisplayableEvent[] | null);

  const manager = useHomepageManager();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const set = await findEvents(formData, { event: "Dining" });
    setData(set);
    setIsSubmitted(true);
  };

  const [completed, setCompleted] = useState(false);
  const [currEvent, setCurrEvent] = useState(
    null as DisplayableEvent | null
  );

  const [isOpen, open, close] = useOpen();

  const handleAddEvent = async (event: DisplayableEvent) => {
    /* perform work */

    try {
      await manager({
        type: "event",
        mode: "add",
        payload: event
      });
      setCompleted(true);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card
      title="Dining"
      subtitle="search dining availability and add to itinerary"
    >
      {!isSubmitted && (
        <form action={handleSubmit}>
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
          <Button variant="secondary" className="mt-4">
            Find Availability
          </Button>
        </form>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        {isSubmitted && (
          <>
            <div className="overflow-y-scroll">
              {data!.map((event, i) => (
                <>
                  <ItineraryEvent
                    {...event}
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrEvent(event);
                      open();
                    }}
                  />
                </>
              ))}
            </div>
            {currEvent && (
              <Modal isOpen={isOpen} close={close}>
                <Modal.Body>
                  {
                    <div>
                      <pre>
                        {JSON.stringify(currEvent.displayData, null, 2)}
                      </pre>
                    </div>
                  }
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleAddEvent(currEvent);
                    }}
                  >
                    Add To Itinerary
                  </button>
                </Modal.Body>
              </Modal>
            )}
          </>
        )}
      </Suspense>
    </Card>
  );
}
