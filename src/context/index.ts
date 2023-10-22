'use client';

import { Credentials } from 'google-auth-library';
import { useContext, createContext } from 'react';

export type TDashboardContext = {
  credentials: Credentials;
};

export type DashboardAction = {
  type: string;
};

export type TDashboardDispatch = (action: DashboardAction) => Promise<void>;

const DashboardContext = createContext<TDashboardContext | null>(null);
const DashboardDispatch = createContext(async (action: DashboardAction) => {});

const useDashboard = () => {
  return useContext(DashboardContext);
};

const useDashboardDispatch = () => {
  return useContext(DashboardDispatch);
};

export {
  useDashboard,
  useDashboardDispatch,
  DashboardContext,
  DashboardDispatch
};
