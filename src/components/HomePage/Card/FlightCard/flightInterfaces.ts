import { Offer, OfferRequest, OfferRequestSlice, Places } from '@duffel/api/types';

// Define actions the dispatch function will accept
export interface FlightActionInterface {
	type: string;
	payload?: any;
}

// Augment the existing interface to include total duration
declare module '@duffel/api/types' {
	export interface Offer {
		total_duration: string;
	}
}

export interface FlightStateInterface {
	step: number;
	searchState: {
		data: {} | null;
		formValues: {
			departure_date: string;
			return_date: string;
			origin: string;
			destination: string;
			class: string;
			number_of_passengers: number;
		};
	};
	selectState: {
		data: {
			offers: Offer[];
			slices: OfferRequestSlice[];
			id: string;
		} | null;
		formValues: {
			results_sorting: string;
		};
		selectedOffer: {
			offer: Offer;
			id: string;
		} | null;
		returnFlight: {
			data: {
				offers: Offer[];
				slices: OfferRequestSlice[];
				id: string;
			} | null;
			formValues: {
				results_sorting: string;
			};
			selectedOffer: {
				offer: Offer;
				id: string;
			} | null;
		};
	};
	bookState: {};
	confirmedState: {};
	places: Places[];
	roundTrip: boolean;
	cardTitle: string;
	cardSubtitle: string;
	contentPending: boolean;
	isExiting: boolean;
}
