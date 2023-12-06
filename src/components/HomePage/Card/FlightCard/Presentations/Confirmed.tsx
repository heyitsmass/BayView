'use client';
import { DisplayableEvent } from "@/components/HomePage/EventFinder";
import { useHomepageManager } from "@/hooks";
import { Flight } from "@/types/Event";
import { Offer } from "@duffel/api/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import Card from "../..";
import { FlightContext } from "../flightState";

export default function Confirmed() {
  const { dispatch, flightState } = useContext(FlightContext);
  const manager = useHomepageManager();

  // Extracting the selected offer details
  const selectedOffer = useMemo(
    () => flightState.selectState.selectedOffer,
    [flightState.selectState.selectedOffer]
  );

  const returnFlight = useMemo(
    () => flightState.selectState.returnFlight,
    [flightState.selectState.returnFlight]
  );

  const [wasAdded, setWasAdded] = useState(false);

  const addEvent = useCallback(async () => {
    if (selectedOffer && returnFlight.selectedOffer) {
      try {
        await manager({
          type: "event",
          mode: "add",
          payload: {
            date: new Date(
              selectedOffer.offer.slices[0].segments[0].departing_at
            ),
            departingFlight: selectedOffer,
            returnFlight: returnFlight.selectedOffer,
            __t: "Flight"
          } as DisplayableEvent<Flight>
        });
        setWasAdded(true);
      } catch (err) {
        console.log(err);
      }
    }
  }, [manager, selectedOffer, returnFlight]);

  useEffect(() => {
    if (!wasAdded) {
      addEvent();
    }
  }, [wasAdded, addEvent]);

  const prettyPrintDate = dateString => {
		const d = new Date(dateString);
		return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
	};

	const formatDurationToHoursMinutes = (totalMinutes) => {
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;

		return (hours ? `${hours}hr ` : '') + (minutes ? `${minutes}min` : hours ? '' : '0min');
	};


	return (
		<form className="mb-4 mt-8 mx-4 w-100 text-center">
			<h1 className="text-3xl pb-8">Added to Itinerary ✅</h1>
			<Card title={`Flight to ${selectedOffer?.offer.slices[selectedOffer && selectedOffer.offer.slices.length - 1].destination.city_name}`}>
				{/* Displaying departing flight details */}
				<Card className="my-4 text-left">
					<div className="p-2">
						<h3 className="text-lg font-bold">Departing</h3>
						<p>
							{selectedOffer?.offer && selectedOffer.offer.slices[0].segments[0].marketing_carrier.name}{' '}
							{selectedOffer?.offer && selectedOffer.offer.slices[0].segments[0].marketing_carrier.iata_code}{' '}
							{selectedOffer?.offer && selectedOffer.offer.slices[0].segments[0].marketing_carrier_flight_number}
						</p>
						<p>{selectedOffer?.offer && formatDurationToHoursMinutes(selectedOffer?.offer.total_duration)}</p>
						<p>
							{selectedOffer && selectedOffer.offer.slices[0].origin.iata_code} <FAIcon icon={faArrowRight} />{' '}
							{selectedOffer && selectedOffer.offer.slices[selectedOffer && selectedOffer.offer.slices.length - 1].destination.iata_code}
						</p>
						<p>{prettyPrintDate(flightState.searchState.formValues.departure_date)}</p>
					</div>
				</Card>

				{/* Conditionally displaying return flight details */}
				{flightState.roundTrip && returnFlight.selectedOffer && (
					<Card className="my-4 text-left">
							<div className="p-2">
							<h3 className="text-lg font-bold">Returning</h3>
							<p>
								{returnFlight.selectedOffer?.offer &&
									returnFlight.selectedOffer.offer.slices[returnFlight.selectedOffer.offer.slices.length - 1].segments[
										returnFlight.selectedOffer.offer.slices.length - 1
									].marketing_carrier.name}{' '}
								{returnFlight.selectedOffer?.offer &&
									returnFlight.selectedOffer.offer.slices[returnFlight.selectedOffer.offer.slices.length - 1].segments[
										returnFlight.selectedOffer.offer.slices.length - 1
									].marketing_carrier.iata_code}{' '}
								{returnFlight.selectedOffer?.offer &&
									returnFlight.selectedOffer.offer.slices[returnFlight.selectedOffer.offer.slices.length - 1].segments[
										returnFlight.selectedOffer.offer.slices.length - 1
									].marketing_carrier_flight_number}
							</p>
							<p>{returnFlight.selectedOffer?.offer && formatDurationToHoursMinutes(returnFlight.selectedOffer?.offer.total_duration)}</p>
							<p>
								{returnFlight.selectedOffer && returnFlight.selectedOffer.offer.slices[0].origin.iata_code} <FAIcon icon={faArrowRight} />{' '}
								{returnFlight.selectedOffer &&
									returnFlight.selectedOffer.offer.slices[returnFlight.selectedOffer && returnFlight.selectedOffer.offer.slices.length - 1]
										.destination.iata_code}
							</p>
							<p>{prettyPrintDate(flightState.searchState.formValues.return_date)}</p>
					</div>
						</Card>
				)}
			</Card>
		</form>
	);
}

const FAIcon = React.memo(({ ...props }: FontAwesomeIconProps) => {
	return <FontAwesomeIcon {...props} />;
});
FAIcon.displayName = 'FAIcon';
