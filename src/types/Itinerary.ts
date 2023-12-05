import { Document, FlattenMaps, HydratedDocument } from "mongoose";
import { TEventType } from "./Event";

import { Locale } from "@/utils/openWeather/langText";
import { Currency } from "@faker-js/faker";
import { ParkLocations } from ".";
import { PartyMember } from "./User";
import { DisplayableEvent } from "@/components/HomePage/EventFinder";

type SpeedUnit = "mph" | "km/h";
type DistanceUnit = "mi" | "km";
type TemperatureUnit = "F" | "C" | "K";
type Region =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "uk"
  | "zh_tw";


type UserData = {
  readonly _id: string;
  currency: Currency;
  locale: Locale;
  speedUnit: SpeedUnit;
  distanceUnit: DistanceUnit;
  temperateUnit: TemperatureUnit;
  region: Region;
  unitSystem: "IMPERIAL" | "METRIC";
};

type BaseData = {
  title: string;
  location: ParkLocations;
};

export interface IItinerary extends UserData, BaseData {
  events: TEventType[];
}

export type FlattenedItinerary = FlattenMaps<
  BaseData &
    UserData & {
      events: DisplayableEvent[];
    }
>;

export type ItineraryWithoutMongo = Document<
  string,
  {},
  FlattenMaps<IItinerary>
> &
  FlattenMaps<IItinerary> &
  Required<{
    _id: string;
  }>;

export type ItineraryWithMongo = HydratedDocument<ItineraryWithoutMongo>;
