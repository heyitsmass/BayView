import {
  CurrentEventContext,
  CurrentEventDispatch
} from "@/context/currentEvent";
import { useContext } from "react";

const useCurrentEvent = () => {
  return useContext(CurrentEventContext);
};

const useCurrentEventDispatch = () => {
  return useContext(CurrentEventDispatch);
};

export { useCurrentEvent, useCurrentEventDispatch };
