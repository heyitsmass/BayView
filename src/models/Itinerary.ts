import mongoose, { Schema } from "mongoose";
import { eventSchema } from "./Event";
import { IItinerary } from "@/types/Itinerary";

export const itinerarySchema = new Schema<IItinerary>({
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false},
  events: [eventSchema]
});

itinerarySchema.pre('save', function(next){
  // assuming that elements in events are sorted
  //    in chronological order
  console.log("checking if event length is populated")
  const {events} = this; 
  if(this.events.length > 0){
    console.log("events found")
    this.startDate = events.at(0)?.date;
    this.endDate = events.at(-1)?.date;
  }
  console.log("returning next")
  next();
});


  mongoose.models?.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

export default Itineraries;
