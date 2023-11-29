import { Activity, Spa } from "@/types/Event";
import { Schema } from "mongoose";
import { activitySchema } from ".";
import { EventModel } from "..";
import { spa } from "@/lib/random/activity";
import { PeekData } from "@/types";
const spaSchema = new Schema<Activity<Spa>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/spa.png",
  },
  spaRating: Number,
  services: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  openingHours: String,
  spaPackages: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  wellnessClasses: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  bookingPolicy: String
});

spaSchema.virtual("displayData").get(function (this: Activity<Spa>) {
  const service = this.services[0];
  const spaPackage = this.spaPackages[0];
  const wellnessClass = this.wellnessClasses[0];

  return {
    "Spa Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Spa Rating": `${this.spaRating} ⭐️`,
    "Service Name": service.name,
    "Spa Package Name": spaPackage.name,
    "Wellness Class Name": wellnessClass.name,
    "Opening Hours": this.openingHours,
  };
});

spaSchema.virtual("upgradeOptions").get(function (this: Activity<Spa>) {
  /** Change package */
  /** Add service */
  /** Find Wellness classes */
});

spaSchema.virtual("peek").get(function (this: Activity<Spa>): PeekData {
  return [
    {
      label: "Spa",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.name
    },
    {
      label: "Spa Rating",
      value: `${this.spaRating} ⭐️`
    },
    {
      label: "Service",
      value: this.services[0].name
    },
    {
      label: "Package",
      value: this.spaPackages[0].name
    }
  ];
});


export const SpaModel =
  EventModel.discriminators?.Spa ||
  EventModel.discriminator<Activity<Spa>>("Spa", spaSchema);
