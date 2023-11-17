/* eslint-disable react/jsx-key */
'use client';

import styles from './page.module.css';
import { CardCollapseContext } from '@/components/HomePage/Card/cardCollapseContext';
import { AnimatePresence, motion } from 'framer-motion';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';
import FlightCard from '@/components/HomePage/Card/FlightCard';
import Banner from '@/components/Banner';
import bannerImg from '../../../../public/images/1.png';
import ItineraryTitle from '@/components/ItineraryTitle';
import { useRef, useState } from 'react';
import React from 'react';

// NOTE: Define cards here
// in the order they should initially appear in the grid
const initialCards = [
	<FlightCard />,
	<FlightCard />,
	<FlightCard />,
	<FlightCard />,
	<FlightCard />,
	// ... Add cards here
];

export default function Page() {
	// State to store the order of the card IDs
	const [cardOrder, setCardOrder] = useState(initialCards.map((_, index) => `card-${index}`));

	// Handle the collapse
	const handleCollapse = (collapsedCardId) => {
		setCardOrder((prevOrder) => {
			const index = prevOrder.indexOf(collapsedCardId);
			if (index >= 0) {
				const newOrder = [...prevOrder];
				newOrder.push(newOrder.splice(index, 1)[0]); // Move the collapsed card to the end
				return newOrder;
			}
			return prevOrder;
		});
	};

	// Function to enhance cards with props
	const enhanceCards = (cards) => {
		return cards.map((child, index) => {
			const cardId = `card-${index}`;
			return React.cloneElement(child, {
				key: cardId,
				cardId: cardId,
			});
		});
	};

	// Enhanced initial cards
	const enhancedCards = enhanceCards(initialCards);

	return (
		<AnimatePresence>
			<AnimationComponent transition={{ duration: 0.5 }}>
				<Banner src={bannerImg.src} />
				<div className={`${styles.contentGrid}`}>
					<div className="w-[600px] -mt-52 absolute">
						<ItineraryTitle></ItineraryTitle>
					</div>
					{cardOrder.map((cardId) => (
						<motion.div layout key={cardId}>
							<CardCollapseContext.Provider value={{ onCollapse: () => handleCollapse(cardId) }}>
								{enhancedCards.find((card) => card.props.cardId === cardId)}
							</CardCollapseContext.Provider>
						</motion.div>
					))}
				</div>
			</AnimationComponent>
		</AnimatePresence>
	);
}
