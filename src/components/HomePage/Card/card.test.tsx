import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './index';

// Mock the FontAwesomeIcon component
vi.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: ({ icon }) => <i data-testid="fontawesome-icon" className={`fa ${icon.iconName}`} />,
}));

describe('<Card />', () => {
	it('renders the card with the title', () => {
		const { getByText } = render(<Card title="Test Title" />);
		expect(getByText('Test Title')).toBeDefined();
	});

	it('toggles isOpen state on button click', () => {
		const { container } = render(<Card title="Test Title" />);
		const button = container.querySelector('button');

		if (button) {
			// Check for initial open state classes in div
			expect(container.firstChild).toMatchObject({ className: expect.stringContaining('max-h-[45rem] overflow-scroll') });

			// Click the button to toggle isOpen state
			fireEvent.click(button);

			// Check for closed state classes in div
			expect(container.firstChild).toMatchObject({ className: expect.stringContaining('max-h-24 overflow-clip') });

			// Click the button again to toggle isOpen state back
			fireEvent.click(button);

			// Check for open state classes again
			expect(container.firstChild).toMatchObject({ className: expect.stringContaining('max-h-[45rem] overflow-scroll') });
		}
	});

	it('changes the icon on toggle', () => {
		const { getByTestId } = render(<Card title="Test Title" />);
		const button = getByTestId('fontawesome-icon').parentNode;

		// Check initial icon class
		let icon = getByTestId('fontawesome-icon');
		expect(icon.className).toContain('angle-down');

        // Toggle open state
		if (button) {
			fireEvent.click(button);
		}

		// Check updated icon class
		icon = getByTestId('fontawesome-icon');
		expect(icon.className).toContain('angle-up');
	});
});
