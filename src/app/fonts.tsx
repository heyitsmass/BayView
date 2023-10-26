import { Barlow, Barlow_Semi_Condensed, Barlow_Condensed } from "next/font/google";

export const barlow = Barlow({
	weight: ["400","500","600"],
	subsets: ["latin"],
	display: "swap",
	style: "normal",
    variable: "--font-barlow"
});

export const barlowSemiCondensed = Barlow_Semi_Condensed({
	weight: ["400","500","600"],
	subsets: ["latin"],
	display: "swap",
	style: "normal",
    variable: "--font-barlow-semi-condensed"
});

export const barlowCondensed = Barlow_Condensed({
	weight: ["400","500","600"],
	subsets: ["latin"],
	display: "swap",
	style: "normal",
    variable: "--font-barlow-condensed"
});
