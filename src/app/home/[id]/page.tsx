"use client";

import styles from "./page.module.css";
import { AnimatePresence } from 'framer-motion';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';
import FlightCard from "@/components/HomePage/Card/FlightCard";


export default function Page() {
  return (
	<AnimatePresence>
				<Banner src={bannerImg.src} />
					<div className="w-[600px] -mt-52 absolute">
						<ItineraryTitle></ItineraryTitle>
					</div>
			</div>
		</AnimationComponent>
	</AnimatePresence>
  );
}
