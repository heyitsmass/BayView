import { Activity, Hiking } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

export const hikingSchema = new Schema<Activity<Hiking>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/hiking.png",
  },
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

hikingSchema.virtual("displayData").get(function (this: Activity<Hiking>) {
  const unit = "km";
  return {
    Name: this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Trail: this.trail,
    Difficulty: this.difficulty,
    Rating: `${this.rating} ⭐️`,
    Distance: `${this.distance}${unit}`,
    "Starting Point": this.startingPoint,
  };
});

hikingSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Hiking>) {
    /** Camping Options */
    /** Rest Stops */
    /** ... */
  });
hikingSchema
  .virtual("peek")
  .get(function (this: Activity<Hiking>): PeekData {
    const unit = "km";

    return [
      {
        label: "Hiking",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
      },
      {
        value: this.trail,
      },
      {
        label: "Difficulty",
        value: this.difficulty,
      },
      {
        label: "Rating",
        value: `${this.rating} ⭐️`,
      },
      {
        label: "Distance",
        value: `${this.distance}${unit}`,
      },
    ];
  });

export const HikingModel =
  EventModel.discriminators?.Hiking ||
  EventModel.discriminator<Activity<Hiking>>("Hiking", hikingSchema);
