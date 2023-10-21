"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconDefinition, library, icon } from "@fortawesome/fontawesome-svg-core";
import styles from "./inputpair.module.css";

type InputPairProps = {
	inlineicon?: IconDefinition;
	children: [ReactNode, ReactNode];
};

export default function InputPair({ ...props }: InputPairProps) {
	
	// If icon exists add to libary
    if(props.inlineicon)
		library.add(props.inlineicon);

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex items-center flex-grow">{props.children[0]}</div>
			<div className="flex items-center justify-center mx-3 mt-6">
				{props.inlineicon ? <FontAwesomeIcon className="dark:text-white text-black w-3" size="lg" icon={icon(props.inlineicon)} /> : <div className="w-3"></div>}
			</div>
			<div className="flex items-center flex-grow">{props.children[1]}</div>
		</div>
	);
}
