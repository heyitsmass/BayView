'use server';
import { Duffel, DuffelError } from '@duffel/api';
import { FlightStateInterface } from './flightInterfaces';
import { CabinClass } from '@duffel/api/types';

// Note: Proper paging functionality is not implemented, client sorting is preferred.
// The current design fetches all offers and then acts upon displayed data with client filtering and sorting.

const flightAPI = new Duffel({
	token: process.env.DUFFEL_API_TOKEN || '',
	debug: { verbose: false },
});

async function validateNameandIATACode(name) {
	try {
		const response = await flightAPI.suggestions.list({
			name: name,
		});
		return response.data[0];
	} catch (error: unknown) {
		if (error instanceof DuffelError) {
			throw error;
		}
		throw new Error('Something went wrong' + error); // Throwing a generic error if it's not a DuffelError
	}
}

export async function getSingleOfferById(id: string) {
	try {
		const response = await flightAPI.offers.get(id);

		return { offer: response.data };
	} catch (error: unknown) {
		if (error instanceof DuffelError) {
			throw error;
		}
		throw new Error('Something went wrong' + error); // Throwing a generic error if it's not a DuffelError
	}
}

// Default action for creating offer request
export async function flightSearchAction(formState: FlightStateInterface['searchState']['formValues']) {
	// populate / mutate data request
	let dataReq = {
		origin: await validateNameandIATACode(formState.origin),
		destination: await validateNameandIATACode(formState.destination),
		departure_date: new Date(formState.departure_date).toISOString(),
		return_date: '', // Field empty if one-way
		number_of_passengers: formState.number_of_passengers,
		class: formState.class as CabinClass,
	};

	// Meta pertaining to offer requests
	const meta = [
		{
			limit: 10,
		},
	];

	let slices;
	let offerRequest;

	// If a return date is specified create a partial offer request for the selected data
	// indicating a multi-step route. Otherwise, create a full-offer request for the one way flight with an empty return date
	if (formState.return_date.length === 0) {
		slices = [
			{
				origin: dataReq.origin.iata_code as string,
				destination: dataReq.destination.iata_code as string,
				departure_date: dataReq.departure_date,
				return_date: '',
			},
		];

		// Create a full offer request
		offerRequest = flightAPI.offerRequests.create({
			meta,
			slices,
			passengers: [{ type: 'adult' }], // Assuming all passengers are 21 for now
			return_offers: true,
			cabin_class: dataReq.class,
		});
	} else {
		// Convert the return field
		dataReq.return_date = new Date(formState.return_date).toISOString();

		// Slices for both departing and returning
		slices = [
			{
				origin: dataReq.origin.iata_code as string,
				destination: dataReq.destination.iata_code as string,
				departure_date: dataReq.departure_date,
			},
			{
				origin: dataReq.destination.iata_code as string,
				destination: dataReq.origin.iata_code as string,
				departure_date: dataReq.return_date,
			},
		];

		// Create a partial offer request
		offerRequest = flightAPI.partialOfferRequests.create({
			meta,
			slices,
			passengers: [{ type: 'adult' }], // Assuming all passengers are 21 for now
			return_offers: true,
			cabin_class: dataReq.class,
		});
	}

	try {
		const response = await offerRequest;

		return { data: response.data, formValues: dataReq};
	} catch (error: unknown) {
		if (error instanceof DuffelError) {
			throw error;
		}
		throw new Error('Something went wrong' + error); // Throwing a generic error if it's not a DuffelError
	}
}

export async function getNextSliceFromPartialOfferRequestIDAction(requestId: string, offerId: string) {
	try {
		const response = await flightAPI.partialOfferRequests.get(requestId,{
			'selected_partial_offer[]': [offerId]
		  });
		return { data: response };
	} catch (error: unknown) {
		if (error instanceof DuffelError) {
			throw error;
		}
		throw new Error('Something went wrong' + error); // Throwing a generic error if it's not a DuffelError
	}
}
