/* eslint-disable react/jsx-key */
'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './page.module.css';
import { useRef, useState } from 'react';
import { CardCollapseContext } from '@/components/HomePage/Card/cardCollapseContext';
import Banner from '@/components/Banner';
import bannerImg from '../../../../public/images/1.png';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';
import ItineraryTitle from '@/components/ItineraryTitle';
import DiningCard from '@/components/HomePage/Card/DiningCard';
import FlightCard from '@/components/HomePage/Card/FlightCard';

// NOTE: Define cards here
// in the order they should initially appear in the grid
const initialCards = [
	<FlightCard />,
  <DiningCard />
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
				<Banner bannerHeight="!h-52" src={bannerImg.src} />
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
