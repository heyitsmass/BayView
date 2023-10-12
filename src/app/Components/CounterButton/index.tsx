'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, SyntheticEvent, useEffect, useId, useState } from "react";
import styles from './button.module.css';

export type CounterButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;


export default function Button({
  ...props
}: CounterButtonProps) {

  const id = useId();
  const [counter, setCounter] = useState(0); // counter state 

  const updateCounter = (e: SyntheticEvent) => {
    e.preventDefault();
    setCounter(counter => {
      console.log(id, counter);
      return counter + 1;
    });
  }

  props.onClick = updateCounter;
  props.className = [props.className, styles.button].join(' ');

  return <button {...props}>
    Update Counter
  </button>
}