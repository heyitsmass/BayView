import { Offer, PeekData } from "@/types";
import { Aquarium, Event } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const exhibit = {
  name: String,
  description: String,
  _id: false
};

const show = {
  date: Date,
  time: String,
  _id: false
};

const interactiveExperience = {
  ...exhibit,
  ...show
};

export const aquariumSchema = new Schema<Event<Aquarium>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/aquarium.png"
  },
  aquarium: String,
  exhibit: exhibit,
  admissionFee: Number,
  openingHours: String,
  underwaterTunnel: Boolean, // Indicates whether there's an underwater tunnel for visitors
  touchPools: Boolean, // Indicates whether there are touch pools for interactive experiences
  showSchedule: show,
  interactiveExperience: interactiveExperience
});

aquariumSchema.virtual("displayData").get(function (this: Event<Aquarium>) {
  const exhibit = this.exhibit;
  const show = this.showSchedule;

  return {
    "Aquarium Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Exhibit Name": exhibit.name,
    "Opening Hours": this.openingHours,
    "Underwater Tunnel": this.underwaterTunnel ? "Yes" : "No",
    "Touch Pools": this.touchPools ? "Yes" : "No",
    "Show Date": show.date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    })
  };
});

aquariumSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<Aquarium>) {});
aquariumSchema
  .virtual("peek")
  .get(function (this: Event<Aquarium>): PeekData {
    return [
      {
        label: "Aquarium",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      {
        value: this.aquarium
      },
      {
        label: "Open",
        value: this.openingHours
      },
      {
        label: "Exhibit",
        value: this.exhibit.name
      },
      {
        label: "Show",
        value: this.showSchedule.time
      }
    ];
  });

aquariumSchema
  .virtual("offer")
  .get(function (this: Event<Aquarium>): Offer {
    return [
      faker.string.uuid(),
      (
        this.date || faker.date.soon({ refDate: new Date(Date.now()) })
      ).toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      this.aquarium,
      this.exhibit.name,
      null,
      null,
      this.admissionFee
    ];
  });
export const AquariumModel =
  EventModel.discriminators?.Aquarium ||
  EventModel.discriminator<Event<Aquarium>>("Aquarium", aquariumSchema);
