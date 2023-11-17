import { Flight, Reservation } from "@/types/Event";
import { EventModel } from "..";
import { Schema } from "mongoose";
import { reservationSchema } from ".";
const helperSchema = {
  name: String,
  description: String,
  _id: false,
};

const flightSchema = new Schema<Reservation<Flight>>({
  ...reservationSchema.obj,
  airport: {
    type: helperSchema,
    default: {},
  },
  airline: {
    type: helperSchema,
    default: {},
  },
  departureTime: Date,
  arrivalTime: Date,
  flightNumber: String,
  reservationNumber: String,
  seats: {
    type: [
      {
        row: Number,
        seat: String,
        _id: false,
      },
    ],
    default: [],
  },
  gate: String,
});

export const FlightModel =
  EventModel.discriminators?.Flight ||
  EventModel.discriminator<Reservation<Flight>>("Flight", flightSchema);
