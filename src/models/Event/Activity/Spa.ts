import { Activity, Spa } from "@/types/Event";
import { Schema } from "mongoose";
import { activitySchema } from ".";
import { EventModel } from "..";
const spaSchema = new Schema<Activity<Spa>>({
  ...activitySchema.obj,
  spaRating: Number,
  services: {
    type: [
      {
        name: String,
        price: Number,
        _id: false,
      },
    ],
    default: [],
  },
  openingHours: String,
  spaPackages: {
    type: [
      {
        name: String,
        price: Number,
        _id: false,
      },
    ],
    default: [],
  },
  wellnessClasses: {
    type: [
      {
        name: String,
        price: Number,
        _id: false,
      },
    ],
    default: [],
  },
  bookingPolicy: String,
});

export const SpaModel =
  EventModel.discriminators?.Spa ||
  EventModel.discriminator<Activity<Spa>>("Spa", spaSchema);
