import { HydratedDocument, Document, FlattenMaps } from "mongoose";
import { Event } from "./Event";

export interface IItinerary {
  readonly _id: string;
  events: Event[];
}

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
