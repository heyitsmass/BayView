import { PeekData, PeekInfo, Upgrade, Upgrades } from "@/types";
import { Flight, Reservation } from "@/types/Event";
import { Schema } from "mongoose";
import { reservationSchema } from ".";
import { EventModel } from "..";
const helperSchema = {
  name: String,
  description: String,
  _id: false
};

const flightSchema = new Schema<Reservation<Flight>>({
  ...reservationSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/flight.jpg",
  },
  airport: {
    type: helperSchema,
    default: {}
  },
  airline: {
    type: helperSchema,
    default: {}
  },
  departureTime: Date,
  arrivalTime: Date,
  flightNumber: String,
  reservationNumber: String,
  currentUpgrade: String,
  currentPrice: Number,
  seats: {
    type: [
      {
        row: Number,
        seat: String,
        _id: false
      }
    ],
    default: []
  },
  gate: String
});

flightSchema.virtual("displayData").get(function (this: Reservation<Flight>) {
  return {
    Airline: this.airline.name,
    Seats: this.seats.map((seat) => `${seat.row}${seat.seat}`).join(", "),
    "Flight Number": this.flightNumber,
    Gate: this.gate,
    "Reservation Number": this.reservationNumber,
    "Departure Time": this.departureTime.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }),
    "Arrival Time": this.arrivalTime.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  };
});

flightSchema
  .virtual("upgradeOptions")
  .get(function (this: Reservation<Flight>): Upgrades {
    const { currentPrice, currentUpgrade } = this;

    const upgrades = [
      {
        name: "Economy",
        description: "The standard option",
        priceRange: "$",
        pricePerUpgrade: 100,
        picture_url: '/assets/upgrades/flight/seat_change.png'
      },
      {
        name: "Premium Economy",
        description: "A little extra leg room",
        priceRange: "$$",
        pricePerUpgrade: 200,
        picture_url: '/assets/upgrades/flight/economy.png'
      },
      {
        name: "Business Class",
        description: "Luxury at its finest",
        priceRange: "$$$",
        pricePerUpgrade: 300,
        picture_url: '/assets/upgrades/flight/business.png'
      },
      {
        name: "First Class",
        description: "The best of the best",
        priceRange: "$$$",
        pricePerUpgrade: 400,
        picture_url: '/assets/upgrades/flight/first_class.png'
      }
    ];

    return {
      title: "Upgrade Options",
      partySize: this.seats.length,
      subtitle: "(lowest price available.)",
      altText: "Request",
      currentUpgrade,
      currentPrice,
      currency: "$",
      upgrades: upgrades.filter(
        (upgrade) => upgrade.name !== currentUpgrade
      ) as Upgrade[]
    };
  });

flightSchema
  .virtual("peek")
  .get(function (this: Reservation<Flight>): PeekData {
    return [
      {
        label: "Flight",
        value: this.departureTime.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit"
        })
      },
      {
        value: this.airline.name
      },
      {
        label: "Confirmation",
        value: "#" + this.flightNumber
      },
      {
        label: "Seat(s)",
        value: this.seats.map((seat) => `${seat.row}${seat.seat}`).join(", ")
      },
      {
        label: "Departure Time",
        value: this.departureTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      }
    ];
  });

export const FlightModel =
  EventModel.discriminators?.Flight ||
  EventModel.discriminator<Reservation<Flight>>("Flight", flightSchema);
