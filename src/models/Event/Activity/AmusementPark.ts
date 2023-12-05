import { Offer, PeekData } from "@/types";
import { AmusementPark, Event } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";
const amusementParkSchema = new Schema<Event<AmusementPark>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/amusementpark.png"
  },
  parkName: String,
  rides: [String],
  admissionFee: Number,
  openingHours: String,
  rollerCoaster: String,
  waterRide: String,
  heightRestriction: {
    type: Map,
    of: Number,
    default: {}
  }
});

amusementParkSchema
  .virtual("displayData")
  .get(function (this: Event<AmusementPark>) {
    const rollerCoaster = this.rollerCoaster;
    const waterRide = this.waterRide;

    return {
      "Park Name": this.name,
      Address: [this.location.street, this.location.street].join(", "),
      Rides: this.rides.join(", "),
      "Opening Hours": this.openingHours,
      "Best Roller Coaster": rollerCoaster,
      "Main Attraction": waterRide,
      "Admission Fee": this.admissionFee
    };
  });

amusementParkSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<AmusementPark>) {
    /** Dash Pass */
    /** VIP Pass */
    /** Season Pass */
  });

amusementParkSchema
  .virtual("peek")
  .get(function (this: Event<AmusementPark>): PeekData {
    return [
      {
        label: "Amusement Park",
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
        label: "Best Coaster",
        value: this.rollerCoaster
      },
      {
        label: "Best Ride",
        value: this.waterRide
      }
    ];
  });

amusementParkSchema
  .virtual("offer")
  .get(function (this: Event<AmusementPark>): Offer {
    return [
      faker.string.uuid(),
      this.openingHours,
      this.parkName,
      null,
      this.rollerCoaster,
      null,
      this.admissionFee
    ];
  });
export const AmusementParkModel =
  EventModel.discriminators?.AmusementPark ||
  EventModel.discriminator<Event<AmusementPark>>(
    "AmusementPark",
    amusementParkSchema
  );
