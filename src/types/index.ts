import { HydratedDocument } from "mongoose";
import { Event, EventTypes } from "./Event";
import { Notifiers } from "@/lib/notifier";

export type FlattenedEvent = Event &
  DisplayData & {
    _id: string;
    __t: EventTypes;
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

