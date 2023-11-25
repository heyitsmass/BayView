import { Activity, Park } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const parkSchema = new Schema<Activity<Park>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/park.png",
  },
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
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // Features like lakes, trails, etc.
  wildlife: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
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
    "Park Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Activity Name": activity.name,
    "Opening Hours": this.openingHours,
    "Closest Facility": facility.name,
    "Hot Feature": feature.name,
    "Popular Wildlife": animal.name
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
      value: this.name
    },
    {
      label: "Activity",
      value: this.activities[0].name
    },
    {
      label: "Open",
      value: this.openingHours
    },
    {
      label: "Wildlife",
      value: this.wildlife[0].name
    }
  ];
});


export const ParkModel =
  EventModel.discriminators?.Park ||
  EventModel.discriminator<Activity<Park>>("Park", parkSchema);
