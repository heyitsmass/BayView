"use client";

import { Credentials } from "google-auth-library";
import { useContext, createContext } from "react";

export type THomepageContext = {
  credentials: Credentials;
};

export type HomepageAction = {
  type: string;
};

export type THomepageDispatch = (action: HomepageAction) => Promise<void>;

const HomepageContext = createContext<THomepageContext | null>(null);
const HomepageDispatch = createContext(
  async (action: HomepageAction) => {}
);

const useHomepage = () => {
  return useContext(HomepageContext);
};

const useHomepageDispatch = () => {
  return useContext(HomepageDispatch);
};

export {
  useHomepage,
  useHomepageDispatch,
  HomepageContext,
  HomepageDispatch
};
