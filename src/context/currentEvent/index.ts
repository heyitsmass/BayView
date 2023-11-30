import { DisplayableEvent } from "@/lib/random/handler";
import { FlattenedEvent } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

export const CurrentEventContext = React.createContext<
  DisplayableEvent | undefined
>(undefined);

export const CurrentEventDispatch = React.createContext<
  Dispatch<SetStateAction<number>>
>(() => {});
