import { Activity, Hiking } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

export const hikingSchema = new Schema<Activity<Hiking>>({
  ...activitySchema.obj,
  trail: String,
  difficulty: String,
  length: Number,
  rating: Number,
  distance: Number,
  startingPoint: String,
  elevationGain: Number,
  recommendedGear: [String],
  pointsOfInterest: [String],
  campingOptions: Boolean,
});

export const HikingModel =
  EventModel.discriminators?.Hiking ||
  EventModel.discriminator<Activity<Hiking>>("Hiking", hikingSchema);
