'use client';
import Card from '@/components/HomePage/Card';
import { AnimatePresence, motion } from 'framer-motion';
import Book from './Presentations/Book';
import Confirmed from './Presentations/Confirmed';
import Search from './Presentations/Search';
import SelectFlight from './Presentations/Select';
import { FlightContext, useFlightCardState } from './flightState';

export const stepDetails = {
	1: { title: 'Flights', subtitle: 'find your ideal flight · explore options to your destination', component: Search },
	2: { title: 'Flights Departing to ', subtitle: 'choose your outbound flight · begin your journey from ', component: SelectFlight },
	3: { title: 'Flights Returning to ', subtitle: 'select your return flight · conclude your trip from ', component: SelectFlight },
	4: { title: 'Booking Details', subtitle: 'enter your details: secure your flight booking', component: Book },
	5: { component: Confirmed },
};

const transition = {
	initial: { opacity: 0, x: 0, transform: 'scale(0.95)', filter: 'blur(5px)' },
	animate: { opacity: 1, x: 0, transform: 'scale(1)', filter: 'blur(0px)' },
	exit: { opacity: 0, x: 50, filter: 'blur(10px)' },
};

const defaultTransition = {
	type: 'tween',
	duration: 0.25,
};

export default function FlightCard() {
	const { flightState, dispatch } = useFlightCardState();

	const renderStepComponent = () => {
		const StepComponent = stepDetails[flightState.step].component;
		return <StepComponent />;
	};

	return (

			<FlightContext.Provider value={{ flightState, dispatch }}>
				<Card title={flightState.cardTitle} subtitle={flightState.cardSubtitle} step={flightState.step} contentPending={flightState.contentPending}>
					<AnimatePresence onExitComplete={() => dispatch({ type: 'SET_EXITING', payload: false })}>
						{!flightState.isExiting && (
							<motion.div
								key={flightState.step}
								className="h-auto"
								initial="initial"
								animate="animate"
								exit="exit"
								transition={defaultTransition}
								variants={transition}
							>
								{renderStepComponent()}
							</motion.div>
						)}
					</AnimatePresence>
				</Card>
			</FlightContext.Provider>

	);
}
