"use server";

import {
  AmusementPark,
  Aquarium,
  TEventQuery,
  TExperience,
  Waterpark,
  Zoo
} from "@/types/Event";
import {
  TAmusementParkQuery,
  TAquariumQuery,
  TWaterParkQuery,
  TZooQuery
} from "@/types/query";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { getRandom, openingHours, randomList } from "./utils";

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

export const findExperience = async ({
  ...props
}: TEventQuery<"Experience">): Promise<TExperience[] | null> => {
  const { type: mode, params } = props;
  switch (mode) {
    case "Zoo":
      return findZoo(params as TZooQuery);
    case "Aquarium":
      return findAquarium(params as TAquariumQuery);
    case "Waterpark":
      return findWaterPark(params as TWaterParkQuery);
    case "AmusementPark":
      return findAmusementPark(params as TAmusementParkQuery);
    default:
      return null;
  }
};

const ZooName = [
  "Wild Haven Zoo",
  "Serengeti Safari Park",
  "Rainforest Adventure Zoo",
  "Wilderness Wonderland Zoo",
  "Jungle Oasis Zoo",
  "Savannah Safari Reserve",
  "Arctic Kingdom Zoo",
  "Amazonia Wildlife Park",
  "Outback Wilderness Zoo",
  "Discovery Cove Zoo",
  "Safari Trails Zoo",
  "Woodland Wonders Wildlife Park",
  "Oceanic Exploration Zoo",
  "Tundra Trails Zoo",
  "Alpine Peaks Wildlife Sanctuary",
  "Coral Reef Cove Zoo",
  "Eden Exotic Animal Park",
  "Grasslands Nature Reserve",
  "Coastal Cove Wildlife World",
  "Mountain Majesty Zoo"
];

const exhibits = [
  "African Savannah",
  "Penguin Paradise",
  "Rainforest Adventure",
  "Arctic Wonderland",
  "Reptile House",
  "Australian Outback",
  "Tropical Butterfly Garden",
  "Ocean Explorer",
  "Nocturnal Creatures Habitat",
  "Asian Elephant Sanctuary"
];

const feedings = [
  "Lion Feeding",
  "Penguin Feeding",
  "Shark Feeding",
  "Elephant Feeding",
  "Seal Show and Feed",
  "Birds of Prey Feeding",
  "Giraffe Feeding Experience",
  "Reptile Feeding Time",
  "Koala Feeding Session",
  "Tropical Fish Feeding"
];

const experiences = [
  "Animal Encounters",
  "Behind-the-Scenes Tours",
  "Hands-On Science Workshops",
  "Interactive Art Exhibits",
  "Virtual Reality Experiences",
  "Interactive Cooking Classes",
  "Meet-and-Greet with Characters",
  "Guided Nature Walks",
  "DIY Craft Stations",
  "Escape Room Challenges"
];
const findZoo = async ({ ...params }: TZooQuery): Promise<Zoo[]> => {
  const { date, priceRange, exhibit, experience, partySize } = params;
  let price =priceRange === 0?  9999 : priceRange;
  const getResult = () => {
    return {
      zoo: getRandom(ZooName),
      interactiveExperience: {
        name: getRandom(experiences, experience),
        time: faker.date
          .soon({
            refDate: date,
            days: 1
          })
          .toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }),
        description: faker.lorem.sentence()
      },
      admissionFee:
        faker.number.int({ min: 0, max: price }) *
        partySize,
      feedingSchedule: {
        name: getRandom(feedings),
        time: faker.date
          .soon({
            refDate: date,
            days: 1
          })
          .toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          })
      },
      exhibit: {
        name: getRandom(exhibits, exhibit),
        description: faker.lorem.sentence(),
        date: faker.date.soon({
          refDate: date,
          days: 1
        })
      },
      openingHours: openingHours("Day")
    } as Zoo;
  };

  return Array.from({ length: randomInt(1, 18) }, getResult).sort(
    (a, b) =>
      a.feedingSchedule.time.localeCompare(b.feedingSchedule.time)
  ) as Zoo[];
};

