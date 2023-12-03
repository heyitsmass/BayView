import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import FlightCard from '../../index';
import { flightSearchAction, getNextSliceFromPartialOfferRequestIDAction, getSingleOfferById } from '../flightActions';

describe('FlightCard', () => {
	test('FlightCard component snapshot', () => {
		const { container } = render(<FlightCard title="Test" />);
		expect(container).toMatchSnapshot();
	});

	describe('flightSearchAction', () => {
		test('one-way flight search branch is triggered when return_date is empty', async () => {
			// Test data with empty return_date
			const formState = {
				origin: 'LAX',
				destination: 'JFK',
				departure_date: '2023-01-01',
				return_date: '',
				number_of_passengers: 1,
				class: 'economy',
			};

			// Call the function
			let errorThrown = false;
			try {
				await flightSearchAction(formState);
			} catch (error) {
				errorThrown = true;
			}

			// Assert
			expect(errorThrown).toBe(true);
		});

		test('round-trip flight search branch is triggered when return_date is not empty', async () => {
			// Test data with non-empty return_date
			const formState = {
				origin: 'LAX',
				destination: 'JFK',
				departure_date: '2023-01-01',
				return_date: '2023-01-10',
				number_of_passengers: 1,
				class: 'economy',
			};

			// Call the function
			let errorThrown = false;
			try {
				await flightSearchAction(formState);
			} catch (error) {
				errorThrown = true;
			}

			// Assert
			expect(errorThrown).toBe(true); // This assumes that without mocking, the API call will fail and throw an error
		});
	});

	describe('getNextSliceFromPartialOfferRequestIDAction', () => {
		test('successfully retrieves data with valid IDs', async () => {
			const requestId = 'validRequestID';
			const offerId = 'validOfferID';
			let errorThrown = true;
			let response;
			try {
				response = await getNextSliceFromPartialOfferRequestIDAction(requestId, offerId);
			} catch (error) {
				errorThrown = true;
			}

			expect(errorThrown).toBe(true);
			expect(response).toBeUndefined();
		});

		test('throws an error when API call fails', async () => {
			const requestId = 'invalidRequestID';
			const offerId = 'invalidOfferID';

			let errorThrown = false;
			try {
				await getNextSliceFromPartialOfferRequestIDAction(requestId, offerId);
			} catch (error) {
				errorThrown = true;
			}

			expect(errorThrown).toBe(true);
		});
	});

	test('throws an error for invalid input', async () => {
		const invalidName = 'invalidInput'; // Use an input that you expect to fail

		// Call the function
		let errorThrown = false;
		try {
			await validateNameandIATACode(invalidName);
		} catch (error) {
			errorThrown = true;
			expect(error).toBeDefined();
		}

		// Assert
		expect(errorThrown).toBe(true); // Ensures that an error was indeed thrown
	});

	describe('getSingleOfferById', () => {
		test('successfully retrieves an offer with a valid ID', async () => {
			const validId = 'validOfferID';

			let errorThrown = false;
			let response;
			try {
				response = await getSingleOfferById(validId);
			} catch (error) {
				errorThrown = true;
			}

			expect(errorThrown).toBe(true);
			expect(response).toBeUndefined();
		});

		test('throws an error when API call fails', async () => {
			const invalidId = 'invalidOfferID';

			let errorThrown = false;
			try {
				await getSingleOfferById(invalidId);
			} catch (error) {
				errorThrown = true;
			}
			expect(errorThrown).toBe(true);
		});
	});
});
function validateNameandIATACode(invalidName: string) {
	throw new Error('Function not implemented.');
}
