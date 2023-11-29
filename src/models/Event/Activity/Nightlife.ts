import { Activity, Nightlife } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const nightlifeSchema = new Schema<Activity<Nightlife>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/nightlife.png",
  },
  venue: String,
  type: String,
  openingHours: String,
  dressCode: String,
  ageRestriction: Number,
  coverCharge: Number,
  livePerformances: Boolean,
  music: [String],
  drinks: [String],
  food: [String],
  atmosphere: String
});

nightlifeSchema
  .virtual("displayData")
  .get(function (this: Activity<Nightlife>) {
    return {
      "Nightlife Name": this.name,
      Address: [this.location.street, this.location.street].join(", "),
      Venue: this.venue,
      Type: this.type,
      "Opening Hours": this.openingHours,
      "Dress Code": this.dressCode,
      Atmosphere: this.atmosphere
    };
  });

nightlifeSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Nightlife>) {
    /** Bottle service */
    /** Ticket Upgrade */
    /** VIP Pass */
  });

nightlifeSchema
  .virtual("peek")
  .get(function (this: Activity<Nightlife>): PeekData {
    return [
      {
        label: this.type,
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      {
        value: this.venue
      },
      {
        label: "Time",
        value: this.date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric"
        })
      },
      {
        label: "Dress Code",
        value: this.dressCode
      },
      {
        label: "Atmosphere",
        value: this.atmosphere
      }
    ];
  });


export const NightlifeModel =
  EventModel.discriminators?.Nightlife ||
  EventModel.discriminator<Activity<Nightlife>>("Nightlife", nightlifeSchema);
