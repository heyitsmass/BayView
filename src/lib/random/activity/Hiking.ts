import { Hiking } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomWordList } from "../utils";

/**
 * Generate a random hiking event
 * @param gear - List of gear to choose from
 * @param poi - List of points of interest to choose from
 */
export const hiking = (gear?: string[], poi?: string[]): Hiking => {
  return {
    trail: faker.lorem.words(),
    length: faker.number.int({ min: 1, max: 20 }),
    difficulty: faker.lorem.word(),
    distance: faker.number.float({ min: 1, max: 20 }),
    elevationGain: faker.number.float({ min: 1, max: 20 }),
    startingPoint: faker.location.streetAddress(),
    rating: faker.number.float({ min: 1, max: 5 }),
    recommendedGear: randomWordList(
      gear || [
        'Hiking Boots',
        'Backpack',
        'Trekking Poles',
        'Water Bottle',
        'Weather-Appropriate Clothing',
        'Sunscreen',
        'Hat',
        'Sunglasses',
        'Map and Compass',
        'First Aid Kit',
        'Snacks',
        'Headlamp or Flashlight',
        'Multi-tool or Knife',
        'Emergency Whistle',
        'Rain Gear',
        'Insect Repellent'
      ]
    ),
    pointsOfInterest: randomWordList(
      poi || [
        'Scenic Overlook',
        'Waterfall',
        'Wildflower Meadow',
        'Mountain Summit',
        'Alpine Lake',
        'Cave or Rock Formation',
        'Historical Site',
        'Old Growth Forest',
        'Canyon Viewpoint',
        'Wildlife Observation Spot'
      ]
    ),
    campingOptions: faker.datatype.boolean()
  };
};
