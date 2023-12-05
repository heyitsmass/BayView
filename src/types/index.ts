import { Notifiers } from "@/lib/notifier";
import { HydratedDocument } from "mongoose";
import { ReactNode } from "react";
import { TEventType } from "./Event";
import { P } from "vitest/dist/reporters-5f784f42";

export const timeZones = [
  "Pacific/Midway",
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Caracas",
  "America/Halifax",
  "America/St_Johns",
  "America/Sao_Paulo",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Europe/London",
  "Europe/Paris",
  "Europe/Istanbul",
  "Africa/Cairo",
  "Africa/Nairobi",
  "Asia/Dubai",
  "Asia/Kabul",
  "Asia/Karachi",
  "Asia/Dhaka",
  "Asia/Kolkata",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Australia/Darwin",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Pacific/Noumea",
  "Pacific/Auckland",
  "Pacific/Tongatapu",
  "Pacific/Kiritimati"
] as const;

export type TimeZones = (typeof timeZones)[number];

export const Parks = [
  "Adventure Haven Park",
  "ThrillTopia",
  "FunQuest Park"
] as const;

export type Offer = [
  id: string,
  time: string,
  name: string,
  duration: ReactNode | null,
  below_duration: ReactNode | null,
  extra: ReactNode | null,
  price: number | string | null
];

export type ParkLocations = (typeof Parks)[number];

export type DiningOptions = "Breakfast" | "Lunch" | "Dinner";

export type FlattenedEvent = TEventType &
  DisplayData & {
    _id: string;
    __t: TEventType;
  };

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
  offer: Offer;
};

export type THydratedEvent<T extends TEventType = TEventType> =
  HydratedDocument<T> & DisplayData;

export type DocumentWithDisplayData<T = any> = HydratedDocument<T> &
  DisplayData;

export type PeekData = [
  title: PeekInfo,
  Pick<PeekInfo, "value">,
  description: PeekInfo,
  data: PeekInfo,
  extra: PeekInfo
];

export type PeekInfo = {
  label?: string;
  value: any;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string;
};

export type Geocode = {
  lat: number;
  lng: number;
};

type GeometryComponent = {
  location: Geocode;
  location_type: string;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};

type PlusCodeComponent = {
  compound_code: string;
  global_code: string;
};

export type SuccessResponse = {
  results: [
    {
      address_components: AddressComponent[];
      formatted_address: string;
      geometry: GeometryComponent;
      place_id: string;
      plus_code: PlusCodeComponent;
      types: string[];
    }
  ];
  status: "OK";
};

export type BadRequestResponse = {
  error_message: "The provided API key is invalid. ";
  results: [];
  status: "REQUEST_DENIED";
};

export type ZeroResultsResponse = {
  results: [];
  status: "ZERO_RESULTS";
};

export type GoogleGeoCodeResponse =
  | SuccessResponse
  | BadRequestResponse
  | ZeroResultsResponse;

export type NotifyMethods = Notifiers;
export type UpdateMethods = "del" | "refresh";
export type InfoMethods = "map" | "directions" | "weather";
export type ShareMethods = "rss" | "social" | "link";
