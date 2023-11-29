import { Activity, Waterpark } from "@/types/Event";
import { activitySchema } from ".";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { PeekData } from "@/types";

const waterparkSchema = new Schema<Activity<Waterpark>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/waterpark.png",
  },
  attractions: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  waterSlides: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
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
      "Waterpark Name": this.name,
      Address: [this.location.street, this.location.street].join(", "),
      "Best Attraction": attraction.name,
      "Best Water Slide": waterSlide.name,
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
        value: this.name
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

export const WaterparkModel =
  EventModel.discriminators?.Waterpark ||
  EventModel.discriminator<Activity<Waterpark>>("Waterpark", waterparkSchema);
