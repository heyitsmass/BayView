"use server";

import ItineraryModel from "@/models/Itinerary";
import { IItinerary } from "@/types/Itinerary";
import { HydratedDocument } from "mongoose";

export type DeleteEventPayload = {
  _id: string;
  event_id: string;
};

/** Remove the event from the itinerary in the database */
const handleDeleteEvent = async ({
  ...props
}: DeleteEventPayload): Promise<HydratedDocument<IItinerary> | null> => {
  const { _id, event_id } = props;

  return ItineraryModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $pull: {
        events: {
          _id: event_id,
        },
      },
    },
    {
      new: true,
    }
  );
};

export { handleDeleteEvent };
