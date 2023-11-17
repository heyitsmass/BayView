import { Activity, Sports } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";

const sportsSchema = new Schema<Activity<Sports>>({
  ...activitySchema.obj,
  type: String,
  event: String,
  teams: [String],
  stadiumName: String,
  stadiumCapacity: Number,
  broadcastingChannels: [String],
});

export const SportsModel =
  EventModel.discriminators?.Sports ||
  EventModel.discriminator<Activity<Sports>>("Sports", sportsSchema);
