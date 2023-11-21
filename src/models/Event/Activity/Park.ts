import { Activity, Park } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

const parkSchema = new Schema<Activity<Park>>({
  ...activitySchema.obj,
  activities: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  }, // List of activities available in the park (e.g., hiking, biking, swimming)
  openingHours: String,
  facilities: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  }, // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  }, // Features like lakes, trails, etc.
  wildlife: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  }, // Types of wildlife commonly found in the park
  // ... (other park-specific properties)
});

export const ParkModel =
  EventModel.discriminators?.Park ||
  EventModel.discriminator<Activity<Park>>("Park", parkSchema);
