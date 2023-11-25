"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";

import Provider from "../Provider";

import { Footer } from "@/components/HomePage/Footer";
import TopBar from "@/components/HomePage/TopBar";
import { SessionAuthForNextJS } from "@/components/SuperTokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "@/components/SuperTokens/tryRefreshClientComponent";
import ItineraryModel from "@/models/Itinerary";
import { ItineraryWithMongo } from "@/types/Itinerary";
import { UserMetadata } from "@/types/User";
import { getSSRSession } from "@/utils/session/getSSRSession";
import { redirect } from "next/navigation";
import { getUserMetadata } from "supertokens-node/recipe/usermetadata";

import Banner from "@/components/Banner";
import { modelTypes } from "@/lib/constants";
import { DocumentWithDisplayData } from "@/types";
import { Animator } from "./Animator";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { session, hasToken, hasInvalidClaims } = await getSSRSession();

  if (!session) {
    if (!hasToken) {
      return redirect("/auth");
    }

    if (hasInvalidClaims) {
      return <SessionAuthForNextJS />;
    } else {
      return <TryRefreshComponent />;
    }
  }

  let _id = session.getUserId();

  const { metadata } = (await getUserMetadata(_id)) as {
    metadata: UserMetadata;
  };

  if (process.env.NODE_ENV === "development") {
    _id = process.env.TEST_ID!;
  }

  let itinerary = (await ItineraryModel.findOne({
    _id,
  })) as ItineraryWithMongo;

  if (!itinerary) {
    itinerary = (await ItineraryModel.create({
      _id,
    })) as ItineraryWithMongo;
  }

  return (
    <Provider
      value={{
        user: {
          _id,
          metadata,
        },
        itinerary: {
          ...itinerary.toJSON({
            flattenObjectIds: true,
          }),
          events: itinerary.events.map((event: DocumentWithDisplayData) => {
            const flat = event.toJSON({ flattenObjectIds: true });

            const e = new modelTypes[flat.__t](flat);

            const { peek, displayData, upgradeOptions } = e;

            return {
              ...flat,
              peek,
              displayData,
              upgradeOptions,
            };
          }),
        },
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
        <Footer></Footer>
      </div>
    </Provider>
  );
}
//<Banner bannerHeight="!h-52" src="/images/banner.png" />
