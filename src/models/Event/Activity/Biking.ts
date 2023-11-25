import { Schema } from "mongoose";
import { activitySchema } from ".";
import { Activity, Biking } from "@/types/Event";
import { hikingSchema } from "./Hiking";
import { EventModel } from "..";
import { PeekData } from "@/types";

const bikingSchema = new Schema<Activity<Biking>>({
  ...activitySchema.obj,
  ...hikingSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/biking.png",
  },
});

bikingSchema.virtual("displayData").get(function (this: Activity<Biking>) {
  const unit = "km";
  const elevationUnit = "m";
  return {
    "Biking Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Trail: this.trail,
    Difficulty: this.difficulty,
    Rating: `${this.rating} ⭐️`,
    Distance: `${this.distance}${unit}`,
    "Elevation Gain": `${this.elevationGain}${elevationUnit}`,
  };
});

bikingSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Biking>) {
    /** Camping Options */
    /** Rest Stops */
    /** ... */
  });
bikingSchema
  .virtual("peek")
  .get(function (this: Activity<Biking>): PeekData {
    const unit = "km";

    return [
      {
        label: "Biking",
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

export const BikingModel =
  EventModel.discriminators?.Biking ||
  EventModel.discriminator<Activity<Biking>>("Biking", bikingSchema);
