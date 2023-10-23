'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './button.module.css';
export default function Button({
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

  return <button {...props} className={props.className + ' ' + styles.button} />
}