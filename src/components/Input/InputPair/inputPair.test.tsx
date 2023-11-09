import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '.././index';
import InputPair from './index';

describe('<InputPair />', () => {
	it('renders without crashing', () => {
		render(<InputPair>{[<Input key="input1" />, <Input key="input2" />]}</InputPair>);
		const textboxes = screen.getAllByRole('textbox');
		expect(textboxes).toHaveLength(2);
	});

	it('renders both Input components', () => {
		render(<InputPair>{[<Input key="input2" />, <Input key="input2" />]}</InputPair>);
		const inputs = screen.getAllByRole('textbox');
		expect(inputs.length).toBe(2);
	});

	it('renders an icon if provided', () => {
		const { container } = render(<InputPair icon={faUser}>{[<Input key="input1" />, <Input key="input2" />]}</InputPair>);
		const svgElement = container.querySelector('svg');
		expect(svgElement).toBeTruthy();
	});

	it('does not render an icon when not provided', () => {
		render(<InputPair>{[<Input key="input1" />, <Input key="input2" />]}</InputPair>);
		const inputs = screen.getAllByRole('textbox');
		const firstInput = inputs[0];
		const svgElement = firstInput.nextSibling;
		expect(svgElement?.nodeName).not.toEqual('svg');
	});

	it('applies a custom class name if provided', () => {
		const { container } = render(<InputPair className="custom-class">{[<Input key="input1" />, <Input key="input2" />]}</InputPair>);

		// Assuming the first child should have the class
		const element = container.firstChild;
		expect(element).not.toBeNull();

		// Check if element has the 'custom-class' among its class list
		if (element) {
			const htmlElement = element as HTMLElement;
			expect(htmlElement.className.split(' ')).toContain('custom-class');
		}
	});
});
