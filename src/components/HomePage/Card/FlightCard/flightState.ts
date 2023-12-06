'use client';
import { Dispatch, createContext, useContext, useReducer } from 'react';
import { FlightActionInterface, FlightStateInterface } from './flightInterfaces';
import { stepDetails } from '.';

// Helper function for selective deep merging
function deepMerge(target, source) {
	for (const key of Object.keys(source)) {
		// If source[key] is an array or a primitive, replace it entirely
		if (Array.isArray(source[key]) || !(source[key] instanceof Object)) {
			target[key] = source[key];
		} else {
			// If the key doesn't exist in the target, or isn't an object, replace it
			if (!(key in target) || !(target[key] instanceof Object)) {
				target[key] = {};
			}
			// Recursive call for object
			deepMerge(target[key], source[key]);
		}
	}
	return target;
}

// Create the context with the correct type for dispatch
export const FlightContext = createContext<{
	flightState: FlightStateInterface;
	dispatch: Dispatch<FlightActionInterface>;
}>({
	flightState: {
		step: 1,
		searchState: {
			data: null,
			formValues: {
				departure_date: '',
				return_date: '',
				origin: '',
				destination: '',
				number_of_passengers: 1,
				class: 'economy',
			},
		},
		selectState: {
			data: null,
			formValues: {
				results_sorting: 'total_amount',
			},
			selectedOffer: null,
			returnFlight: {
				data: null,
				formValues: {
					results_sorting: 'total_amount',
				},
				selectedOffer: null,
			},
		},
		bookState: {},
		confirmedState: {},
		places: [],
		roundTrip: true,
		cardTitle: '',
		cardSubtitle: '',
		contentPending: false,
		isExiting: false,
	},
	dispatch: () => {},
});

export const FlightReducer = (state, action) => {
	switch (action.type) {
		case 'SET_STEP':
			return {
				...state,
				step: action.payload,
				cardTitle: stepDetails[action.payload].title,
				cardSubtitle: stepDetails[action.payload].subtitle,
				isExiting: true
			};

		case 'UPDATE_CARD_TITLES':
			return {
				...state,
				cardTitle: action.payload.title,
				cardSubtitle: action.payload.subtitle,
			};

		case 'UPDATE_FORM_DATA':
			return {
				...state,
				formData: { ...state.formData, ...action.payload },
			};

		case 'UPDATE_FLIGHT_STATE':
			return deepMerge({ ...state }, action.payload);

		case 'UPDATE_SELECTED_DEPARTING_OFFER':
			return {
				...state,
				selectState: {
					...state.selectState,
					selectedOffer: action.payload, // action.payload should be the new selectedOffer object
				},
			};

		case 'UPDATE_SELECTED_RETURNING_OFFER':
			return {
				...state,
				selectState: {
					...state.selectState,
					returnFlight: {
						...state.selectState.returnFlight,
						selectedOffer: action.payload, // action.payload should be the new selectedOffer object for the return flight
					},
				},
			};

		case 'SET_EXITING':
			return {
				...state,
				isExiting: action.payload
			};

		// Handle updates for searchState, bookState, confirmedState, selectState
		case 'UPDATE_SEARCH_STATE':
			return {
				...state,
				searchState: { ...state.searchState, ...action.payload },
			};

		case 'UPDATE_BOOK_STATE':
			return {
				...state,
				bookState: { ...state.bookState, ...action.payload },
			};

		case 'UPDATE_CONFIRMED_STATE':
			return {
				...state,
				confirmedState: { ...state.confirmedState, ...action.payload },
			};

		case 'UPDATE_SELECT_STATE':
			return {
				...state,
				selectState: { ...state.selectState, ...action.payload },
			};

		default:
			return state;
	}
};

export const useFlightCardState = () => {
	const initialContext = useContext(FlightContext).flightState;
	const initialState = {
		...initialContext,
		step: 1,
		cardTitle: stepDetails[1].title,
		cardSubtitle: stepDetails[1].subtitle,
	};

	const [flightState, dispatch] = useReducer(FlightReducer, initialState);
	return { flightState, dispatch };
};
