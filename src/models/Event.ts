import { Activity, Event, Flight, Hotel, Reservation } from "@/types/Event";
import mongoose, { Schema } from "mongoose";

export const eventSchema = new Schema<Event>(
  {
    eventType: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: false }
  },
  {
    _id: false
  }
);

const Events =
  mongoose.models.Events || mongoose.model("Events", eventSchema);
export default Events;
