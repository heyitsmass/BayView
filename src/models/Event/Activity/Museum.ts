import { Activity, Museum } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { activitySchema } from ".";
import { PeekData } from "@/types";
const museumSchema = new Schema<Activity<Museum>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/museum.png",
  },
  exhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  admissionFee: Number,
  openingHours: String,
  specialEvents: {
    type: [
      {
        name: String,
        description: String,
        date: Date,
        time: String,
        _id: false,
      },
    ],
    default: [],
  }, // List of special events or exhibitions
  guidedTours: Boolean, // Indicates whether guided tours are available
  audioGuide: Boolean, // Indicates whether audio guides are available
});

museumSchema.virtual("displayData").get(function (this: Activity<Museum>) {
  const exhibit = this.exhibits[0];
  const event = this.specialEvents[0];

  return {
    "Museum Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Exhibit Name": exhibit.name,
    "Opening Hours": this.openingHours,
    "Special Event Name": event.name,
    "Guided Tours": this.guidedTours ? "Available" : "Unavailable",
    "Audio Guide": this.audioGuide ? "Available" : "Unavailable",
  };
});

museumSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Museum>) {
    /** Guided Tour */
    /** Audio Guide */
    /* Special Event Access */
  });
museumSchema
  .virtual("peek")
  .get(function (this: Activity<Museum>): PeekData {
    return [
      {
        label: "Museum",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
      },
      {
        value: this.name,
      },
      {
        label: "Exhibit",
        value: this.exhibits[0].name,
      },
      {
        label: "Special Event",
        value: this.specialEvents[0].name,
      },
      {
        label: "Open",
        value: this.openingHours,
      },
    ];
  });


export const MuseumModel =
  EventModel.discriminators?.Museum ||
  EventModel.discriminator<Activity<Museum>>("Museum", museumSchema);
