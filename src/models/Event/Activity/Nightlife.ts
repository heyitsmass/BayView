import { Offer, PeekData } from "@/types";
import { Event, Nightlife } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const nightlifeSchema = new Schema<Event<Nightlife>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/nightlife.png"
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
  .get(function (this: Event<Nightlife>) {
    return {
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
  .get(function (this: Event<Nightlife>) {
    /** Bottle service */
    /** Ticket Upgrade */
    /** VIP Pass */
  });

nightlifeSchema
  .virtual("peek")
  .get(function (this: Event<Nightlife>): PeekData {
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

nightlifeSchema
  .virtual("offer")
  .get(function (this: Event<Nightlife>): Offer {
    return [
      faker.string.uuid(),
      (
        this.date || faker.date.soon({ refDate: new Date(Date.now()) })
      ).toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      this.venue,
      this.atmosphere,
      this.dressCode,
      null,
      this.coverCharge
    ];
  });

export const NightlifeModel =
  EventModel.discriminators?.Nightlife ||
  EventModel.discriminator<Event<Nightlife>>("Nightlife", nightlifeSchema);
