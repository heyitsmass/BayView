'use client';
import { animations, cubicBezier, easeIn, easeInOut, motion, MotionProps } from 'framer-motion';
import { ReactNode, ReactNodeArray } from 'react';

type AnimationProps = {
	type?: keyof typeof animations;
} & MotionProps;

type AnimationTypes = {
	[key: string]: any;
};

type BlurOpacityAnimationProps = {
	children: ReactNode;
	transitionOn: boolean;
	className?: string;
};

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);
export const easeOutExpoTransition = { type: 'tween', ease: easeOutExpo, duration: 0.5 };

export const blurFadeVariant = {
	closed: { opacity: 0, maxHeight: 0, overflow: 'hidden', filter: 'blur(10px)' },
	open: { opacity: 1, maxHeight: 600, overflow: 'auto', filter: 'blur(0px)' },
};

export const titleTransitionVariant = {
	initial: { opacity: 0, x: 0, filter: 'blur(5px)' },
	animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
	exit: { opacity: 0, x: 20, filter: 'blur(10px)' },
};

export const pendingTransitionVariant = {
	blur: { opacity: 0.3, filter: 'blur(3px)' },
	show: { opacity: 1, filter: 'blur(0px)' },
};

export const pendingTransitionParams = {
	opacity: {ease: easeInOut, duration: 1},
	filter: {ease: easeInOut, duration: 1},
};

export const titleTransitionParams = {
	type: 'tween',
	ease: 'easeInOut',
	duration: 0.5,
};

export const blurVariant = {
	blur: { filter: 'blur(2px)' },
	show: { filter: 'blur(0px)' },
};

export const blurTransitionParams = {
	type: 'tween',
	ease: 'easeInOut',
	duration: 0.2,
};

export const BlurOpacityAnimation = ({ ...props }: BlurOpacityAnimationProps) => {
	return (
		<motion.div
			animate={props.transitionOn ? 'blur' : 'show'}
			transition={pendingTransitionParams}
			variants={pendingTransitionVariant}
			className={`${props.className} ${props.transitionOn && 'pointer-events-none cursor-not-allowed'}`} // Disable mouse events on key
		>	
			{/* Disable any enclosing form fields */}
			<fieldset disabled={props.transitionOn} aria-disabled={props.transitionOn}>
				{props.children}
			</fieldset>
		</motion.div>
	);
};

export function AnimationComponent({ ...props }: AnimationProps) {
	const defaultTransition = {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.2,
	};

	const animations: AnimationTypes = {
		fadeSlideBlur: {
			hidden: { opacity: 0, y: -10, filter: 'blur(5px)' },
			exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
			visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
		},
		// Add more later...
	};

	// TODO: Find a better way to handle this, force default for now.
	const animationVariant = animations.fadeSlideBlur;

	// Merge custom transition with defaultTransition
	const appliedTransition = { ...defaultTransition, ...props.transition };

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
