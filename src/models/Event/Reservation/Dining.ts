import { Offer, PeekData } from "@/types";
import { Dining, Event } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const mealPeriodInfoSchema = {
  name: String,
  experience: String,
  priceLegend: String,
  primaryCuisineType: String,
  _id: false
};

const offer = {
  id: String,
  time: String,
  label: String,
  _id: String
};

const diningSchema = new Schema<Event<Dining>>({
  ...eventSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/dining.png"
  },
  party: {
    type: [String],
    default: []
  },
  mealPeriodInfo: {
    type: mealPeriodInfoSchema
  },
  priceRange: String,
  mealOffer: offer
});

diningSchema.virtual("displayData").get(function (this: Event<Dining>) {
  return {
    "Restaurant Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Meal Period": this.mealPeriodInfo.name,
    "Price Range": this.priceRange,
    "Party Size": this.party.length,
    Cuisine: this.mealPeriodInfo.cuisine
  };
});

diningSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<Dining>) {});

diningSchema.virtual("peek").get(function (this: Event<Dining>): PeekData {
  return [
    {
      label: "Dining",
      value: this.date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric"
      })
    },
    {
      value: this.name
    },
    {
      label: "Price Range",
      value: this.priceRange
    },
    {
      label: "Party Size",
      value: this.party.length
    },
    {
      label: "Cuisine",
      value: this.mealPeriodInfo.cuisine
    }
  ];
});

diningSchema.virtual("offer").get(function (this: Event<Dining>): Offer {
  return [
    faker.string.uuid(),
    this.date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric"
    }),
    this.name,
    this.mealPeriodInfo.experience,
    this.mealPeriodInfo.cuisine,
    this.party.length,
    this.mealPeriodInfo.price
  ];
});

export const DiningModel =
  EventModel.discriminators?.Dining ||
  EventModel.discriminator<Event<Dining>>("Dining", diningSchema);
