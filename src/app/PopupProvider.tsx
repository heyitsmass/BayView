"use client";
import { Popup } from "@/components/Popup";
import {
  PopupContext,
  PopupDispatch,
  TPopupContext,
} from "@/context/popup";
import { ReactNode, useState } from "react";

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<TPopupContext>();

  return (
    <PopupContext.Provider value={popup}>
      <PopupDispatch.Provider value={setPopup}>
        {children}
        <Popup />
      </PopupDispatch.Provider>
    </PopupContext.Provider>
  );
};
