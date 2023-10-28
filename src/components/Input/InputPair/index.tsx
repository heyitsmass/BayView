"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, library, icon } from "@fortawesome/fontawesome-svg-core";
import styles from "./inputpair.module.css";

type InputPairProps = {
	icon?: IconDefinition;
	className?: string;
	children: [ReactNode, ReactNode];
};

export default function InputPair({ className, ...props }: InputPairProps) {
	
	// If icon exists add to libary
    if(props.icon)
		library.add(props.icon);

	return (
		<div className={`${className} flex items-center justify-between w-100`}>
			<div className="w-full">{props.children[0]}</div>
			<div className={styles.inlineIcon}>
				{props.icon ? <FontAwesomeIcon className="dark:text-white text-black w-3" size="lg" icon={icon(props.icon)} /> : <div className="w-3"></div>}
			</div>
			<div className="w-full">{props.children[1]}</div>
		</div>
	);
}