const AquariumExhibits = [
  "Tropical Reef Tank",
  "Amazonian Rainforest Display",
  "Jellyfish Gallery",
  "Seahorse Sanctuary",
  "Kelp Forest",
  "Shark Tunnel",
  "Coral Garden",
  "Rocky Shoreline",
  "Arctic Zone",
  "Mangrove Swamp",
  "Penguin Pavilion",
  "Deep Sea Abyss",
  "Tidal Pool",
  "Octopus Cove",
  "Whale Watching Deck",
  "Estuary Exploration",
  "Mystical Mermaid Grotto",
  "Freshwater Oasis",
  "Shipwreck Encounter",
  "Eel Alley"
];

const AquariumExperiences = [
  "Touch Pools",
  "Feedings and Demonstrations",
  "Virtual Reality Exhibits",
  "Behind-the-Scenes Tours",
  "Interactive Screens or Games",
  "Aquarium Encounters",
  "Education Workshops",
  "Aquascaping Demonstrations",
  "Live Q&A Sessions",
  "Underwater Observation Bubbles",
  "Marine Conservation Talks",
  "DIY Fish Feeding",
  "Art & Crafts Sessions",
  "Photo Booths with Marine Props",
  "Scuba Diving Introductory Sessions",
  "Ocean-themed Storytelling",
  "Interactive Marine Science Labs",
  "Aquarium Sleepovers",
  "Adopt-an-Animal Programs",
  "Underwater Photography Classes"
];

const AquariumName = [
  "Oceanic Oasis Aquarium",
  "Aquatic Symphony Aquarium",
  "Blue Horizon Aquarium",
  "Marine Marvels Aquarium",
  "Coral Kingdom Aquarium",
  "Seaside Serenity Aquarium",
  "Deep Blue Wonders Aquarium",
  "Aquatic Discoveries Aquarium",
  "Crystal Cove Aquarium",
  "Underwater World Aquarium",
  "Neptune's Realm Aquarium",
  "SeaLife Sanctuary Aquarium"
];

const findAquarium = async ({
  ...params
}: TAquariumQuery): Promise<Aquarium[]> => {
  const { date, priceRange, exhibit, experience } = params;

  const getResult = () => {
    const showTime = faker.date.soon({
      refDate: date,
      days: 1
    });
    const exp = getRandom(AquariumExperiences, experience);
    let price =priceRange === 0?  9999 : priceRange;
    return {
      aquarium: getRandom(AquariumName),
      exhibit: {
        name: getRandom(AquariumExhibits, exhibit),
        description: faker.lorem.sentence(),
        date: showTime
      },
      admissionFee: faker.number.int({
        min: 0,
        max: price
      }),
      openingHours: openingHours("Day"),
      underwaterTunnel: faker.datatype.boolean(),
      touchPools: exp === "Touch Pools",
      interactiveExperience: {
        name: exp,
        time: showTime.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }),
        description: faker.lorem.sentence()
      },
      showSchedule: {
        date: showTime,
        time: showTime.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      }
    } as Aquarium;
  };
  return Array.from({ length: randomInt(1, 18) }, getResult).sort(
    (a, b) => a.showSchedule.time.localeCompare(b.showSchedule.time)
  ) as Aquarium[];
};

const WaterPark = [
  "Splash Haven",
  "Aquatic Oasis",
  "Wave World",
  "Aqua Adventure Park",
  "Neptune's Nook",
  "Blue Lagoon Park",
  "Crystal Cove Waterpark",
  "Torrential Trails",
  "Splash Central",
  "Wet 'n' Wild Park",
  "Cascade Springs",
  "Tidal Twist",
  "Splashopolis",
  "Riptide Reef",
  "Marine Mirage",
  "AquaSphere",
  "SunSplash Park",
  "Coral Cove",
  "Splash Wave Bay",
  "Oceanic Oasis",
  "Surf n' Slide Park",
  "Triton's Treasure",
  "Island Splash",
  "Rapid River Run",
  "SplashDown Beach",
  "Dolphin Dive Park",
  "Pirate's Plunge",
  "Coastal Currents",
  "Wave Rider Resort",
  "AquaSafari",
  "Tropical Tide Park"
];

