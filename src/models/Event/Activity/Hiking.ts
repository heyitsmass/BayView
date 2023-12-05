import { Offer, PeekData } from "@/types";
import { Event, Hiking } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

export const hikingSchema = new Schema<Event<Hiking>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/hiking.png"
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
  campingOptions: Boolean
});

hikingSchema.virtual("displayData").get(function (this: Event<Hiking>) {
  const unit = "km";
  return {
    Name: this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Trail: this.trail,
    Difficulty: this.difficulty,
    Rating: `${this.rating} ⭐️`,
    Distance: `${this.distance}${unit}`,
    "Starting Point": this.startingPoint
  };
});

hikingSchema.virtual("upgradeOptions").get(function (this: Event<Hiking>) {
  /** Camping Options */
  /** Rest Stops */
  /** ... */
});
hikingSchema.virtual("peek").get(function (this: Event<Hiking>): PeekData {
  const unit = "km";

  return [
    {
      label: "Hiking",
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

hikingSchema.virtual("offer").get(function (this: Event<Hiking>): Offer {
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

export const HikingModel =
  EventModel.discriminators?.Hiking ||
  EventModel.discriminator<Event<Hiking>>("Hiking", hikingSchema);
