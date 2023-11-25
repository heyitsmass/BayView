"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";

import Provider from "../Provider";

import { Footer } from "@/components/HomePage/Footer";
import TopBar from "@/components/HomePage/TopBar";
import { SessionAuthForNextJS } from "@/components/SuperTokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "@/components/SuperTokens/tryRefreshClientComponent";
import { getSSRSession } from "@/utils/session/getSSRSession";
import { redirect } from "next/navigation";

import Banner from "@/components/Banner";
import { Animator } from "./Animator";
import { getItinerary } from "@/utils/session/getItinerary";

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

  const ctx = await getItinerary(session);

  return (
    <Provider value={ctx}>
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