const waterParkAttraction = [
  "Wave Pool",
  "Lazy River",
  "Water Slides",
  "Tidal Wave Bay",
  "Adventure River",
  "Splash Pad",
  "Family Raft Ride",
  "Drop Slide",
  "FlowRider",
  "Aquatic Play Structure"
];

const waterSlides = [
  "Twisted Tornado",
  "Spiral Splash",
  "Raging Rapids",
  "Turbo Tube",
  "Freefall Falls",
  "Whirlwind Whiz",
  "Aqua Vortex",
  "Splash Canyon",
  "Typhoon Twist",
  "Rocket Racer"
];

const findWaterPark = async ({
  ...params
}: TWaterParkQuery): Promise<Waterpark[]> => {
  const {
    date,
    priceRange,
    partySize,
    waterPark,
    attraction,
    waterslide
  } = params;

  const atrs = randomList(waterParkAttraction);
  let price =priceRange === 0?  9999 : priceRange;
  const getResult = () => {
    return {
      parkName: getRandom(WaterPark, waterPark),
      attractions: atrs,
      mainAttraction: {
        name: getRandom(waterParkAttraction, attraction),
        description: faker.lorem.sentence()
      },
      admissionFee:
        faker.number.int({ min: 0, max: price}) *
        partySize,
      waterSlides: randomList(waterSlides),
      openingHours: openingHours("Day"),
      wavePool: atrs.includes("Wave Pool"),
      lazyRiver: atrs.includes("Lazy River"),
      mainWaterslide: {
        name: getRandom(waterSlides, waterslide),
        description: faker.lorem.sentence()
      }
    } as Waterpark;
  };
  return Array.from(
    {
      length: randomInt(1, 18)
    },
    getResult
  ) as Waterpark[];
};

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

const parks = [
  "Adventure Heights",
  "Thrilltopia",
  "WonderWorld Park",
  "EnchantLand",
  "Fantasy Frontier",
  "Magic Meadows",
  "Dreamland Delights",
  "Whirlwind Woods",
  "Mystic Marvels",
  "RideRush Park",
  "Jubilee Junction",
  "Fantastic Funland",
  "Carnival Cove",
  "Whimsy World",
  "Excite-o-Rama",
  "Epic Escape Park",
  "Enigma Emporium",
  "Spectra Springs",
  "WhizBang Wonderland",
  "JoyZone Park",
  "Merryland Park",
  "Fantabulous Fair",
  "Adrenaline Alley",
  "Elysium Gardens",
  "Mirage Meadows",
  "GleeLand",
  "Funtastic Frontier",
  "Pleasure Paradise",
  "AmazePark",
  "Vortex Valley"
];
const findAmusementPark = async ({
  ...params
}: TAmusementParkQuery): Promise<AmusementPark[]> => {
  const {
    date,
    priceRange,
    partySize,
    amusementPark,
    attraction,
    waterride
  } = params;

  const rds = randomList(rides);
  let price =priceRange === 0?  9999 : priceRange;
  const getResult = () => {
    return {
      parkName: getRandom(parks, amusementPark),
      rides: rds,
      admissionFee:
        faker.number.int({ min: 0, max: price}) *
        partySize,
      openingHours: openingHours("Day"),
      rollerCoaster: getRandom(rollerCoasters, attraction),
      heightRestriction: heightRestrictions(rds),
      waterRide: getRandom(waterRides, waterride)
    } as AmusementPark;
  };
  return Array.from(
    { length: randomInt(1, 18) },
    getResult
  ) as AmusementPark[];
};
