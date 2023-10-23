"use client";
import {
  DashboardAction,
  DashboardContext,
  DashboardDispatch,
  TDashboardContext
} from "@/context";
import { useReducer } from "react";
import Handler from "./Handler";

type DashboardProviderProps = {
  value: TDashboardContext;
  children: React.ReactNode;
};

export default function Provider({ ...props }: DashboardProviderProps) {
  const { value, children } = props;

  const [ctx, dispatch] = useReducer(Reducer, value);

  const Manager = async (action: DashboardAction) => {
    try {
      const res = await Handler(action);
    } catch (err) {
      return console.log(err);
    }

    return dispatch(action);
  };

  return (
    <DashboardContext.Provider value={ctx}>
      <DashboardDispatch.Provider value={Manager}>
        {children}
      </DashboardDispatch.Provider>
    </DashboardContext.Provider>
  );
}

const Reducer = (subject: TDashboardContext, action: DashboardAction) => {
  console.log(action);

  return subject;
};
