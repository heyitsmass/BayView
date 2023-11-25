import { Activity, Sports } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const sportsSchema = new Schema<Activity<Sports>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/sports.png",
  },
  type: String,
  event: String,
  teams: [String],
  stadiumName: String,
  stadiumCapacity: Number,
  broadcastingChannels: [String]
});

sportsSchema.virtual("displayData").get(function (this: Activity<Sports>) {
  return {
    "Sports Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Type: this.type,
    Event: this.event,
    Teams: this.teams.join(", "),
    "Stadium Name": this.stadiumName,
    "Stadium Capacity": this.stadiumCapacity
  };
});

sportsSchema.virtual("upgradeOptions").get(function (this: Activity<Sports>) {
  /** Front Seats */
  /** VIP Box Seats */
  /** Courtside, etc... */
});
sportsSchema.virtual("peek").get(function (this: Activity<Sports>): PeekData {
  return [
    {
      label: this.type,
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.event
    },
    {
      label: "Teams",
      value: this.teams.join(", ")
    },
    {
      label: "Stadium",
      value: this.stadiumName
    },
    {
      label: "Time",
      value: this.date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })
    }
  ];
});

export const SportsModel =
  EventModel.discriminators?.Sports ||
  EventModel.discriminator<Activity<Sports>>("Sports", sportsSchema);
