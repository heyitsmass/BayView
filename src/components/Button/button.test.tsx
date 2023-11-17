import React from 'react';
import { describe, it, expect } from 'vitest';
import { getByTestId, render, screen } from '@testing-library/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from './index';

describe('<Button />', () => {
	it('renders the button with the primary style by default', () => {
		render(<Button>Click me</Button>);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement.textContent).toBe('Click me');
		expect(buttonElement.className).toContain('primary');
	});

	it('renders the button with the secondary style', () => {
		render(<Button variant="secondary">Click me</Button>);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement.className).toContain('secondary');
	});

	it('renders an icon if provided', () => {
		const { container } = render(<Button icon={faUser}>User</Button>);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeTruthy();
	});

	it('does not render an icon if none provided', () => {
		const { container } = render(<Button>Coffee</Button>);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeFalsy();
	});

	it('does not render spinner when isPending state is false', () => {
		const { container } = render(<Button>User</Button>);
		const spinner = container.querySelector('.spinner');
		expect(spinner).toBeFalsy(); // Check that the spinner element is not present
	});

	it('renders a spinner when isPending state is true', () => {
		const { container } = render(<Button isPending={true}>User</Button>);
		const spinner = getByTestId(container, 'spinner');
		expect(spinner).toBeTruthy();
	});	  
});
