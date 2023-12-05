import { Offer, PeekData } from "@/types";
import { Event, Hotel } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";
import { duration } from "@/components/HomePage/EventFinder/utils";

const hotelSchema = new Schema<Event<Hotel>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/hotel.png"
  },
  cabinType: String,
  price: Number,
  roomCount: Number,
  checkIn: Date,
  checkOut: Date,
  roomNumber: String || Number
});

hotelSchema.virtual("displayData").get(function (this: Event<Hotel>) {
  return {
    "Hotel Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Check In": this.checkIn.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }),
    "Check Out": this.checkOut.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }),
    "Room Number": this.roomNumber,
    "Cabin Type": this.cabinType
  };
});

hotelSchema.virtual("upgradeOptions").get(function (this: Event<Hotel>) {});

hotelSchema.virtual("peek").get(function (this: Event<Hotel>): PeekData {
  return [
    {
      label: "Hotel",
      value: this.checkIn.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric"
      })
    },
    {
      value: this.name
    },
    {
      label: "Room Number",
      value: this.roomNumber
    },
    {
      label: "Check In",
      value: this.checkIn.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })
    },
    {
      label: "Check Out",
      value: this.checkOut.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
      })
    }
  ];
});

hotelSchema.virtual("offer").get(function (this: Event<Hotel>): Offer {
  const price = faker.finance.amount(100, 1000, 2);

  return [
    faker.string.uuid(),
    this.checkIn.toLocaleDateString("en-US", {
      dateStyle: "short"
    }) +
      " - " +
      this.checkOut.toLocaleDateString("en-US", {
        dateStyle: "short"
      }),
    this.name,
    duration(),
    this.party.length,
    this.cabinType,
    price
  ];
});

export const HotelModel =
  EventModel.discriminators?.Hotel ||
  EventModel.discriminator<Event<Hotel>>("Hotel", hotelSchema);
