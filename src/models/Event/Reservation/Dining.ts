import { Dining, Reservation } from "@/types/Event";
import { EventModel } from "..";
import { reservationSchema } from ".";
import { Schema } from "mongoose";
const diningSchema = new Schema<Reservation<Dining>>({
  ...reservationSchema.obj,
  mealPeriodInfo: {
    name: String,
    experience: String,
    priceLegend: String,
    primaryCuisineType: String,
    _id: false,
  },
  priceRange: String,
  admissionRequired: Boolean,
  offers: {
    type: Map,
    of: [
      {
        offerId: String,
        time: String,
        label: String,
        _id: false,
      },
    ],
    default: {},
  },
});

export const DiningModel =
  EventModel.discriminators?.Dining ||
  EventModel.discriminator<Reservation<Dining>>("Dining", diningSchema);
