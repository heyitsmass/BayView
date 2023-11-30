import { Document, FlattenMaps, HydratedDocument } from "mongoose";
import { Event } from "./Event";

import { DisplayData, FlattenedEvent, ParkLocations } from ".";
import { PartyMember } from "./User";
import { DisplayableEvent } from "@/lib/random/handler";
import { Currency } from "@faker-js/faker";

type UserData = {
  readonly _id: string;
  currency: Currency;
  party: PartyMember[];
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
