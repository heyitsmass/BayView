import { Activity, Zoo } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const zooSchema = new Schema<Activity<Zoo>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/zoo.jpg",
  },
  feedingSchedule: {
    type: [
      {
        name: String,
        time: String,
        _id: false,
      },
    ],
    default: [],
  },
  interactiveExperiences: {
    type: [
      {
        name: String,
        time: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  conservationPrograms: {
    type: [
      {
        name: String,
        description: String,
        _id: false,
      },
    ],
    default: [],
  },
  openingHours: String,
  animalExhibits: {
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
});

zooSchema.virtual("displayData").get(function (this: Activity<Zoo>) {
  const experience = this.interactiveExperiences[0];
  const schedule = this.feedingSchedule[0];
  const exhibit = this.animalExhibits[0];
  const currency = "$";

  return {
    "Zoo Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Opening Hours": this.openingHours,
    "Admission Fee": `${currency}${this.admissionFee}`,
    "Best Exhibit": exhibit.name,
    "Next Feeding": `${schedule.name} at ${schedule.time}`,
    "Next Experience": `${experience.name} at ${experience.time}`,
  };
});

zooSchema.virtual("upgradeOptions").get(function (this: Activity<Zoo>) {
  /** Under the Sea - Aquatic Exploration */
  /** The Dig site - Archaeology */
  /** Space and Time - Astronomy */
});
zooSchema.virtual("peek").get(function (this: Activity<Zoo>): PeekData {
  return [
    {
      label: "Zoo",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      }),
    },
    {
      value: this.name,
    },
    {
      label: "Open",
      value: this.openingHours,
    },
    {
      label: "Best Exhibit",
      value: this.animalExhibits[0].name,
    },
    {
      label: "Next Feeding",
      value: `${this.feedingSchedule[0].name} at ${this.feedingSchedule[0].time}`,
    },
  ];
});

export const ZooModel =
  EventModel.discriminators?.Zoo ||
  EventModel.discriminator<Activity<Zoo>>("Zoo", zooSchema);
