import Button from '@/components/Button';
import InputPair from '@/components/Input/InputPair';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { faArrowRight, faLocationArrow, faCalendarDays, faUser, faChair } from '@fortawesome/free-solid-svg-icons';
import { easeInOut, motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import { FlightContext } from '../flightState';
import { flightSearchAction } from '../flightActions';
import { stepDetails } from '..';
import { BlurOpacityAnimation } from '@/components/Animations/AnimatePresenceComponent';
import BayviewCalendar from '@/components/Input/BayviewCalendar';

export default function Search() {
	const { dispatch, flightState } = useContext(FlightContext);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSuccess = (response) => {
	
		// Modify the title of the search step if we find specific data exits on the response endpoint
		if (response.data?.slices) {
			const cityName = response.data?.slices[0]?.destination.name;
			if (cityName) {
				dispatch({
					...flightState, 
					type: 'UPDATE_FLIGHT_STATE',
					payload: {
						step: 2,
						cardTitle: stepDetails[2].title + cityName,
						cardSubtitle: stepDetails[2].subtitle + response.data?.slices[0]?.origin.name,
						isExiting: true,
						places: [response.data?.slices[0]?.origin, response.data?.slices[0]?.destination],
						selectState: {
							...flightState.selectState,
							data: response.data
						}
					},
				});
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		dispatch({
			type: 'UPDATE_FLIGHT_STATE',
			payload: {
				cardTitle: "Fetching Departing Flights",
				cardSubtitle: 'this should only take a moment',
				contentPending: true,
			},
		});

		// Collect form data
		if (formRef.current !== null) {
			const formData = new FormData(formRef.current);
			const formValues = Object.fromEntries(formData);

			const formRequest = {
				departure_date: (formValues.departure_date as string) || '',
				return_date: (formValues.return_date as string) || '',
				origin: (formValues.origin as string) || '',
				destination: (formValues.destination as string) || '',
				number_of_passengers: Number(formValues.number_of_passengers) || 1,
				class: (formValues.class as string) || 'economy',
			};

			try {
				// Await the server action
				const response = await flightSearchAction(formRequest);

				// if successful update the state with the entered values
				// Set roundTrip based on form values
				dispatch({
					type: 'UPDATE_SEARCH_STATE',
					payload: {
						formValues: formRequest
					},
				});

				dispatch({
					type: 'UPDATE_FLIGHT_STATE',
					payload: {
						roundTrip: formRequest.return_date !== ''
					}
				})

				// Handle success
				handleSuccess(response);
			} catch (error) {
				// Handle any errors here
				console.error('Server request failed', error);
				// TODO: Replace with proper message
				alert("TODO: REPLACE THIS:" + error);
			} finally {
				// Reset the pending state regardless of success or failure
				dispatch({ type: 'UPDATE_FLIGHT_STATE', payload: { contentPending: false } });
			}
		}
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="m-1">
			<BlurOpacityAnimation transitionOn={flightState.contentPending}>
				<InputPair icon={faArrowRight}>
					<Input
						label="Departing From"
						name="origin"
						defaultValue={flightState.searchState.formValues?.origin || ''}
						icon={{ icon: faLocationArrow }}
						placeholder="e.g.  New York"
						required
					/>
					<Input
						label="Arriving To"
						defaultValue={flightState.searchState.formValues?.destination || ''}
						name="destination"
						icon={{ icon: faLocationArrow }}
						placeholder="e.g.  Los Angeles"
						required
					/>
				</InputPair>
				<InputPair icon={faArrowRight}>
					<BayviewCalendar
						label="Departure Date"
						value={flightState.searchState.formValues?.departure_date}
						name="departure_date"
						placeholder="Date"
						minDate={new Date(Date.now())}
					/>
					<BayviewCalendar
						label="Return Date"
						value={flightState.searchState.formValues?.return_date}
						name="return_date"
						placeholder="Date"
						minDate={new Date(Date.now())}
					/>
				</InputPair>
				<InputPair>
					<Input
						label="Number Passengers"
						defaultValue={flightState.searchState.formValues?.number_of_passengers || 1}
						name="number_of_passengers"
						icon={{ icon: faUser }}
						type="number"
						placeholder="Passengers"
					/>
					<Select
						icon={{ icon: faChair }}
						label="Cabin Selection"
						name="class"
						defaultValue={flightState.searchState.formValues?.class || 'economy'}
						options={[
							{ value: 'economy', label: 'Economy' },
							{ value: 'premium_economy', label: 'Premium Economy' },
							{ value: 'business', label: 'Business' },
							{ value: 'first', label: 'First' }
						]}
					/>
				</InputPair>
			</BlurOpacityAnimation>
			<Button type="submit" className="!mt-4" pending={flightState.contentPending ? 'true' : undefined} variant="secondary">
				Find Flights
			</Button>
		</form>
	);
}
