import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Input from './index';

describe('<Input />', () => {
	it('renders without crashing', () => {
		const { getByLabelText } = render(<Input />);
		expect(getByLabelText).toBeTruthy();
	});

	it('renders a label if provided', () => {
		const label = 'Test Label';
		const { queryByText } = render(<Input label={label} />);
		expect(queryByText(label)).not.toBeNull();
	});

	it('updates value on input', () => {
		const testLabel = 'Test';
		const inputId = 'testInput';

		// Render the Input component with both `label` and `id` props
		const { getByLabelText } = render(<Input id={inputId} label={testLabel} />);

		// Use getByLabelText to get the input associated with the provided label
		const input = getByLabelText(testLabel) as HTMLInputElement;

		// Fire the change event to simulate user typing in the input field
		fireEvent.change(input, { target: { value: 'new value' } });

		// Assert that the input's value has been updated
		expect(input.value).toBe('new value');
	});

	it('renders an icon if provided', () => {
		const { container } = render(<Input icon={{ icon: faUser }} />);
		expect(container.querySelector('svg')).not.toBeNull();
	});
});
