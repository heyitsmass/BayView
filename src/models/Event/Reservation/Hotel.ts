import { Hotel, Reservation } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { reservationSchema } from ".";

const hotelSchema = new Schema<Reservation<Hotel>>({
  ...reservationSchema.obj,
  checkIn: Date,
  checkOut: Date,
  roomNumber: String || Number,
});

export const HotelModel =
  EventModel.discriminators?.Hotel ||
  EventModel.discriminator<Reservation<Hotel>>("Hotel", hotelSchema);
