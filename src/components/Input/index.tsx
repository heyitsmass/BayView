"use client";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useState
} from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type UserInputProps = {
  icon?: Omit<FontAwesomeIconProps, "icon"> & { icon: IconProp };
  label?: string;
	id?: string;
  className?: string;
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

const UserInput = ({ icon, label, id, children, className, ...props }: UserInputProps) => {
  const [input, validateInput] = useInputValidation();
  const onKeyUp = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => validateInput(event.currentTarget.value), [validateInput]);

  const [type, setHidden] = useState(props.type);

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
        <input className={styles.input} id={id} {...props} onKeyUp={onKeyUp} />
        {children}
      </div>
    </div>
  );
};

export default UserInput;
