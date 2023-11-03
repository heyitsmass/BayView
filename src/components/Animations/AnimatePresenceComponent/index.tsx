'use client';
import { animations, motion, MotionProps } from 'framer-motion';

type AnimationProps = {
	type?: keyof typeof animations;
} & MotionProps;

type AnimationTypes = {
	[key: string]: any;
};

export default function AnimationComponent({ ...props }: AnimationProps) {
	const defaultTransition = {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.2
	}

	const animations: AnimationTypes = {
		fadeSlideBlur: {
			hidden: { opacity: 0, y: -10, filter: 'blur(5px)' },
			exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
			visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
		},
		// Add more later...
	};

	const animationVariant = props.type ? animations[props.type] : animations.fadeSlideBlur;

	// Merge custom transition with defaultTransition
	const appliedTransition = { ...defaultTransition, ...props.transition};

	return (
		<motion.div
			className="w-full h-full"
			initial={animationVariant.hidden}
			animate={animationVariant.visible}
			exit={animationVariant.exit}
			transition={appliedTransition}
		>
			{props.children}
		</motion.div>
	);
}
