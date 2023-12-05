/* eslint-disable react/jsx-key */
"use client";

import styles from "./page.module.css";
import { CardCollapseContext } from "@/components/HomePage/Card/cardCollapseContext";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import FlightCard from "@/components/HomePage/Card/FlightCard";
import ItineraryTitle from "@/components/ItineraryTitle";
import { useRef, useState } from "react";
import React from "react";
import DiningCard from "@/components/HomePage/Card/DiningCard";
import LodgingCard from "@/components/HomePage/Card/LodgingCard";
import {
  EntertainmentCard,
  ExperienceCard,
  OutdoorCard,
  RelaxationCard
} from "@/components/HomePage/Card/EventCard";

// NOTE: Define cards here
// in the order they should initially appear in the grid
const initialCards = [
  <FlightCard />,
  <LodgingCard />,
  <DiningCard />,
  <RelaxationCard />,
  <EntertainmentCard />,
  <OutdoorCard />,
  <ExperienceCard />
  // ... Add cards here
];

export default function Page() {
  // State to store the order of the card IDs
  const [cardOrder, setCardOrder] = useState(
    initialCards.map((_, index) => `card-${index}`)
  );

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
        className: `${child.props.className} relative z-0`
      });
    });
  };

  // Enhanced initial cards
  const enhancedCards = enhanceCards(initialCards);

  return (
		<>
			<div className={styles.contentGrid + " !pb-0 !pt-16"}>
				<div className="w-[600px] col-span-full">
					<ItineraryTitle></ItineraryTitle>
				</div>
			</div>
			<AnimationComponent transition={{ duration: 0.5 }}>
				<div className={styles.contentGrid}>
					{cardOrder.map((cardId) => (
						<motion.div layout key={cardId}>
							<CardCollapseContext.Provider value={{ onCollapse: () => handleCollapse(cardId) }}>
								{enhancedCards.find((card) => card.props.cardId === cardId)}
							</CardCollapseContext.Provider>
						</motion.div>
					))}
				</div>
			</AnimationComponent>
		</>
	);
}
