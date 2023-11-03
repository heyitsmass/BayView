"use client";

import styles from "./page.module.css";
import { AnimatePresence } from 'framer-motion';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';

export default function Page() {
  return (
	<AnimatePresence>
		<AnimationComponent transition={{duration: 0.5}}>
			<div className={styles.contentGrid}>
				{/* Card Components here */}
			</div>
		</AnimationComponent>
	</AnimatePresence>
  );
}
