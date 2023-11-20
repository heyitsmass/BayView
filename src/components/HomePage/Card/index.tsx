'use client';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardCollapse } from './cardCollapseContext';
import { easeOutExpoTransition, blurFadeVariant, titleTransitionVariant, titleTransitionParams} from '@/components/Animations/AnimatePresenceComponent';

type CardProps = {
	title?: string;
	subtitle?: string;
} & React.HTMLProps<HTMLDivElement>;

export default function Card(props: CardProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { onCollapse } = useCardCollapse();

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		if (isOpen) {
			onCollapse();
		}
	};

	return (
		<div
			className={`${props.className} ${styles.defaultCard} ${props.title && isOpen && styles.extraCardPadding} ${
				props.title && !isOpen && styles.closedCardPadding
			}`}
		>
			{props.title && (
				<button className="flex items-center -mx-3 px-1 pt-2" onClick={() => toggleOpen()}>
					<FontAwesomeIcon className={`${styles.icon} w-4 pr-2 icon`} size="lg" icon={isOpen ? faAngleDown : faAngleUp} />
					<motion.div
						key={props.title}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={titleTransitionParams}
						variants={titleTransitionVariant}
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
					variants={titleTransitionVariant}
					className="px-1"
				>
					<h2 className="pl-6 pb-2 -mx-3 text-zinc-400 p-1">{props.subtitle}</h2>
				</motion.div>
			)}
			<div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial="closed"
							animate="open"
							exit="closed"
							variants={blurFadeVariant}
							transition={easeOutExpoTransition}
						>
							{props.children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
