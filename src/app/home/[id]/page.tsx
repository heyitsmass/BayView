"use client";

import styles from "./page.module.css";
import { AnimatePresence } from 'framer-motion';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';
import FlightCard from "@/components/HomePage/Card/FlightCard";


export default function Page() {
  return (
	<AnimatePresence>
				<Banner src={bannerImg.src} />
			</div>
		</AnimationComponent>
	</AnimatePresence>
  );
}
