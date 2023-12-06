import { Offer, PeekData } from "@/types";
import { Event, Zoo } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const feedingSchedule = {
  name: String,
  time: String,
  _id: false
};

const interactiveExperience = {
  ...feedingSchedule,
  description: String
};
const exhibit = {
  //idk
  name: String,
  description: String,
  _id: false
};

const zooSchema = new Schema<Event<Zoo>>({
  ...(eventSchema.obj as Object),
  zoo: String,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/zoo.png"
  },
  feedingSchedule: feedingSchedule,
  interactiveExperience: interactiveExperience,
  openingHours: String,
  exhibit: exhibit,
  admissionFee: Number
});

zooSchema.virtual("displayData").get(function (this: Event<Zoo>) {
  const experience = this.interactiveExperience;
  const schedule = this.feedingSchedule;
  const exhibit = this.exhibit;
  const currency = "$";

  return {
    "Zoo Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Opening Hours": this.openingHours,
    "Admission Fee": `${currency}${this.admissionFee}`,
    "Best Exhibit": exhibit.name,
    "Next Feeding": `${schedule.name} at ${schedule.time}`,
    "Next Experience": `${experience.name} at ${experience.time}`
  };
});

zooSchema.virtual("upgradeOptions").get(function (this: Event<Zoo>) {
  /** Under the Sea - Aquatic Exploration */
  /** The Dig site - Archaeology */
  /** Space and Time - Astronomy */
});
zooSchema.virtual("peek").get(function (this: Event<Zoo>): PeekData {
  return [
    {
      label: "Zoo",
      value: this.date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    },
    {
      value: this.name
    },
    {
      label: "Open",
      value: this.openingHours
    },
    {
      label: "Best Exhibit",
      value: this.exhibit.name
    },
    {
      label: "Next Feeding",
      value: `${this.feedingSchedule.name} at ${this.feedingSchedule.time}`
    }
  ];
});

zooSchema.virtual("offer").get(function (this: Event<Zoo>): Offer {
  const duration = faker.date.soon().getTime() - Date.now();

  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);

  return [
    faker.string.uuid(),
    this.interactiveExperience.time,
    this.zoo,
    this.exhibit.name,
    `${hours}h ${minutes}m`,
    null,
    this.admissionFee
  ];
});

export const ZooModel =
  EventModel.discriminators?.Zoo ||
  EventModel.discriminator<Event<Zoo>>("Zoo", zooSchema);
