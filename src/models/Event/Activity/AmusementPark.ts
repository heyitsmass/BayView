import { Activity, AmusementPark } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";

const amusementParkSchema = new Schema<Activity<AmusementPark>>({
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

export const AmusementParkModel =
  EventModel.discriminators?.AmusementPark ||
  EventModel.discriminator<Activity<AmusementPark>>(
    "AmusementPark",
    amusementParkSchema
  );
