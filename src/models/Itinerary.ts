import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";

export const itinerarySchema = new Schema<IItinerary>({
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false},
  events: [eventSchema]
});

const Itineraries =
  mongoose.models?.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

export default Itineraries;
