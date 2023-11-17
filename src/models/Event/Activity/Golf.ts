import { Activity, Golf } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";
const golfSchema = new Schema<Activity<Golf>>({
  ...activitySchema.obj,
  course: String,
  holes: Number,
  teeTimes: {
    type: [
      {
        date: Date,
        time: String,
        price: Number,
        _id: false,
      },
    ],
    default: [],
  },
  golfCartRental: Boolean,
  golfClubRental: Boolean,
  golfLessons: Boolean,
  courseDescription: String,
  courseDifficulty: String,
});

export const GolfModel =
  EventModel.discriminators?.Golf ||
  EventModel.discriminator<Activity<Golf>>("Golf", golfSchema);
