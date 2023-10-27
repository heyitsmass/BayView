import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";
import { IItinerary } from "@/types/Itinerary";

export const itinerarySchema = new Schema<IItinerary>({
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false},
  events: [eventSchema]
});

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


  mongoose.models?.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

export default Itineraries;
