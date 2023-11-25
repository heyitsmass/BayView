'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useState } from 'react';
import styles from './button.module.css';
import { FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import { IconDefinition} from "@fortawesome/fontawesome-svg-core";
import React from 'react';

type ButtonProps = ({
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon?: IconDefinition;
    variant?:
      | 'primary'
      | 'secondary';
    pending?: string;
  });

export default function Button({
  ...props
}: ButtonProps) {
  const classNames = [props.className, props.variant ? styles[props.variant] : styles.primary, styles.button].join(' ');
  const FAIcon = React.memo(({ ...props }: FontAwesomeIconProps) => {
    return <FontAwesomeIcon {...props} />;
  });
  FAIcon.displayName = 'FAIcon';
  
  return (
  <button {...props} {... props.pending && ({"disabled": true, "aria-disabled": true})} className={`${classNames}`}>
    	{ props.icon && 
        <div className={styles.inlineIcon}>
				  <FAIcon className="text-white w-3" size="lg" icon={props.icon}/>
        </div> 
      }
      <div className='w-full justify-self-center'>{props.children}</div>
      { props.pending && 
        <div data-testid="spinner" className={styles.spinner}></div> 
      }
  </button>)
}