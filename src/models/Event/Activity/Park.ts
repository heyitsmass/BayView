import { Offer, PeekData } from "@/types";
import { Activity, Event, Park } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const parkSchema = new Schema<Event<Park>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/park.png"
  },
  parkName: String,
  activities: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // List of activities available in the park (e.g., hiking, biking, swimming)
  openingHours: String,
  facilities: {
    type: [String],
    default: []
  }, // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: {
    type: [String],
    default: []
  }, // Features like lakes, trails, etc.
  wildlife: {
    type: [String],
    default: []
  } // Types of wildlife commonly found in the park
  // ... (other park-specific properties)
});

parkSchema.virtual("displayData").get(function (this: Activity<Park>) {
  const activity = this.activities[0];
  const facility = this.facilities[0];
  const feature = this.naturalFeatures[0];
  const animal = this.wildlife[0];

  return {
    "Park Name": this.parkName,
    Address: [this.location.street, this.location.street].join(", "),
    "Activity Name": activity,
    "Opening Hours": this.openingHours,
    "Closest Facility": facility,
    "Hot Feature": feature,
    "Popular Wildlife": animal
  };
});

parkSchema.virtual("upgradeOptions").get(function (this: Activity<Park>) {
  /** Reserve Private Tour */
  /** Find wildlife guides */
  /** Find Camping locations */
});

parkSchema.virtual("peek").get(function (this: Activity<Park>): PeekData {
  return [
    {
      label: "Park",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.parkName
    },
    {
      label: "Activity",
      value: this.activities[0]
    },
    {
      label: "Open",
      value: this.openingHours
    },
    {
      label: "Wildlife",
      value: this.wildlife[0]
    }
  ];
});

parkSchema.virtual("offer").get(function (this: Activity<Park>): Offer {
  return [
    faker.string.uuid(),
    (
      this.date || faker.date.soon({ refDate: new Date(Date.now()) })
    ).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric"
    }),
    this.parkName,
    null,
    this.openingHours,
    null,
    null
  ];
});

export const ParkModel =
  EventModel.discriminators?.Park ||
  EventModel.discriminator<Activity<Park>>("Park", parkSchema);
