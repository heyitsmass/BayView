import { render, fireEvent, screen, waitFor } from '@testing-library/react';
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
		render(<Card title="Test Title" />);
		const button = screen.getByTestId("toggle-button");

		if (button) {
			// Click the button to toggle isOpen state (default open)
			fireEvent.click(button);
			waitFor(() => {
				// Check that children no longer render
				expect(screen.getByTestId("card-children").children.length).toBe(0);
			}, { timeout: 3000 }); // Wait for animation to remove 

			// Click the button again to toggle isOpen state back
			fireEvent.click(button);

			waitFor(() => {
				// Check for rendered children
				expect(screen.getByTestId("card-children").children.length).toBeGreaterThan(0);
			}, { timeout: 3000 }); // Wait to readd children
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
