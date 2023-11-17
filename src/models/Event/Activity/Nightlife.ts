import { Activity, Nightlife } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

const nightlifeSchema = new Schema<Activity<Nightlife>>({
  ...activitySchema.obj,
  venue: String,
  type: String,
  openingHours: String,
  dressCode: String,
  ageRestriction: Number,
  coverCharge: Number,
  livePerformances: Boolean,
  music: [String],
  drinks: [String],
  food: [String],
  atmosphere: String,
});

export const NightlifeModel =
  EventModel.discriminators?.Nightlife ||
  EventModel.discriminator<Activity<Nightlife>>(
    "Nightlife",
    nightlifeSchema
  );
