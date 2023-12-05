import { DisplayData } from "@/types";
import { Event } from "@/types/Event";
import mongoose, { Schema } from "mongoose";

const locationSchema = {
  street: String,
  city: String,
  state: String,
  zip: String,
  lat: Number,
  lng: Number,
  _id: false
};

export const eventSchema = new Schema<Event<any>>({
  name: String,
  date: Date,
  party: [String],
  location: locationSchema,
  picture_url: String,
  description: String
});

export const EventModel = (mongoose.models?.Event ||
  mongoose.model<Event<any>>("Event", eventSchema)) as mongoose.Model<
  Event,
  {},
  {},
  DisplayData
>;
