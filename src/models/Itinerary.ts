import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";

export const itinerarySchema = new Schema<IItinerary>({
  startDate: { type: Date, required: true, default: Date.now() },
  endDate: { type: Date, required: true, default: Date.now() },
  events: [eventSchema]
});

const Itineraries =
    mongoose.models.Itinerary ||
    mongoose.model<IItinerary>("Itinerary", itinerarySchema);

itinerarySchema.pre('save', (next) => {
  // assuming that elements in events are sorted
  //    in chronological order
  console.log("checking if event length is populated")
  if(this.events.length > 0){
    console.log("events found")
    this.startDate = events[0].date;
    this.endDate = events[events.length - 1].date;
  }
  console.log("returning next")
  next();
});

export default Itineraries;
