import { Dining, Reservation } from "@/types/Event";
import { EventModel } from "..";
import { reservationSchema } from ".";
import { Schema } from "mongoose";
import { PeekData } from "@/types";

const mealPeriodInfoSchema = {
  name: String,
  experience: String,
  priceLegend: String,
  primaryCuisineType: String,
  _id: false,
};

const diningSchema = new Schema<Reservation<Dining>>({
  ...reservationSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/dining.png",
  },
  mealPeriodInfo: {
    type: mealPeriodInfoSchema,
  },
  priceRange: String,
  admissionRequired: Boolean,
  offers: {
    type: Map,
    of: [
      {
        offerId: String,
        time: String,
        label: String,
        _id: false,
      },
    ],
    default: {},
  },
});

diningSchema
  .virtual("displayData")
  .get(function (this: Reservation<Dining>) {
    return {
      "Restaurant Name": this.name,
      Address: [this.location.street, this.location.street].join(", "),
      "Meal Period": this.mealPeriodInfo.name,
      "Price Range": this.priceRange,
      "Admission Required": this.admissionRequired ? "Yes" : "No",
      Cuisine: this.mealPeriodInfo.primaryCuisineType,
    };
  });

diningSchema
  .virtual("upgradeOptions")
  .get(function (this: Reservation<Dining>) {});

diningSchema
  .virtual("peek")
  .get(function (this: Reservation<Dining>): PeekData {
    return [
      {
        label: "Dining",
        value: this.date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
        }),
      },
      {
        value: this.name,
      },
      {
        label: "Price Range",
        value: this.priceRange,
      },
      {
        label: "Party Size",
        value: this.partySize,
      },
      {
        label: "Cuisine",
        value: this.mealPeriodInfo.primaryCuisineType,
      },
    ];
  });

export const DiningModel =
  EventModel.discriminators?.Dining ||
  EventModel.discriminator<Reservation<Dining>>("Dining", diningSchema);
