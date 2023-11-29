import { Activity, AmusementPark } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { PeekData } from "@/types";
import { activitySchema } from ".";
const amusementParkSchema = new Schema<Activity<AmusementPark>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/amusementpark.png",
  },
  rides: [String],
  admissionFee: Number,
  openingHours: String,
  rollerCoasters: [String],
  themedAreas: [String],
  waterRides: [String],
  heightRestrictions: {
    type: Map,
    of: Number,
    default: {},
  },
});

amusementParkSchema
  .virtual("displayData")
  .get(function (this: Activity<AmusementPark>) {
    const rollerCoaster = this.rollerCoasters[0];
    const themedArea = this.themedAreas[0];
    const waterRide = this.waterRides[0];

    return {
      "Park Name": this.name,
      Address: [this.location.street, this.location.street].join(", "),
      Rides: this.rides.join(", "),
      "Opening Hours": this.openingHours,
      "Best Roller Coaster": rollerCoaster,
      "Best Themed Area": themedArea,
      "Best Water Rides": waterRide,
    };
  });

amusementParkSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<AmusementPark>) {
    /** Dash Pass */
    /** VIP Pass */
    /** Season Pass */
  });

amusementParkSchema
  .virtual("peek")
  .get(function (this: Activity<AmusementPark>): PeekData {
    return [
      {
        label: "Amusement Park",
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
        label: "Best Coaster",
        value: this.rollerCoasters[0],
      },
      {
        label: "Best Ride",
        value: this.waterRides[0],
      },
    ];
  });

export const AmusementParkModel =
  EventModel.discriminators?.AmusementPark ||
  EventModel.discriminator<Activity<AmusementPark>>(
    "AmusementPark",
    amusementParkSchema
  );
