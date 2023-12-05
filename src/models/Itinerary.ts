import { IItinerary } from "@/types/Itinerary";
import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";

const currencySchema = {
  name: String,

  code: String,

  symbol: String,
  _id: false
};

export const itinerarySchema = new Schema<IItinerary>(
  {
    _id: { type: String, required: true, immutable: true },
    events: [eventSchema],
    location: { type: String, default: "Adventure Haven Park" },
    title: { type: String, default: "My Itinerary" },
    region: {
      type: String,
      default: "en"
    },
    currency: {
      type: currencySchema,
      default: {
        name: "United States Dollar",
        code: "USD",
        symbol: "$"
      }
    },
    locale: {
      type: String,
      default: "en"
    },
    speedUnit: {
      type: String,
      default: "mph"
    },
    distanceUnit: {
      type: String,
      default: "mi"
    },
    temperateUnit: {
      type: String,
      default: "F"
    },
    unitSystem: {
      type: String,
      default: "IMPERIAL"
    }
  },
  {
    strict: false
  }
);

export const ItineraryModel = (mongoose.models.Itinerary ||
  mongoose.model<IItinerary>(
    "Itinerary",
    itinerarySchema
  )) as mongoose.Model<IItinerary, {}, {}, {}>;

/** Legacy !! Deprecated !! */
export default ItineraryModel;
