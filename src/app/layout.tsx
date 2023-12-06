"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { barlow, barlowCondensed, barlowSemiCondensed } from "./fonts";
import { SuperTokensProvider } from "@/components/SuperTokens/SuperTokensProvider";
import { PopupProvider } from "./PopupProvider";
import { Metadata } from "next";

export const viewport = async () => ({
  themeColor: {
    media: "(prefers-color-scheme: dark)"
  },
  colorScheme: "dark"
});

export const metadata = async () =>
  ({
    metadataBase: new URL("https://www.bayview.dev"),
    title: {
      default: "BayView",
      template: "%s | BayView"
    },
    description: "Your Next Generation Itinerary Manager",
    applicationName: "BayView",
    authors: [
      {
        name: "Bayview Developers",
        url: "https://github.com/heyitsmass/BayView"
      },
      {
        name: "Brandon C.",
        url: "https://github.com/heyitsmass"
      },
      {
        name: "Rylee O.",
        url: "https://github.com/rdoinhs"
      },
      {
        name: "Carmela P.",
        url: "https://github.com/cpilande"
      },
      {
        name: "Joshua S.",
        url: "https://github.com/sonicspeed123"
      },
      {
        name: "Salvador R.",
        url: "https://github.com/Chappy122"
      },
      {
        name: "CS472 Group 4.",
        url: "https://github.com/heyitsmass/BayView"
      }
    ],
    generator: "Next.js",
    keywords: [
      "react",
      "educational",
      "project",
      "next",
      "js",
      "itinerary",
      "event",
      "planning"
    ],
    referrer: "origin",
    creator: "BayView Development Team",
    publisher: "Vercel",
    robots: "nofollow"
  } as Metadata);

export default async function Layout({
  children
}: {
  children?: ReactNode;
}) {
  return (
    <html
      className={`${barlow.variable} ${barlowCondensed.variable}  ${barlowSemiCondensed.variable}`}
    >
      <SuperTokensProvider>
        <body>
          <PopupProvider>{children}</PopupProvider>
        </body>
      </SuperTokensProvider>
    </html>
  );
}
