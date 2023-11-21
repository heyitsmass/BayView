import { Activity, Museum } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";
const museumSchema = new Schema<Activity<Museum>>({
  ...activitySchema.obj,
  exhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  admissionFee: Number,
  openingHours: String,
  specialEvents: {
    type: [
      {
        name: String,
        description: String,
        date: Date,
        time: String,
        _id: false,
      },
    ],
    default: [],
  }, // List of special events or exhibitions
  guidedTours: Boolean, // Indicates whether guided tours are available
  audioGuide: Boolean, // Indicates whether audio guides are available
});

export const MuseumModel =
  EventModel.discriminators?.Museum ||
  EventModel.discriminator<Activity<Museum>>("Museum", museumSchema);
