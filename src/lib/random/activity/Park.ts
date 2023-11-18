import { Park } from "@/types/Event";
import { nameAndRandomDescription, openingHours } from "../utils";

/** Generate a random park activity */
export const park = (): Park => {
  return {
    openingHours: openingHours(),
    facilities: nameAndRandomDescription([
      "Visitor Center",
      "Picnic Area",
      "Playground",
      "Outdoor Theater",
      "Observation Deck",
      "Botanical Garden",
      "Amphitheater",
      "Camping Grounds",
      "Information Kiosk",
      "Restrooms"
    ]),
    activities: nameAndRandomDescription([
      "Hiking",
      "Biking",
      "Picnicking",
      "Bird Watching",
      "Boating",
      "Fishing",
      "Camping",
      "Stargazing",
      "Photography",
      "Nature Walks"
    ]),
    naturalFeatures: nameAndRandomDescription([
      "Waterfall",
      "Mountain Range",
      "Lake",
      "Forest",
      "Canyon",
      "Meadow",
      "River",
      "Valley",
      "Cliff",
      "Desert Oasis"
    ]),
    wildlife: nameAndRandomDescription([
      "White-Tailed Deer",
      "Red Fox",
      "Bald Eagle",
      "Eastern Gray Squirrel",
      "Butterflies (Various Species)",
      "Great Blue Heron",
      "Black Bear",
      "Monarch Butterfly",
      "Eastern Chipmunk",
      "Gray Wolf"
    ])
  };
};
