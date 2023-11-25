import { faArrowRight, faLocationArrow, faCalendarDays, faUser, faChair } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { FlightContext } from '../flightState';
import Card from '../..';
import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FlightActionInterface, FlightStateInterface } from '../flightInterfaces';
import { Offer } from '@duffel/api/types';

export default function Confirmed() {
	const { dispatch, flightState } = useContext(FlightContext);

	// Extracting the selected offer details
	const { selectedOffer, returnFlight } = flightState.selectState;

	const prettyPrintDate = (dateString) =>
		`${parseInt(dateString.substring(5, 7), 10)}/${parseInt(dateString.substring(8, 10), 10)}/${dateString.substring(2, 4)}`;

	const isoDurationToMilliseconds = (duration) => {
		const hoursMatch = duration.match(/(\d+)H/);
		const minutesMatch = duration.match(/(\d+)M/);

		const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
		const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

		return (hours * 60 * 60 + minutes * 60) * 1000;
	};

	const formatDurationToHoursMinutes = (totalMinutes) => {
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;

		return (hours ? `${hours}hr ` : '') + (minutes ? `${minutes}min` : hours ? '' : '0min');
	};

	const calculateTotalDuration = (offer: Offer) => {
		if (!offer) {
			return 0 + ' ';
		}

		let totalDuration = 0;

		offer.slices.forEach((slice) => {
			const sliceDuration = slice.segments.reduce((duration, segment, index, segments) => {
				// Calculate duration of the current segment
				let segmentDuration = isoDurationToMilliseconds(segment.duration);

				// Calculate layover duration, if there's a next segment
				if (index < segments.length - 1) {
					const currentSegmentArrival = new Date(segment.arriving_at).getTime();
					const nextSegmentDeparture = new Date(segments[index + 1].departing_at).getTime();
					const layoverTime = nextSegmentDeparture - currentSegmentArrival;

					// Add the layover time to the segment duration
					segmentDuration += layoverTime;
				}

				return duration + segmentDuration;
			}, 0);

			// Convert duration from milliseconds to minutes and add to total duration
			totalDuration += sliceDuration / 60000;
		});

		console.log(totalDuration);

		return totalDuration;
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
