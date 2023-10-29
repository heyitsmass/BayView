"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./inputpair.module.css";

type InputPairProps = {
	icon?: IconDefinition;
	className?: string;
	children: [ReactNode, ReactNode];
};

export default function InputPair({ ...props }: InputPairProps) {
	
	const {className, icon, children} = props; 
	
	return (
		<div className={`${className} flex items-center justify-between w-100`}>
			<div className="w-full">{children[0]}</div>
			<div className={styles.inlineIcon}>
				{icon ? <FontAwesomeIcon className="dark:text-white text-black w-3" size="lg" icon={icon} /> : <div className="w-3"></div>}
			</div>
			<div className="w-full">{children[1]}</div>
		</div>
	);
}
