import Button from '@/components/Button';
import InputPair from '@/components/Input/InputPair';
import Input from '@/components/Input';
import { faArrowRight, faLocationArrow, faCalendarDays, faUser, faChair } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FlightContext } from '../flightState';

export default function Book() {
	const { dispatch, flightState } = useContext(FlightContext);
	return (<></>);
}
