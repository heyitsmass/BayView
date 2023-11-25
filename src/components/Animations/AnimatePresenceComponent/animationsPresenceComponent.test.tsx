import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AnimationComponent } from './index'; // Adjust the path to your component
import { motion } from 'framer-motion';

// Mock the framer-motion motion component
vi.mock('framer-motion', () => ({
	motion: {
		div: vi.fn().mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
	},
}));

describe('AnimationComponent', () => {

	it('should use fadeSlideBlur if no type is provided', () => {
		render(<AnimationComponent />);
		const motionDivProps = vi.mocked(motion.div).mock.calls[0][0];

		expect(motionDivProps.initial).toStrictEqual({ opacity: 0, y: -10, filter: 'blur(5px)' });
	});
});
