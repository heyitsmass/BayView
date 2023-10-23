import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";

export const itinerarySchema = new Schema<IItinerary>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  events: [eventSchema]
});

const Itineraries =
  mongoose.models.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

export default Itineraries;
