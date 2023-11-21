import { Activity } from "@/types/Event";
import { Schema } from "mongoose";
import { eventSchema } from "..";

/** Legacy !! Deprecated !! */
export const activitySchema = new Schema<Activity<any>>({
  ...eventSchema.obj,
});
