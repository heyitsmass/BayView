import { Offer, PeekData } from "@/types";
import { Concert, Event } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const concertSchema = new Schema<Event<Concert>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/concert.png"
  },

  artist: String, // Name of the performing artist or band
  concert: String, // Name of the concert
  venue: String, // Name of the concert venue
  venueRating: Number, // Rating of the concert venue
  date: Date, // Date and time of the concert
  ticketPrice: Number, // Cost of a ticket for the concert
  attendees: Number, // Number of people attending the concert
  setList: [String], // List of songs or pieces that will be performed
  seatType: String // Type of seat (e.g. front row, standing, VIP)
});

concertSchema.virtual("displayData").get(function (this: Event<Concert>) {
  return {
    "Concert Name": this.concert,
    Address: [this.location.street, this.location.street].join(", "),
    Artist: this.artist,
    Venue: this.venue,
    Date: this.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }),
    "First Set": this.setList[0],
    "Seat Type": this.seatType
  };
});

concertSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<Concert>) {
    /** Front Row */
    /** Standing */
    /** VIP */
  });

concertSchema
  .virtual("peek")
  .get(function (this: Event<Concert>): PeekData {
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
        value: this.setList.at(-1)
      }
    ];
  });

concertSchema.virtual("offer").get(function (this: Event<Concert>): Offer {
  return [
    faker.string.uuid(),
    (
      this.date || faker.date.soon({ refDate: new Date(Date.now()) })
    ).toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }),
    this.concert,
    this.artist,
    this.seatType,
    null,
    this.ticketPrice
  ];
});
export const ConcertModel =
  EventModel.discriminators?.Concert ||
  EventModel.discriminator<Event<Concert>>("Concert", concertSchema);
