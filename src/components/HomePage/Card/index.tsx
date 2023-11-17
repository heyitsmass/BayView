'use client';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useCardCollapse } from './cardCollapseContext';

type CardProps = {
	title?: string;
	subtitle?: string;
} & React.HTMLProps<HTMLDivElement>;

export default function Card(props: CardProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { onCollapse } = useCardCollapse();

	const titleTransitions = {
		initial: { opacity: 0, x: 0, filter: 'blur(5px)' },
		animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
		exit: { opacity: 0, x: 20, filter: 'blur(10px)' },
	};

	const titleTransitionParams = {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.5,
	};

	const variantParams = {
		closed: { opacity: 0, maxHeight: 0, filter: 'blur(10px)' },
		open: { opacity: 1, maxHeight: 500, filter: 'blur(0px)' },
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		if (isOpen) {
			onCollapse();
		}
	};

	const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);
	const transition = { type: 'tween', ease: easeOutExpo, duration: 0.5 };

	return (
		<div className={`${props.className} ${styles.defaultCard} ${props.title && styles.extraCardPadding}`}>
			{props.title && (
				<button className="flex items-center -mx-3" onClick={() => toggleOpen()}>
					<FontAwesomeIcon className={`${styles.icon} w-4 pr-2 icon`} size="lg" icon={isOpen ? faAngleDown : faAngleUp} />
					<motion.div
						key={props.title}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={titleTransitionParams}
						variants={titleTransitions}
					>
						<h1 className="text-2xl font-bold">{props.title}</h1>
					</motion.div>
				</button>
			)}
			{props.subtitle && (
				<motion.div
					key={props.subtitle}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={titleTransitionParams}
					variants={titleTransitions}
				>
					<h2 className="pl-6 pb-3 -mx-3 text-zinc-400">{props.subtitle}</h2>
				</motion.div>
			)}
			<AnimatePresence>
				{isOpen && (
					<motion.div initial="closed" animate="open" exit="closed" variants={variantParams} transition={transition}>
						{props.children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
