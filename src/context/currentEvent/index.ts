import { FlattenedEvent } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

export const CurrentEventContext = React.createContext<FlattenedEvent>(
  {} as FlattenedEvent
);

export const CurrentEventDispatch = React.createContext<
  Dispatch<SetStateAction<number>>
>(() => {});
