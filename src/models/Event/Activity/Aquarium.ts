import { Activity, Aquarium } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

export const aquariumSchema = new Schema<Activity<Aquarium>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/aquarium.png",
  },

  exhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  admissionFee: Number,
  openingHours: String,
  underwaterTunnel: Boolean, // Indicates whether there's an underwater tunnel for visitors
  touchPools: Boolean, // Indicates whether there are touch pools for interactive experiences
  showSchedule: {
    type: [
      {
        date: Date,
        time: String,
        _id: false
      }
    ],
    default: []
  } // Schedule for shows and presentations
});

aquariumSchema.virtual("displayData").get(function (this: Activity<Aquarium>) {
  const exhibit = this.exhibits[0];
  const show = this.showSchedule[0];

  return {
    "Aquarium Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Exhibit Name": exhibit.name,
    "Opening Hours": this.openingHours,
    "Underwater Tunnel": this.underwaterTunnel ? "Yes" : "No",
    "Touch Pools": this.touchPools ? "Yes" : "No",
    "Show Date": show.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }),
  };
});

aquariumSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Aquarium>) {});
aquariumSchema
  .virtual("peek")
  .get(function (this: Activity<Aquarium>): PeekData {
    return [
      {
        label: "Aquarium",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      {
        value: this.name
      },
      {
        label: "Open",
        value: this.openingHours
      },
      {
        label: "Exhibit",
        value: this.exhibits[0].name
      },
      {
        label: "Show",
        value: this.showSchedule[0].time
      }
    ];
  });


export const AquariumModel =
  EventModel.discriminators?.Aquarium ||
  EventModel.discriminator<Activity<Aquarium>>("Aquarium", aquariumSchema);
