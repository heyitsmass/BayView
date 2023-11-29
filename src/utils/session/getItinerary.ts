"use server";

import { THomepageContext } from "@/context";
import models from "@/models";
import ItineraryModel from "@/models/Itinerary";
import { DisplayData } from "@/types";
import { Event } from "@/types/Event";
import { FlattenedItinerary, ItineraryWithMongo } from "@/types/Itinerary";
import { HydratedDocument } from "mongoose";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";
import { getUserMetadata } from "supertokens-node/recipe/usermetadata";

export const getItinerary = async (
  session: SessionContainerInterface
): Promise<THomepageContext> => {
  const _id = session.getUserId();

  let itinerary: FlattenedItinerary = (
    (await ItineraryModel.findOneAndUpdate(
      {
        _id
      },
      {},
      {
        upsert: true,
        new: true
      }
    )) as ItineraryWithMongo
  ).toJSON({ virtuals: true, flattenObjectIds: true, flattenMaps: true });

  itinerary.events = itinerary.events.map((event) => {
    const rebuilt = new models[event.__t](event) as HydratedDocument<Event> &
      DisplayData;

    return rebuilt.toJSON({ flattenObjectIds: true, virtuals: true });
  });

  const { metadata } = await getUserMetadata(_id);

  return {
    user: {
      _id,
      metadata
    },
    itinerary
  };
};
