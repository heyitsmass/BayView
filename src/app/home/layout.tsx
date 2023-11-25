"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";

import Provider from "../Provider";

import { Footer } from "@/components/HomePage/Footer";
import TopBar from "@/components/HomePage/TopBar";
import { SessionAuthForNextJS } from "@/components/SuperTokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "@/components/SuperTokens/tryRefreshClientComponent";
import ItineraryModel from "@/models/Itinerary";
import { FlattenedItinerary, ItineraryWithMongo } from "@/types/Itinerary";
import { UserMetadata } from "@/types/User";
import { getSSRSession } from "@/utils/session/getSSRSession";
import { redirect } from "next/navigation";
import { getUserMetadata } from "supertokens-node/recipe/usermetadata";

import Banner from "@/components/Banner";
import { modelTypes } from "@/lib/constants";
import { DisplayData, DocumentWithDisplayData } from "@/types";
import { Animator } from "./Animator";
import mongoose, { FlattenMaps, HydratedDocument } from "mongoose";
import { EventModel } from "@/models/Event";
import { FlattenedEvent } from "./itinerary/page";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { session, hasToken, hasInvalidClaims } = await getSSRSession();

  if (!session) {
    if (!hasToken) return redirect("/auth");

    return hasInvalidClaims ? (
      <SessionAuthForNextJS />
    ) : (
      <TryRefreshComponent />
    );
  }

  const _id =
    process.env.NODE_ENV !== "production"
      ? process.env.TEST_ID!
      : session.getUserId();

  let itinerary: FlattenedItinerary = (
    (await ItineraryModel.findOneAndUpdate(
      {
        _id,
      },
      {},
      {
        upsert: true,
        new: true,
      }
    )) as ItineraryWithMongo
  ).toJSON({ flattenObjectIds: true, flattenMaps: true });

  itinerary.events = itinerary.events.map((event) => {
    const rebuilt = new EventModel.discriminators![event.__t](
      event
    ) as HydratedDocument<unknown & DisplayData>;

    const { peek, displayData, upgradeOptions } = rebuilt;

    return {
      ...event,
      peek,
      displayData,
      upgradeOptions,
    } as FlattenedEvent;
  });

  const { metadata } = await getUserMetadata(_id);

  return (
    <Provider
      value={{
        user: {
          _id,
          metadata,
        },
        itinerary,
      }}
    >
      <div className="flex-start w-screen h-screen relative">
        <TopBar />
        <div
          style={{ height: "calc(100vh - 7.5rem)" }}
          className="mt-20 relative"
        >
          <Banner />
          <Animator>
            <div className="relative h-full overflow-y-scroll">
              {children}
            </div>
          </Animator>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
