import { Document, FlattenMaps, HydratedDocument } from "mongoose";
import { Event } from "./Event";

import { DisplayableEvent } from "@/lib/random/handler";
import { Currency } from "@faker-js/faker";
import { ParkLocations } from ".";
import { PartyMember } from "./User";
import { Lang } from "@/utils/openWeather/langText";

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
  party: PartyMember[];
  locale: Lang;
  speedUnit: SpeedUnit;
  distanceUnit: DistanceUnit;
  temperateUnit: TemperatureUnit;
  region: Region;
};

type BaseData = {
  title: string;
  location: ParkLocations;
};

export interface IItinerary extends UserData, BaseData {
  events: Event[];
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
