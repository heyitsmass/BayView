'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useState } from 'react';
import styles from './button.module.css';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconDefinition, library, icon, IconProp } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = {
  icon?: IconDefinition;
  red?: boolean;
  children?: ReactNode;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, 
  HTMLButtonElement>;

export default function Button({
  red,
  className,
  ...props
}: ButtonProps) {
  const [isPending, setIsPending] = useState(false); 
  
  const setPending = (bool_:boolean) => {
    setIsPending(bool_);
  };

  // If icon exists add to libary
  if(props.icon)
		library.add(props.icon);

  return (
  <button {...props} className={`${className} ${red? styles.primaryButton : styles.button} disabled:opacity-25 flex align-center justify-items-center`}>
    	<div className={props.icon? styles.inlineIcon: ''}>
				{props.icon && <FontAwesomeIcon className="text-white w-3" size="lg" icon={icon(props.icon)}/>}
			</div>
      <div className='w-full justify-self-center'>{props.children}</div>
      <div className={isPending? styles.spinner + " ml-3 flex-none": ''}></div>
  </button>)
}