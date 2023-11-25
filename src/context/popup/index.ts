"use client";

import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type PopupVariant = "success" | "error" | "warning" | "info";

export type TPopupContext =
  | {
      duration?: number;
      message: string;
      variant?: PopupVariant;
    }
  | undefined;

export type TPopupDispatch = Dispatch<SetStateAction<TPopupContext>>;

const PopupContext = createContext<TPopupContext>(undefined);

const PopupDispatch = createContext<TPopupDispatch>(
  (popup: SetStateAction<TPopupContext>) => {}
);

const usePopup = () => {
  return useContext(PopupContext);
};

const usePopupDispatch = () => {
  return useContext(PopupDispatch);
};

export { PopupContext, PopupDispatch, usePopup, usePopupDispatch };
