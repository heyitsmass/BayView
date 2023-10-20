"use client";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
  useState
} from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type UserInputProps = {
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const UserInput = ({ ...props }: UserInputProps) => {

  const [input, setInput] = useState("");

  const validateInput = (value: string) => {
    setInput(value);
  };

  const [type, setHidden] = useState(props.type);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.id}>{props.placeholder}</label>
      <span className={styles.input}>
        <input
          {...props}
          onKeyUp={({ currentTarget }) =>
            validateInput(currentTarget.value)
          }
          autoComplete='new-password'
        />
        {props.children}
      </span>
    </div>
  );
};

export default UserInput;
