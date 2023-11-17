import { Activity, Waterpark } from "@/types/Event";
import { activitySchema } from ".";
import { Schema } from "mongoose";
import { EventModel } from "..";

const waterparkSchema = new Schema<Activity<Waterpark>>({
  ...activitySchema.obj,
  attractions: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  waterSlides: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  openingHours: String,
  admissionFee: Number,
  wavePool: Boolean, // Indicates whether there's a wave pool
  lazyRiver: Boolean, // Indicates whether there's a lazy river
});

export const WaterparkModel =
  EventModel.discriminators?.Waterpark ||
  EventModel.discriminator<Activity<Waterpark>>(
    "Waterpark",
    waterparkSchema
  );
