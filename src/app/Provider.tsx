"use client";

import { useReducer } from "react";
import Handler from "./Handler";
import {
  HomepageAction,
  HomepageContext,
  HomepageDispatch,
  THomepageContext
} from "@/context";

type HomepageProviderProps = {
  value: THomepageContext;
  children: React.ReactNode;
};

export default function Provider({ ...props }: HomepageProviderProps) {
  const { value, children } = props;

  const [ctx, dispatch] = useReducer(Reducer, value);

  const Manager = async (action: HomepageAction) => {
    try {
      const res = await Handler(action);
    } catch (err) {
      return console.log(err);
    }

    return dispatch(action);
  };

  return (
    <HomepageContext.Provider value={ctx}>
      <HomepageDispatch.Provider value={Manager}>
        {children}
      </HomepageDispatch.Provider>
    </HomepageContext.Provider>
  );
}

const Reducer = (subject: THomepageContext, action: HomepageAction) => {
  console.log(action);

  return subject;
};
