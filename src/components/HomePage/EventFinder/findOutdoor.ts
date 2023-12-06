import { Biking, Golf, Hiking, TEventQuery, TOutdoor } from "@/types/Event";
import { TBikingQuery, TGolfQuery, THikingQuery } from "@/types/query";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import {
  getNumberSimilarTo,
  getRandom,
  randomList,
  roundedFloat
} from "./utils";

export const findOutdoor = async ({
  ...props
}: TEventQuery<"Outdoor">): Promise<TOutdoor[] | null> => {
  const { type: mode, params } = props;
  switch (mode) {
    case "Golf":
      return findGolf(params as TGolfQuery);
    case "Hiking":
      return findHiking(params as THikingQuery);
    case "Biking":
      return findBiking(params as TBikingQuery);
    default:
      return null;
  }
};

const courses = [
  "Pine Valley Golf Club",
  "Augusta National Golf Club",
  "Cypress Point Club",
  "Shinnecock Hills Golf Club",
  "Oakmont Country Club",
  "Merion Golf Club",
  "Winged Foot Golf Club",
  "Royal County Down Golf Club",
  "Pebble Beach Golf Links",
  "Whistling Straits",
  "Royal Melbourne Golf Club",
  "Bethpage Black Course",
  "Valderrama Golf Club",
  "Carnoustie Golf Links",
  "TPC Sawgrass",
  "St. Andrews Links",
  "Bandon Dunes Golf Resort",
  "Kiawah Island Golf Resort",
  "Torrey Pines Golf Course",
  "Chambers Bay Golf Course"
];

const Difficulty = ["Beginner", "Intermediate", "Advanced", "Expert"];

const findGolf = async ({ ...params }: TGolfQuery): Promise<Golf[]> => {
  const { date, priceRange, partySize, course, holes, difficulty } = params;

  const dateMin = new Date(date);

  let price =priceRange === 0?  9999 : priceRange;
  const teeTime = () => {
    const date = faker.date.soon({
      refDate: dateMin,
      days: 1
    });

    return {
      date,
      time: date.toLocaleTimeString("it-IT", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
      price: roundedFloat(1, price) * partySize
    };
  };

  return Array.from(
    { length: randomInt(1, 18) },
    () =>
      ({
        course: getRandom(courses, course),
        courseDescription: faker.lorem.words(),
        golfLessons: faker.datatype.boolean(),
        golfCartRental: faker.datatype.boolean(),
        golfClubRental: faker.datatype.boolean(),
        holes: holes,
        teeTime: teeTime(),
        courseDifficulty: getRandom(Difficulty, difficulty)
      } as Golf)
  ).sort(
    (a, b) => a.teeTime.date.valueOf() - b.teeTime.date.valueOf()
  ) as Golf[];
};

const trails = [
  "Pacific Crest Trail",
  "Appalachian Trail",
  "John Muir Trail",
  "Inca Trail",
  "West Coast Trail",
  "Kalalau Trail",
  "Long Range Traverse",
  "Tour du Mont Blanc",
  "Laugavegur Trail",
  "Milford Track",
  "Overland Track",
  "Tongariro Alpine Crossing",
  "Haute Route",
  "Cinque Terre Trails",
  "The Narrows",
  "Zion's Angels Landing",
  "Grand Canyon Rim-to-Rim",
  "Yosemite's Half Dome",
  "Great Wall of China Trek",
  "Kumano Kodo Trail"
];

const hikingGear = [
  "Hiking Boots",
  "Backpack",
  "Trekking Poles",
  "Water Bottle",
  "Weather-Appropriate Clothing",
  "Sunscreen",
  "Hat",
  "Sunglasses",
  "Map and Compass",
  "First Aid Kit",
  "Snacks",
  "Headlamp or Flashlight",
  "Multi-tool or Knife",
  "Emergency Whistle",
  "Rain Gear",
  "Insect Repellent"
];

const pointsOfInterest = [
  "Scenic Overlook",
  "Waterfall",
  "Wildflower Meadow",
  "Mountain Summit",
  "Alpine Lake",
  "Cave or Rock Formation",
  "Historical Site",
  "Old Growth Forest",
  "Canyon Viewpoint",
  "Wildlife Observation Spot",
  "Scenic Viewpoint",
  "Mountain Summit",
  "Lake or Reservoir",
  "Historic Landmark",
  "Wildlife Observation Area",
  "Cycling Trailhead",
  "Picnic Spot",
  "Bike-Friendly Cafe",
  "Bike Repair Station",
  "Art Installation or Sculpture"
];

const terrains = ["Gravel", "Dirt", "Paved", "Rocky", "Sandy", "Wet"];

/**
 * Generate random hiking events relative to the search parameters sorted by length
 * @returns
 */
const findHiking = async ({
  ...params
}: THikingQuery): Promise<Hiking[]> => {
  const { difficulty, trail, length, elevationGain, terrain } = params;

  return Array.from(
    { length: randomInt(1, 18) },
    () =>
      ({
        trail: getRandom(trails, trail),
        terrain: getRandom(terrains, terrain),
        length: getNumberSimilarTo(length),
        difficulty: difficulty,
        distance: roundedFloat(1, 20),
        elevationGain: elevationGain,
        startingPoint: faker.location.streetAddress(),
        rating: roundedFloat(1, 5),
        recommendedGear: randomList(hikingGear),
        pointsOfInterest: randomList(pointsOfInterest),
        campingOptions: faker.datatype.boolean()
      } as Hiking)
  ).sort((a, b) => a.length - b.length);
};

const bikingGear = [
  "Helmet",
  "Bike",
  "Cycling Shorts",
  "Cycling Jersey",
  "Gloves",
  "Cycling Shoes",
  "Water Bottle and Cage",
  "Sunglasses",
  "Bike Repair Kit",
  "Bike Pump",
  "Multi-tool",
  "Bike Lights",
  "Reflective Gear",
  "Cycling Computer",
  "Bike Lock",
  "Backpack"
];

/**
 *
 * Generate random biking events relative to the search parameters sorted by length
 * @returns
 */

const findBiking = async ({
  ...params
}: TBikingQuery): Promise<Biking[]> => {
  const { difficulty, trail, length, elevationGain, terrain } = params;
  return Array.from(
    { length: randomInt(1, 18) },
    () =>
      ({
        trail: getRandom(trails, trail),
        terrain: getRandom(terrains, terrain),
        length: getNumberSimilarTo(length),
        difficulty: difficulty,
        distance: roundedFloat(1, 20),
        elevationGain: elevationGain,
        startingPoint: faker.location.streetAddress(),
        rating: roundedFloat(1, 5),
        recommendedGear: randomList(bikingGear),
        pointsOfInterest: randomList(pointsOfInterest),
        campingOptions: faker.datatype.boolean()
      } as Biking)
  ).sort((a, b) => a.length - b.length);
};
