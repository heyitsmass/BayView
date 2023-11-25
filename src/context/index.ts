"use client";

import { FlattenedItinerary, ItineraryWithMongo } from "@/types/Itinerary";
import { UserMetadata } from "@/types/User";
import { createContext, useContext } from "react";

export type THomepageContext = {
  user: {
    _id: string;
    metadata: UserMetadata;
  };
  itinerary: FlattenedItinerary;
};

export type HomepageAction = {
  type: string;
  payload?: any;
};

export type THomepageDispatch = (action: HomepageAction) => void;
export type THomepageManager = (action: HomepageAction) => Promise<void>;

const HomepageContext = createContext<THomepageContext>(
  {} as THomepageContext
);
const HomepageDispatch = createContext<THomepageDispatch>(
  (action: HomepageAction) => {}
);
const HomepageManager = createContext(async (action: HomepageAction) => {});

const useHomepage = () => {
  return useContext(HomepageContext);
};

const useHomepageDispatch = () => {
  return useContext(HomepageDispatch);
};

const useHomepageManager = () => {
  return useContext(HomepageManager);
};

export {
  HomepageContext,
  HomepageDispatch,
  HomepageManager,
  useHomepage,
  useHomepageDispatch,
  useHomepageManager,
};
