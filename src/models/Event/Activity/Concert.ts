import { Activity, Concert } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
const concertSchema = new Schema<Activity<Concert>>({
  ...activitySchema.obj,
  artist: String, // Name of the performing artist or band
  venue: String, // Name of the concert venue
  venueRating: Number, // Rating of the concert venue
  date: Date, // Date and time of the concert
  ticketPrice: Number, // Cost of a ticket for the concert
  attendees: Number, // Number of people attending the concert
  setList: [String], // List of songs or pieces that will be performed
  isSoldOut: Boolean, // Indicates whether the concert is sold out
  departureLocation: String, // Location where the trip to the concert starts
  transportationMode: String, // Mode of transportation (e.g., car, public transit)
});

export const ConcertModel =
  EventModel.discriminators?.Concert ||
  EventModel.discriminator<Activity<Concert>>("Concert", concertSchema);
