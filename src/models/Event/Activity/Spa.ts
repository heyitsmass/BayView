import { Offer, PeekData } from "@/types";
import { Event, Spa } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const wellnessClass = {
  name: String,
  price: Number,
  _id: false
};

const service = {
  name: String,
  price: Number,
  _id: false
};

const spaPackage = {
  name: String,
  price: Number,
  _id: false
};

const spaSchema = new Schema<Event<Spa>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/spa.png"
  },
  spaName: String,
  date: Date,
  spaRating: Number,
  service: service,
  openingHours: String,
  spaPackage: spaPackage,
  wellnessClass: wellnessClass,
  bookingPolicy: String
});

spaSchema.virtual("displayData").get(function (this: Event<Spa>) {
  const service = this.service;
  const spaPackage = this.spaPackage;
  const wellnessClass = this.wellnessClass;

  return {
    "Spa Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Spa Rating": `${this.spaRating} ⭐️`,
    "Service Name": service.name,
    "Spa Package Name": spaPackage.name,
    "Wellness Class Name": wellnessClass.name,
    "Opening Hours": this.openingHours
  };
});

spaSchema.virtual("upgradeOptions").get(function (this: Event<Spa>) {
  /** Change package */
  /** Add service */
  /** Find Wellness classes */
});

spaSchema.virtual("peek").get(function (this: Event<Spa>): PeekData {
  return [
    {
      label: "Spa",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.spaName
    },
    {
      label: "Spa Rating",
      value: `${this.spaRating} ⭐️`
    },
    {
      label: "Service",
      value: this.service.name
    },
    {
      label: "Package",
      value: this.spaPackage.name
    }
  ];
});

spaSchema.virtual("offer").get(function (this: Event<Spa>): Offer {
  return [
    faker.string.uuid(),
    (
      this.date || faker.date.soon({ refDate: new Date(Date.now()) })
    ).toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric"
    }),
    this.spaName,
    this.spaPackage.name,
    null,
    null,
    this.spaPackage.price
  ];
});

export const SpaModel =
  EventModel.discriminators?.Spa ||
  EventModel.discriminator<Event<Spa>>("Spa", spaSchema);
