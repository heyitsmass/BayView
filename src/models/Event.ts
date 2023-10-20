import { Activity, Event, Flight, Hotel, Reservation } from "@/types/Event";
import mongoose, { Schema } from "mongoose";

export const eventSchema = new Schema<Event>(
  {
    eventType: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: false }
  },
  {
    _id: false
  }
);

export const hotelSchema = new Schema<Hotel>(
  {
    hotelName: { type: String, required: true },
    roomNumber: { type: String, required: true }
  },
  {
    _id: false
  }
);

export const reservationSchema = new Schema<Reservation>(
  {
    reservationName: { type: String, required: true },
    reservationType: { type: String, required: true },
    reservationNumber: { type: String, required: false },
    reservationData: { type: hotelSchema, required: true }
  },
  {
    _id: false
  }
);


export const flightSchema = new Schema<Flight>({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  gate: { type: String, required: true }
});

const Events =
  mongoose.models.Events || mongoose.model("Events", eventSchema);

const Flights = Events.discriminator<Flight>("Flight", flightSchema);

const Hotels = Events.discriminator<Hotel>("Hotel", hotelSchema);

const Reservations = Events.discriminator<Reservation>(
  "Reservation",
  reservationSchema
);

export default Events;
