import { Offer, PeekData } from "@/types";
import { Activity, Biking, Event, Hiking } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";
import { hikingSchema } from "./Hiking";

const bikingSchema = new Schema<Event<Biking>>({
  ...(eventSchema.obj as Object),
  ...hikingSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/biking.png"
  }
});

bikingSchema.virtual("displayData").get(function (this: Event<Biking>) {
  const unit = "km";
  const elevationUnit = "m";
  return {
    "Biking Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Trail: this.trail,
    Difficulty: this.difficulty,
    Rating: `${this.rating} ⭐️`,
    Distance: `${this.distance}${unit}`,
    "Elevation Gain": `${this.elevationGain}${elevationUnit}`
  };
});

bikingSchema.virtual("upgradeOptions").get(function (this: Event<Biking>) {
  /** Camping Options */
  /** Rest Stops */
  /** ... */
});
bikingSchema.virtual("peek").get(function (this: Event<Biking>): PeekData {
  const unit = "km";

  return [
    {
      label: "Biking",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.trail
    },
    {
      label: "Difficulty",
      value: this.difficulty
    },
    {
      label: "Rating",
      value: `${this.rating} ⭐️`
    },
    {
      label: "Distance",
      value: `${this.distance}${unit}`
    }
  ];
});

bikingSchema.virtual("offer").get(function (this: Event<Biking>): Offer {
  return [
    faker.string.uuid(),
    this.difficulty,
    this.trail,
    this.rating,
    null,
    null,
    this.distance
  ];
});

export const BikingModel =
  EventModel.discriminators?.Biking ||
  EventModel.discriminator<Event<Biking>>("Biking", bikingSchema);
