"use client";

import { RequestActions } from "@/handlers/Itinerary/actions/helpers";
import { DisplayableEvent } from "@/lib/random/handler";
import { FlattenedItinerary } from "@/types/Itinerary";
import { UserMetadata } from "@/types/User";
import { createContext } from "react";

export type THomepageContext = {
  user: {
    _id: string;
    metadata: UserMetadata;
  };
  itinerary: FlattenedItinerary;
};

export type HomepageAction =
  | {
      type: "itinerary";
      mode: "actions";
      payload: RequestActions;
    }
  | {
      type: "event";
      mode: "add" | "delete" | "refresh";
      payload: DisplayableEvent;
    };

export type THomepageDispatch = (action: HomepageAction) => void;
export type THomepageManager = (action: HomepageAction) => Promise<void>;

const HomepageContext = createContext<THomepageContext>({} as THomepageContext);
const HomepageDispatch = createContext<THomepageDispatch>(
  (action: HomepageAction) => {}
);
const HomepageManager = createContext(async (action: HomepageAction) => {});

export { HomepageContext, HomepageDispatch, HomepageManager };

