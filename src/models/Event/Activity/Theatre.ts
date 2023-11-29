import { Activity, Theatre } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";
import { randomInt } from "crypto";

export const theatreSchema = new Schema<Activity<Theatre>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/theatre.png",
  },

  play: String,
  playwright: String, // Name of the playwright of the current play
  showTimes: {
    type: [
      {
        date: Date,
        time: String,
        _id: false,
      },
    ],
    default: [],
  }, // Schedule of show times for the play
  ticketPrice: Number, // Cost of a ticket for the theatre
  theatreRating: Number, // Rating of the theatre
  seatingCapacity: Number, // Maximum seating capacity of the theatre
  isSoldOut: Boolean, // Indicates whether the current play is sold out
  intervalDuration: String, // Duration of the intermission between acts
});

theatreSchema
  .virtual("displayData")
  .get(function (this: Activity<Theatre>) {
    const showTime = this.showTimes[0];

    return {
      "Theatre Name": this.name,
      Address: [this.location.street, this.location.city].join(", "),
      Play: this.play,
      Playwright: this.playwright,
      "Show Date": showTime.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      }),
      "Show Time": showTime.time,
      "Interval Duration": this.intervalDuration,
    };
  });

theatreSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Theatre>) {
    /** Font Row */
    /** VIP Boxes */
    /** Seat change */
  });

theatreSchema
  .virtual("peek")
  .get(function (this: Activity<Theatre>): PeekData {
    const soldOut = ["Almost", "Yes"];

    return [
      {
        label: "Theatre",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
      },
      { value: this.play },
      {
        label: "Playwright",
        value: this.playwright,
      },
      {
        label: "Time",
        value: this.showTimes[0].time,
      },
      {
        label: "Sold Out",
        value: this.isSoldOut ? soldOut[randomInt(soldOut.length)] : "No",
      },
    ];
  });

export const TheatreModel =
  EventModel.discriminators?.Theatre ||
  EventModel.discriminator<Activity<Theatre>>("Theatre", theatreSchema);
