import { Offer, PeekData } from "@/types";
import { Event, Museum } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const exhibit = {
  name: String,
  description: String,
  date: Date,
  _id: false
};

const specialEvent = {
  name: String,
  description: String,
  date: Date,
  _id: false
};

const museumSchema = new Schema<Event<Museum>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/museum.png"
  },
  museum: String,
  exhibit: exhibit,
  admissionFee: Number,
  openingHours: String,
  specialEvent: specialEvent, // List of special events or exhibitions
  guidedTours: Boolean, // Indicates whether guided tours are available
  audioGuide: Boolean // Indicates whether audio guides are available
});

museumSchema.virtual("displayData").get(function (this: Event<Museum>) {
  const exhibit = this.exhibit;
  const event = this.specialEvent;

  return {
    "Museum Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Exhibit Name": exhibit.name,
    "Opening Hours": this.openingHours,
    "Special Event Name": event.name,
    "Guided Tours": this.guidedTours ? "Available" : "Unavailable",
    "Audio Guide": this.audioGuide ? "Available" : "Unavailable"
  };
});

museumSchema.virtual("upgradeOptions").get(function (this: Event<Museum>) {
  /** Guided Tour */
  /** Audio Guide */
  /* Special Event Access */
});
museumSchema.virtual("peek").get(function (this: Event<Museum>): PeekData {
  return [
    {
      label: "Museum",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.museum
    },
    {
      label: "Exhibit",
      value: this.exhibit.name
    },
    {
      label: "Special Event",
      value: this.specialEvent.name
    },
    {
      label: "Open",
      value: this.openingHours
    }
  ];
});

museumSchema.virtual("offer").get(function (this: Event<Museum>): Offer {
  return [
    faker.string.uuid(),
    this.museum,
    this.exhibit.name,
    this.openingHours,
    null,
    null,
    this.admissionFee
  ];
});

export const MuseumModel =
  EventModel.discriminators?.Museum ||
  EventModel.discriminator<Event<Museum>>("Museum", museumSchema);
