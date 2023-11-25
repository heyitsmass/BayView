'use client';
import { DetailedHTMLProps, SelectHTMLAttributes, useCallback, useState } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './select.module.css';
import React from 'react';

type SelectProps = {
	icon?: Omit<FontAwesomeIconProps, 'icon'> & { icon: IconProp };
	label?: string;
	options: Array<{ value: string; label: string }>;
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export default function Select({ className, style, ...props }: SelectProps) {
	const { icon, options, label, value } = props;

	// Combine classes and styles
	const selectClass = `${styles.select} ${className || ''}`;
	const combinedStyle = { ...style };
	const FAIcon = React.memo(({ ...props }: FontAwesomeIconProps) => {
		return <FontAwesomeIcon {...props} />;
	});
	FAIcon.displayName = 'FAIcon';

	return (
		<>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.selectWrapper} style={combinedStyle}>
				{icon && <FAIcon className={styles.icon} {...icon} />}
				<select className={selectClass} value={value} {...props}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<div className={styles.selectArrowWrapper}>
					<FAIcon icon={faChevronDown} className={styles.selectArrow} />
				</div>
			</div>
		</>
	);
}
