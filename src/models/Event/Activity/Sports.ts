import { Offer, PeekData } from "@/types";
import { Activity, Event, Sports } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const sportsSchema = new Schema<Event<Sports>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/sports.png"
  },
  type: String,
  event: String,
  teams: [String],
  stadiumName: String,
  ticketPrice: Number,
  seatType: String,
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
    "Seat Type": this.seatType
  };
});

sportsSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Sports>) {
    /** Front Seats */
    /** VIP Box Seats */
    /** Courtside, etc... */
  });
sportsSchema
  .virtual("peek")
  .get(function (this: Activity<Sports>): PeekData {
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

sportsSchema.virtual("offer").get(function (this: Activity<Sports>): Offer {
  return [
    faker.string.uuid(),
    (
      this.date || faker.date.soon({ refDate: new Date(Date.now()) })
    ).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }),
    this.type,
    this.event,
    this.seatType,
    null,
    this.ticketPrice
  ];
});

export const SportsModel =
  EventModel.discriminators?.Sports ||
  EventModel.discriminator<Activity<Sports>>("Sports", sportsSchema);
