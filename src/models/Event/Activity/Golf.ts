import { Activity, Golf } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";
import { PeekData } from "@/types";
const golfSchema = new Schema<Activity<Golf>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/golf.png",
  },

  course: String,
  holes: Number,
  teeTimes: {
    type: [
      {
        date: Date,
        time: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  golfCartRental: Boolean,
  golfClubRental: Boolean,
  golfLessons: Boolean,
  courseDescription: String,
  courseDifficulty: String
});

golfSchema.virtual("displayData").get(function (this: Activity<Golf>) {
  const teeTime = this.teeTimes[0];

  return {
    "Golf Course Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Course: this.course,
    "Tee Time Date": teeTime.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric"
    }),
    "Tee Time Time": teeTime.time,
    "Cart Rental": this.golfCartRental ? "Available" : "Unavailable",
    "Club Rental": this.golfClubRental ? "Available" : "Unavailable",
    "Course Difficulty": this.courseDifficulty
  };
});

golfSchema.virtual("upgradeOptions").get(function (this: Activity<Golf>) {
  /** Golf Carts */
  /** Golf Clubs */
  /** Golf Lessions */
});
golfSchema.virtual("peek").get(function (this: Activity<Golf>): PeekData {
  return [
    {
      label: "Golf",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.course
    },
    {
      label: "Holes",
      value: this.holes
    },
    {
      label: "Tee Time",
      value: this.teeTimes[0].time
    },
    {
      label: "Difficulty",
      value: this.courseDifficulty
    }
  ];
});

export const GolfModel =
  EventModel.discriminators?.Golf ||
  EventModel.discriminator<Activity<Golf>>("Golf", golfSchema);
