import { Offer, PeekData } from "@/types";
import { Activity, Event, Waterpark } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const waterSlide = {
  name: String,
  description: String,
  _id: false
};

const attraction = {
  ...waterSlide
};
const waterparkSchema = new Schema<Event<Waterpark>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/waterpark.png"
  },
  parkName: String,
  mainAttraction: attraction,
  attractions: [String],
  waterSlides: [String],
  mainWaterslide: waterSlide,
  openingHours: String,
  admissionFee: Number,
  wavePool: Boolean, // Indicates whether there's a wave pool
  lazyRiver: Boolean // Indicates whether there's a lazy river
});

waterparkSchema
  .virtual("displayData")
  .get(function (this: Activity<Waterpark>) {
    const attraction = this.attractions[0];
    const waterSlide = this.waterSlides[0];

    return {
      "Waterpark Name": this.parkName,
      Address: [this.location.street, this.location.street].join(", "),
      "Best Attraction": attraction,
      "Best Water Slide": waterSlide,
      "Opening Hours": this.openingHours,
      "Wave Pool": this.wavePool ? "Open" : "Closed",
      "Lazy River": this.lazyRiver ? "Open" : "Closed"
    };
  });

waterparkSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Waterpark>) {
    /** Day Pass */
    /** Weekend Pass */
    /** Season Pass */
  });

waterparkSchema
  .virtual("peek")
  .get(function (this: Activity<Waterpark>): PeekData {
    return [
      {
        label: "Waterpark",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      {
        value: this.parkName
      },
      {
        label: "Open",
        value: this.openingHours
      },
      {
        label: "Wave Pool",
        value: this.wavePool ? "Open" : "Closed"
      },
      {
        label: "Lazy River",
        value: this.lazyRiver ? "Open" : "Closed"
      }
    ];
  });

waterparkSchema
  .virtual("offer")
  .get(function (this: Activity<Waterpark>): Offer {
    return [
      faker.string.uuid(),
      this.openingHours,
      this.parkName,
      this.attractions[0],
      null,
      null,
      this.admissionFee
    ];
  });

export const WaterparkModel =
  EventModel.discriminators?.Waterpark ||
  EventModel.discriminator<Activity<Waterpark>>(
    "Waterpark",
    waterparkSchema
  );
