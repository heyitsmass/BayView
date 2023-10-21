import { ICoordinatedItinerary } from "@/types/CoordinatedItinerary";
import mongoose, { Schema } from "mongoose";
import { itinerarySchema } from "./Itinerary";

export const coordinatedItinerarySchema = new Schema<ICoordinatedItinerary>(
  {
    coordinators: {
      primary: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
      secondary: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
        required: true
      }
    },
    groups: [
      {
        name: { type: String, required: true },
        members: {
          type: [mongoose.Types.ObjectId],
          ref: "User",
          required: false
        },
        itinerary: itinerarySchema,
        _id: false
      }
    ]
  }
);

const CoordinatedItineraries =
  mongoose.models.CoordinatedItinerary ||
  mongoose.model<ICoordinatedItinerary>(
    "CoordinatedItinerary",
    coordinatedItinerarySchema
  );

export default CoordinatedItineraries;
