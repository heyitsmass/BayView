import { Activity, Theatre } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

export const theatreSchema = new Schema<Activity<Theatre>>({
  ...activitySchema.obj,
  play: String,
  playwright: String, // Name of the playwright of the current play
  showTimes: {
    type: [
      {
        date: Date,
        time: String,
        _id: false,
      },
    ],
    default: [],
  }, // Schedule of show times for the play
  ticketPrice: Number, // Cost of a ticket for the theatre
  theatreRating: Number, // Rating of the theatre
  seatingCapacity: Number, // Maximum seating capacity of the theatre
  isSoldOut: Boolean, // Indicates whether the current play is sold out
  intervalDuration: String, // Duration of the intermission between acts
});

export const TheatreModel =
  EventModel.discriminators?.Theatre ||
  EventModel.discriminator<Activity<Theatre>>("Theatre", theatreSchema);
