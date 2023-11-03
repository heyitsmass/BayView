'use client';
import React, { ReactNode, useState, HTMLProps } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';

type CardProps = {
	title: string;
	subtitle?: string;
} & HTMLProps<HTMLBodyElement>;

export default function Card({ ...props }: CardProps) {

	const {children, className, title, subtitle} = props; 
	
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div  className={`${className} ${styles.defaultCard} ${isOpen ? 'max-h-[45rem] overflow-scroll' : 'max-h-24 overflow-clip'}`}>
			<button className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon className={`${styles.icon} w-4 pr-2 icon`} size="lg" icon={isOpen ? faAngleDown : faAngleUp}/>
				<h1 className="text-2xl font-bold">{title}</h1>
			</button>
			<h2 className="pl-6 text-zinc-400">{subtitle}</h2>
			<div className={`px-3 pb-2 pt-3`}>
                {children}
			</div>
		</div>
	);
}
