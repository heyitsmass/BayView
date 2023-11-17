import { Event } from "@/types/Event";
import mongoose, { Schema } from "mongoose";

export const eventSchema = new Schema<Event>({
  name: String,
  date: Date,
  time: String || undefined,
  location: {
    street: String,
    city: String,
    state: String,
    zip: String,
    _id: false,
  },
  description: String,
});

export const EventModel =
  mongoose.models.Event || mongoose.model<Event>("Event", eventSchema);
