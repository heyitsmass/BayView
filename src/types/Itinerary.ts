import { HydratedDocument, Document, FlattenMaps } from "mongoose";
import { Event } from "./Event";
import { PartyMember } from "@/components/Itinerary/Party";
import { DisplayData } from ".";
import { FlattenedEvent } from "@/app/home/itinerary/page";

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
