import { Park } from "@/types/Event";
import { nameAndRandomDescriptions, openingHours } from "../utils";

/** Generate a random park activity */
export const park = (): Park => {
  return {
    openingHours: openingHours(),
    facilities: nameAndRandomDescriptions([
      "Visitor Center",
      "Picnic Area",
      "Playground",
      "Outdoor Theater",
      "Observation Deck",
      "Botanical Garden",
      "Amphitheater",
      "Camping Grounds",
      "Information Kiosk",
      "Restrooms",
    ]),
    activities: nameAndRandomDescriptions([
      "Hiking",
      "Biking",
      "Picnicking",
      "Bird Watching",
      "Boating",
      "Fishing",
      "Camping",
      "Stargazing",
      "Photography",
      "Nature Walks",
    ]),
    naturalFeatures: nameAndRandomDescriptions([
      "Waterfall",
      "Mountain Range",
      "Lake",
      "Forest",
      "Canyon",
      "Meadow",
      "River",
      "Valley",
      "Cliff",
      "Desert Oasis",
    ]),
    wildlife: nameAndRandomDescriptions([
      "White-Tailed Deer",
      "Red Fox",
      "Bald Eagle",
      "Eastern Gray Squirrel",
      "Butterflies (Various Species)",
      "Great Blue Heron",
      "Black Bear",
      "Monarch Butterfly",
      "Eastern Chipmunk",
      "Gray Wolf",
    ]),
  };
};
