import { Activity, Aquarium } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

export const aquariumSchema = new Schema<Activity<Aquarium>>({
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
  underwaterTunnel: Boolean, // Indicates whether there's an underwater tunnel for visitors
  touchPools: Boolean, // Indicates whether there are touch pools for interactive experiences
  showSchedule: {
    type: [
      {
        date: Date,
        time: String,
        _id: false,
      },
    ],
    default: [],
  }, // Schedule for shows and presentations
});

export const AquariumModel =
  EventModel.discriminators?.Aquarium ||
  EventModel.discriminator<Activity<Aquarium>>("Aquarium", aquariumSchema);
