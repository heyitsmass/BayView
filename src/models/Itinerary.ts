import { IItinerary } from "@/types/Itinerary";
import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";
import { Currency } from "@faker-js/faker";

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
    party: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true }
      }
    ],
    title: { type: String, default: "My Itinerary" },
    currency: {
      type: currencySchema,
      default: {
        name: "United States Dollar",
        code: "USD",
        symbol: "$"
      }
    }
  },
  {
    strict: false
  }
);

export const ItineraryModel =
  mongoose.models.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

/** Legacy !! Deprecated !! */
export default ItineraryModel;
