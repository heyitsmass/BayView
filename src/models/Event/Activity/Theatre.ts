import { PeekData } from "@/types";
import { Activity, Event, Theatre } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

export const theatreSchema = new Schema<Event<Theatre>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/theatre.png"
  },
  venue: String,
  play: String,
  playwright: String, // Name of the playwright of the current play
  showTimes: {
    type: [
      {
        date: Date,
        time: String,
        _id: false
      }
    ],
    default: []
  }, // Schedule of show times for the play
  ticketPrice: Number, // Cost of a ticket for the theatre
  theatreRating: Number, // Rating of the theatre
  seatType: String, // Type of seat (e.g. Orchestra, Balcony, etc.
  intervalDuration: String // Duration of the intermission between acts
});

theatreSchema
  .virtual("displayData")
  .get(function (this: Activity<Theatre>) {
    const showTime = this.showTimes[0];

    return {
      "Theatre Name": this.venue,
      Address: [this.location.street, this.location.city].join(", "),
      Play: this.play,
      Playwright: this.playwright,
      "Show Date": showTime.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      }),
      "Show Time": showTime.time,
      "Interval Duration": this.intervalDuration
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
    return [
      {
        label: "Theatre",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      { value: this.play },
      {
        label: "Playwright",
        value: this.playwright
      },
      {
        label: "Time",
        value: this.showTimes[0].time
      },
      {
        label: "Interval",
        value: this.intervalDuration
      }
    ];
  });

theatreSchema.virtual("offer").get(function (this: Activity<Theatre>) {
  const duration = faker.date.soon().getTime() - Date.now();
  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);

  return [
    faker.string.uuid(),
    this.showTimes[0].time,
    this.play,
    `${hours}h ${minutes}m`,
    `${this.intervalDuration} interval`,
    null,
    null,
    this.ticketPrice
  ];
});
export const TheatreModel =
  EventModel.discriminators?.Theatre ||
  EventModel.discriminator<Activity<Theatre>>("Theatre", theatreSchema);
