"use client";

import {
  HomepageAction,
  HomepageContext,
  HomepageDispatch,
  HomepageManager,
  THomepageContext,
} from "@/context";
import { useReducer } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Handler from "./Handler";
import { usePopupDispatch } from "@/context/popup";

type HomepageProviderProps = {
  value: THomepageContext;
  children?: React.ReactNode;
};

export default function Provider({ ...props }: HomepageProviderProps) {
  const { value, children } = props;

  const [ctx, dispatch] = useReducer(Reducer, value);
  const createPopup = usePopupDispatch();

  const Manager = async (action: HomepageAction) => {
    const { statusCode, body } = await Handler(action);

    if (statusCode !== 200) {
      return createPopup({
        variant: "error",
        message: body.message,
      });
    }

    return dispatch(action);
  };

  return (
    <HomepageContext.Provider value={ctx}>
      <HomepageDispatch.Provider value={dispatch}>
        <HomepageManager.Provider value={Manager}>
          <SessionAuth>{children}</SessionAuth>
        </HomepageManager.Provider>
      </HomepageDispatch.Provider>
    </HomepageContext.Provider>
  );
}

export const Reducer = (
  subject: THomepageContext,
  action: HomepageAction
) => {
  switch (action.type) {
    case "SET":
      return (subject = {
        ...subject,
        user: action.payload.user,
      });
  }

  return subject;
};
