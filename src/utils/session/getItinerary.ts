"use server";

import { THomepageContext } from "@/context";
import ItineraryModel from "@/models/Itinerary";
import { TEventType } from "@/types/Event";
import { FlattenedItinerary, ItineraryWithMongo } from "@/types/Itinerary";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";
import { getUserMetadata } from "supertokens-node/recipe/usermetadata";
import { models } from "../../models";

export const getItinerary = async (
  session: SessionContainerInterface
): Promise<THomepageContext> => {
  const _id = session.getUserId();

  let itinerary: FlattenedItinerary = (
    (await ItineraryModel.findOneAndUpdate(
      {
        _id
      },
      {
        _id
      },
      {
        upsert: true,
        new: true
      }
    )) as ItineraryWithMongo
  ).toJSON({
    virtuals: true,
    flattenObjectIds: true,
    flattenMaps: true
  });

  const { metadata } = await getUserMetadata(_id);

  return {
    user: {
      _id,
      metadata
    },
    itinerary: {
      ...itinerary,
      events: itinerary.events
        .filter((event) => !!event.__t)
        .map((event) =>
          (new models[event.__t as TEventType](event) as any).toJSON({
            flattenObjectIds: true,
            virtuals: true
          })
        )
    }
  };
};
