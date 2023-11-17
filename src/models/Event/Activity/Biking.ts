import { Schema } from "mongoose";
import { activitySchema } from ".";
import { Activity, Biking } from "@/types/Event";
import { hikingSchema } from "./Hiking";
import { EventModel } from "..";

const bikingSchema = new Schema<Activity<Biking>>({
  ...activitySchema.obj,
  ...hikingSchema.obj,
});

export const BikingModel =
  EventModel.discriminators?.Biking ||
  EventModel.discriminator<Activity<Biking>>("Biking", bikingSchema);
