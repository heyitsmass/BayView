'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useState } from 'react';
import styles from './button.module.css';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { IconDefinition} from "@fortawesome/fontawesome-svg-core";

type ButtonProps = ({
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon?: IconDefinition;
    variant?:
      | 'primary'
      | 'secondary';
  });

export default function Button({
  ...props
}: ButtonProps) {
  const [isPending, setIsPending] = useState(false); 
  const classNames = [props.className, props.variant ? styles[props.variant] : styles.primary, styles.button].join(' ');
  
  return (
  <button {...props} className={`${classNames}`}>
    	{ props.icon && 
        <div className={styles.inlineIcon}>
				  <FontAwesomeIcon className="text-white w-3" size="lg" icon={props.icon}/>
        </div> 
      }
      <div className='w-full justify-self-center'>{props.children}</div>
      { isPending && 
        <div className={[styles.spinner].join('ml-3 fex-none')}></div> 
      }
  </button>)
}