import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import FlightCard from '../../index';

describe('FlightCard', () => {
	test('FlightCard component snapshot', () => {
		const { container } = render(<FlightCard title='Test'/>);
		expect(container).toMatchSnapshot();
	});

	// More tests could be added to simulate card actions
});
