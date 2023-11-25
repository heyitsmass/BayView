import { Activity, Concert } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const concertSchema = new Schema<Activity<Concert>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/concert.png",
  },

  artist: String, // Name of the performing artist or band
  venue: String, // Name of the concert venue
  venueRating: Number, // Rating of the concert venue
  date: Date, // Date and time of the concert
  ticketPrice: Number, // Cost of a ticket for the concert
  attendees: Number, // Number of people attending the concert
  setList: [String], // List of songs or pieces that will be performed
  isSoldOut: Boolean, // Indicates whether the concert is sold out
  departureLocation: String, // Location where the trip to the concert starts
  transportationMode: String // Mode of transportation (e.g., car, public transit)
});

concertSchema.virtual("displayData").get(function (this: Activity<Concert>) {
  const setList = this.setList[0];

  return {
    "Concert Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Artist: this.artist,
    Venue: this.venue,
    Date: this.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }),
    "First Set": setList,
    "Sold Out": this.isSoldOut ? "Yes" : "No"
  };
});

concertSchema.virtual("upgradeOptions").get(function (this: Activity<Concert>) {
  /** Front Row */
  /** Standing */
  /** VIP */
});

concertSchema.virtual("peek").get(function (this: Activity<Concert>): PeekData {
  return [
    {
      label: "Concert",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.artist
    },
    {
      label: "Venue",
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
      label: "Next Set",
      value: this.setList[0]
    }
  ];
});
export const ConcertModel =
  EventModel.discriminators?.Concert ||
  EventModel.discriminator<Activity<Concert>>("Concert", concertSchema);
