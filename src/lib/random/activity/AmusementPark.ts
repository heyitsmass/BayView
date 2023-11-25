import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { openingHours, randomWordList, roundedFloat } from "../utils";
import { AmusementPark } from "@/types/Event";

/** Generate a random amusement park activity. */
export const amusementPark = (): AmusementPark => {
  const rides = [
    "Roller Coaster",
    "Ferris Wheel",
    "Carousel",
    "Drop Tower",
    "Haunted Mansion",
    "Spinning Teacups",
    "Log Flume",
    "Bumper Cars",
    "Swing Ride",
    "Water Coaster"
  ];

  const rollerCoasters = [
    "Thunderbolt",
    "Twisted Cyclone",
    "Velocity Vortex",
    "Gravity Grinder",
    "Screaming Serpent",
    "Thrill Thunder",
    "Inferno Insanity",
    "Dragon's Roar",
    "Galactic G-Force",
    "Viper Venom"
  ];

  const themedAreas = [
    "Adventureland",
    "Fantasy Kingdom",
    "Sci-Fi Galaxy",
    "Wild West Frontier",
    "Enchanted Forest",
    "Pirate's Cove",
    "Dinosaur Discovery Zone",
    "Superhero City",
    "Futuristic Metropolis",
    "Magical Wonderland"
  ];

  const waterRides = [
    "Log Flume",
    "River Rapids",
    "Water Coaster",
    "Water Slide",
    "Water Flume",
    "Water Rapids",
    "Water Chute",
    "Water Shoot",
    "Waterfall",
    "Water Jet"
  ];

  const heightRestrictions = (names: string[]) => {
    const restrictions = {} as any;

    for (let i = 0; i < randomInt(1, 10); i++) {
      restrictions[names[randomInt(0, names.length)]] = faker.number.int({
        min: 40,
        max: 90
      });
    }

    return restrictions;
  };

  return {
    rides: randomWordList(rides),
    admissionFee: roundedFloat(1, 100),
    openingHours: openingHours(),
    rollerCoasters: randomWordList(rollerCoasters),
    themedAreas: randomWordList(themedAreas),
    waterRides: randomWordList(waterRides),
    heightRestrictions: heightRestrictions([
      ...rides,
      ...rollerCoasters,
      ...waterRides,
      ...themedAreas
    ])
  };
};
