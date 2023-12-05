import { afterEach, beforeEach, describe, it, vi, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import TopBar from '@/components/HomePage/TopBar';

// Mock the next/link and next/navigation modules
vi.mock('next/link', () => ({
	// Mock the default function of the Link component to just render its children
	default: ({ children }) => children,
}));

// Mock the `usePathname` hook to return a specific pathname
vi.mock('next/navigation', () => ({
	usePathname: vi.fn(() => '/home/home'),
}));

// Mock the AnimatePresence and motion components from framer-motion
vi.mock('framer-motion', async () => {
	const actual: Object = await vi.importActual("framer-motion");
	return {
	  ...actual,
	  cubicBezier: () => {}, 
	  AnimatePresence: ({ children }) => children,
	  motion: {
		  div: ({ children }) => <div>{children}</div>,
	  },
	};
});

// Mock useHomepage hook with the updated structure
vi.mock('@/hooks', () => ({
	useHomepage: () => ({
		user: {
			_id: 'mockUserId',
			metadata: {
				username: 'MockUsername',
				first_name: 'MockFirstName',
				last_name: 'MockLastName',
				discord: 'MockDiscord',
			},
		},
		itinerary: {
			// Mock the itinerary object as needed
		},
	}),
}));

describe('<TopBar />', () => {
	let addEventListenerSpy;
	let removeEventListenerSpy;

	beforeEach(() => {
		// Mock the `usePathname` hook before each test
		vi.mocked(usePathname).mockReturnValue('/home/home');

		// Spy on window's addEventListener and removeEventListener
		addEventListenerSpy = vi.spyOn(window, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
	});

	afterEach(() => {
		// Restore the original functions
		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
		vi.restoreAllMocks();
	});

	it('renders without crashing', () => {
		const { container } = render(<TopBar />);
		expect(container.firstChild).toBeTruthy();
	});

	it('defaults to the first link as active if no pathname matches', () => {
		// Mock the usePathname to return a pathname that does not match any of the links
		vi.mocked(usePathname).mockReturnValue('/non/existent/path');

		const { getByText } = render(<TopBar />);
		const homeLinkElement = getByText('Home').closest('span');

		// Check that the first link, which is 'Home', has 'font-bold' by default
		expect(homeLinkElement?.className).toContain('font-bold');
	});

	it('marks the correct link as active based on pathname', () => {
		const { getByText } = render(<TopBar />);
		const homeLink = getByText('Home');
		expect(homeLink?.className).toContain('font-bold');
	});

	it('closes the profile dropdown when clicking outside and removes mousedown event listener on second click', async () => {
		const { queryByText } = render(<TopBar />);
		const profileIcon = screen.getByTestId('profile-icon');

		// Simulate opening the dropdown
		fireEvent.click(profileIcon);
		expect(queryByText(/Logout/i)).toBeTruthy();

		// Simulate a click outside of the profile dropdown
		fireEvent.mouseDown(document.body);

		// Check that the dropdown is no longer present
		expect(queryByText(/Logout/i)).toBeNull();

		// Simulate clicking the profile icon again to open the dropdown
		fireEvent.click(profileIcon);
		expect(queryByText(/Logout/i)).toBeTruthy();

		// Spy on document.removeEventListener method
		const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

		// Simulate clicking the profile icon again to close the dropdown
		fireEvent.click(profileIcon);
		expect(queryByText(/Logout/i)).toBeNull();

		// Check that removeEventListener was called with the correct arguments
		expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
	});
});
