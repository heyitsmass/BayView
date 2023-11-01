"use client";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useState, SyntheticEvent
} from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition} from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type UserInputProps = {
  icon?: Omit<FontAwesomeIconProps, "icon"> & { icon: IconProp };
  label?:string; 
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function useInputValidation(initialValue: string = "") {
	const [input, setInput] = useState(initialValue);

	const validateInput = (value: string): void => {
		// Validation logic here
		setInput(value);
	};

	return [input, validateInput] as const;
}

const UserInput = ({ ...props }: UserInputProps) => {
	
  const {icon, label, id, children, className} = props; 
	
  const [input, validateInput] = useInputValidation();
  const onKeyUp = useCallback((event: SyntheticEvent) => validateInput((event.currentTarget as HTMLInputElement).value), [validateInput]);

  return (
    <div className={className}>
      { label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>)
        :
        <div className="w-full h-7"></div>
      }
      <div className={styles.inputWrapper}>
        {icon && <FontAwesomeIcon className={styles.icon} {...icon} />}
        <input className={styles.input} {...props} />
        {children}
      </div>
    </div>
  );
};

export default UserInput;
