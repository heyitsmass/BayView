"use client";
import { DetailedHTMLProps, InputHTMLAttributes, useState, useCallback } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type InputProps = {
	inlineicon?: Omit<FontAwesomeIconProps, "icon"> & { icon: IconProp };
	label?: string;
	id?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function useInputValidation(initialValue: string = "") {
	const [input, setInput] = useState(initialValue);

	const validateInput = (value: string): void => {
		// Validation logic here
		setInput(value);
	};

	return [input, validateInput] as const;
}

export default function Input({ inlineicon, label, id, children, ...props }: InputProps) {
	const [input, validateInput] = useInputValidation();

	const onKeyUp = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => validateInput(event.currentTarget.value), [validateInput]);

	return (
		<div className={styles.inputWrapper}>
			{label && (
				<label className={styles.labelStyle} htmlFor={id}>
					{label}
				</label>
			)}
			<input className={styles.inputStyle} id={id} {...props} onKeyUp={onKeyUp} />
			{inlineicon && <FontAwesomeIcon className={styles.iconStyle} {...inlineicon} />}
			{children}
		</div>
	);
}
