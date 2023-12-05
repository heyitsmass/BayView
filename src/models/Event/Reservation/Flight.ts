import { PeekData, Upgrades } from "@/types";
import { Event, Flight } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const flightSchema = new Schema<Event<Flight>>(
  {
    ...(eventSchema.obj as Object),
    picture_url: {
      type: String,
      immutable: true,
      default: "/assets/events/flight.png"
    },
    departingFlight: Object,
    returnFlight: Object
  },
);

flightSchema.virtual("displayData").get(function (this: Event<Flight>) {
  const airline = this.departingFlight.offer.owner.name;
  const parent = this.departingFlight.offer.slices[0].segments[0];

  const flightNumber = parent.id;
  const terminal =
    this.departingFlight.offer.slices[0].segments[0]
      .destination_terminal;

  return {
    Airline: airline,
    "Flight Number": flightNumber,
    Terminal: terminal,
    "Reservation Number": parent.id,
    "Departure Time": new Date(parent.departing_at).toLocaleTimeString(
      undefined,
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }
    ),
    "Arrival Time": new Date(parent.arriving_at).toLocaleTimeString(
      undefined,
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }
    )
  };
});

flightSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<Flight>): Upgrades {
    return {} as Upgrades;
  });

flightSchema
  .virtual("peek")
  .get(function (this: Event<Flight>): PeekData {
    const parent = this.departingFlight.offer.slices[0].segments[0];
    const flightNumber = parent.marketing_carrier_flight_number;
    const airline = this.departingFlight.offer.owner.name;

    return [
      {
        label: "Flight",
        value: new Date(parent.departing_at).toLocaleDateString(
          undefined,
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          }
        )
      },
      {
        value: airline
      },
      {
        label: "Confirmation",
        value: "#" + parent.id
      },
      {
        label: "Terminal",
        value: parent.origin_terminal
      },
      {
        label: "Departure Time",
        value: new Date(parent.departing_at).toLocaleTimeString(
          undefined,
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          }
        )
      }
    ];
  });

export const FlightModel =
  EventModel.discriminators?.Flight ||
  EventModel.discriminator<Event<Flight>>("Flight", flightSchema);
