import { Hotel, Reservation } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { reservationSchema } from ".";
import { PeekData, PeekInfo } from "@/types";

const helper = {
  name: String,
  description: String,
  _id: false,
};
const hotelSchema = new Schema<Reservation<Hotel>>({
  ...reservationSchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/hotel.png",
  },
  cabinType: {
    type: helper,
  },
  checkIn: Date,
  checkOut: Date,
  roomNumber: String || Number,
});

hotelSchema.virtual("displayData").get(function (this: Reservation<Hotel>) {
  return {
    "Hotel Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    "Check In": this.checkIn.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    "Check Out": this.checkOut.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    "Room Number": this.roomNumber,
  };
});

hotelSchema
  .virtual("upgradeOptions")
  .get(function (this: Reservation<Hotel>) {});

hotelSchema
  .virtual("peek")
  .get(function (this: Reservation<Hotel>): PeekData {
    return [
      {
        label: "Hotel",
        value: this.checkIn.toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
        }),
      },
      {
        value: this.name,
      },
      {
        label: "Room Number",
        value: this.roomNumber,
      },
      {
        label: "Check In",
        value: this.checkIn.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      },
      {
        label: "Check Out",
        value: this.checkOut.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
      },
    ];
  });

export const HotelModel =
  EventModel.discriminators?.Hotel ||
  EventModel.discriminator<Reservation<Hotel>>("Hotel", hotelSchema);
