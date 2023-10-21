import { Flight } from "@/types/ItineraryManager";
import { faCalendarDays, faLocationArrow, faArrowRight, faUser, faChair } from "@fortawesome/free-solid-svg-icons";
import styles from "./flightcard.module.css";
import Input from "@/components/FlightSearch/Input";
import InputPair from "@/components/FlightSearch/Input/InputPair";
import SubmitButton from "@/components/FlightSearch/SubmitButton";

type DataRequest = {
    origin: string;
    destination: string;
    departure_date: string;
    return_date: string;
    number_of_passengers: number;
};

export default async function Page() {
	async function submitSearch(formData: FormData) {
		"use server";

		// mutate data request
		const dataReq: DataRequest = {
			origin: formData.get("departure") as string,
			destination: formData.get("destination") as string,
			departure_date: formData.get("departure") as string,
			return_date: formData.get("return-date") as string,
			number_of_passengers: Number(formData.get("number_of_passengers")),
		};

		// run search
		// const flightResult = await Flight.find_cheapest_flight(
		// 	dataReq.origin,
		// 	dataReq.destination,
		// 	dataReq.departure_date,
		// 	dataReq.return_date,
		// 	dataReq.number_of_passengers
		// );
	}

	return (
		<div>
			<div className={styles.flightCard}>
				<h5 className="text-2xl pb-4 font-medium text-zinc-900 dark:text-white">Flights</h5>
				<form className="space-y-4" action={submitSearch}>
					<InputPair inlineicon={faArrowRight}>
						<Input label="Departing From" name="departure" inlineicon={{ icon: faLocationArrow }} placeholder="e.g., New York" required />
						<Input label="Arriving To" name="destination" inlineicon={{ icon: faLocationArrow }} placeholder="e.g., Los Angeles" required />
					</InputPair>
					<InputPair inlineicon={faArrowRight}>
						<Input
							label="Departure Date"
							name="departure-date"
							inlineicon={{ icon: faCalendarDays }}
							placeholder="Date"
							required
						/>
						<Input label="Return Date" name="return-date" inlineicon={{ icon: faCalendarDays }} placeholder="Date" required />
					</InputPair>
					<InputPair>
						<Input
							label="Number Passengers"
							name="number_of_passengers"
							inlineicon={{ icon: faUser }}
							type="number"
							placeholder="Number Passengers"
							required
						/>
						<Input label="Cabin Preference" name="cabin_preference" inlineicon={{ icon: faChair }} placeholder="Cabin Preference" />
					</InputPair>
					<SubmitButton />
				</form>
			</div>
		</div>
	);
}
