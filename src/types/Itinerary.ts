import { Document, FlattenMaps, HydratedDocument } from "mongoose";
import { Event } from "./Event";

import { FlattenedEvent } from "@/app/home/itinerary/page";
import { PartyMember } from "./User";

export interface IItinerary {
  readonly _id: string;
  events: Event[];
  party: PartyMember[];
}

export type FlattenedItinerary = {
  readonly _id: string;
  events: FlattenedEvent[];
  party: PartyMember[];
};

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
