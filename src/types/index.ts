import { HydratedDocument } from "mongoose";

export type Currency = "$" | "€" | "£" | "¥" | "₹";

export type Upgrade<T extends Currency = "$"> = {
  name: string;
  description?: string;
  priceRange: `${T}` | `${T}${T}` | `${T}${T}${T}`;
  pricePerUpgrade: number;
  picture_url: string;
};

export type Upgrades<T extends Currency = "$"> = {
  title: string;
  partySize: number;
  subtitle?: string;
  currentUpgrade: string;
  currentPrice: number;
  currency: T;
  altText: string;
  upgrades: Upgrade<T>[];
};

export type UpgradeProps = Upgrade &
  Pick<Upgrades, "altText" | "currency" | "partySize" | "subtitle">;

export type DisplayData = {
  displayData: Record<string, string>;
  upgradeOptions?: Upgrades;
  picture_url: string;
  peek: PeekData;
};

export type DocumentWithDisplayData<T = any> = HydratedDocument<T> &
  DisplayData;

export type PeekData = [
  title: PeekInfo,
  {
    value: string;
  },
  description: PeekInfo,
  data: PeekInfo,
  extra: PeekInfo
];

export type PeekInfo = {
  label?: string;
  value: any;
};
