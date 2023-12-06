import {
  Barlow,
  Barlow_Semi_Condensed,
  Barlow_Condensed
} from "next/font/google";

export const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-barlow",
  preload: true
});

export const barlowSemiCondensed = Barlow_Semi_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-barlow-semi-condensed",
  preload: true
});

export const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-barlow-condensed",
  preload: true
});
