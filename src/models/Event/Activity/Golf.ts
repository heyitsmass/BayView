import { Offer, PeekData } from "@/types";
import { Event, Golf } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const teeTimeSchema = {
  date: Date,
  time: String,
  price: Number,
  _id: false
};
const golfSchema = new Schema<Event<Golf>>({
  ...eventSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/golf.png"
  },

  course: String,
  holes: Number,
  teeTime: teeTimeSchema,
  golfCartRental: Boolean,
  golfClubRental: Boolean,
  golfLessons: Boolean,
  courseDescription: String,
  courseDifficulty: String
});

golfSchema.virtual("displayData").get(function (this: Event<Golf>) {
  return {
    Address: [this.location.street, this.location.street].join(", "),
    Course: this.course,
    "Tee Time Date": this.teeTime.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric"
    }),
    "Tee Time Time": this.teeTime.time,
    "Cart Rental": this.golfCartRental ? "Available" : "Unavailable",
    "Club Rental": this.golfClubRental ? "Available" : "Unavailable",
    "Course Difficulty": this.courseDifficulty
  };
});

golfSchema.virtual("upgradeOptions").get(function (this: Event<Golf>) {
  /** Golf Carts */
  /** Golf Clubs */
  /** Golf Lessions */
});

golfSchema.virtual("peek").get(function (this: Event<Golf>): PeekData {
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
      value: this.teeTime.time
    },
    {
      label: "Difficulty",
      value: this.courseDifficulty
    }
  ];
});

golfSchema.virtual("offer").get(function (this: Event<Golf>): Offer {
  return [
    faker.string.uuid(),
    this.teeTime.time,
    this.course,
    this.holes,
    this.courseDifficulty,
    null,
    this.teeTime.price
  ];
});

export const GolfModel =
  EventModel.discriminators?.Golf ||
  EventModel.discriminator<Event<Golf>>("Golf", golfSchema);
