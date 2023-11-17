import { Activity, Zoo } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

const zooSchema = new Schema<Activity<Zoo>>({
  ...activitySchema.obj,
  feedingSchedule: {
    type: [
      {
        name: String,
        time: String,
        _id: false,
      },
    ],
    default: [],
  },
  interactiveExperiences: {
    type: [
      {
        name: String,
        time: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  conservationPrograms: {
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
  animalExhibits: {
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
});

export const ZooModel =
  EventModel.discriminators?.Zoo ||
  EventModel.discriminator<Activity<Zoo>>("Zoo", zooSchema);
