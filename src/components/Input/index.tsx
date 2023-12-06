"use client";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import styles from "./input.module.css";

type IconProps = Omit<FontAwesomeIconProps, "icon"> & {
  icon: IconProp;
  onClick?: (event: MouseEvent) => void;
};

export type UserInputProps = {
  inputClassName?: string;
  icon?: IconProps;
  label?: string;
  isselected?: string;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const UserInput = forwardRef<HTMLInputElement, UserInputProps>(
  (props, ref) => {
    const { icon, label, id, children, inputClassName } = props;

    if (props.type === "checkbox") {
      return (
        <div
          className={
            props.className +
            " w-max p-4 h-min flex items-center justify-around gap-4 rounded-full font-semibold py-2 bg-red-600"
          }
        >
          <label htmlFor="$checkbox">{props.label}</label>

          <FontAwesomeIcon
            id="$checkbox"
            onClick={icon?.onClick}
            icon={props.isselected === "true" ? faSquareCheck : faSquare}
            className="hover:cursor-pointer hover:opacity-90"
          />
        </div>
      );
    }

    return (
      <div className="w-full">
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
            <small className="text-lg font-semibold">
              <b className={props.required ? "!text-red-400" : ""}>
                {" "}
                {props.disabled ? "" : props.required ? "*" : ""}{" "}
              </b>
              <small className="text-xs">{props.readOnly ? " (Read Only)" : ""}</small>
            </small>
          </label>
        ) : (
          <div className="w-full h-7"></div>
        )}
        <div className={styles.inputWrapper}>
          {icon && (
            <FontAwesomeIcon
              {...icon}
              className={[styles.icon, icon.className].join(" ")}
            />
          )}
          <input
            {...props}
            ref={ref}
            className={[props.className, styles.input, "truncate"].join(
              " "
            )}
            name={
              !props.name
                ? props.label?.replaceAll(" ", "_").toLowerCase()
                : props.name
            }
          />
          {children}
        </div>
      </div>
    );
  }
);
UserInput.displayName = "UserInput";
export default UserInput;
