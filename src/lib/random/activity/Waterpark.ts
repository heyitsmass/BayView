import { Waterpark } from '@/types/Event';
import { nameAndRandomDescription, nameAndRandomDescriptions, openingHours, roundedFloat } from '../utils';
import { faker } from '@faker-js/faker';

/** Generate a random waterpark activity  */
export const waterpark = (): Waterpark => {
  return {
    attractions: nameAndRandomDescriptions([
      'Wave Pool',
      'Lazy River',
      'Water Slides',
      'Tidal Wave Bay',
      'Adventure River',
      'Splash Pad',
      'Family Raft Ride',
      'Drop Slide',
      'FlowRider',
      'Aquatic Play Structure'
    ]),
    admissionFee: roundedFloat(1, 100),
    openingHours: openingHours(),
    wavePool: faker.datatype.boolean(),
    lazyRiver: faker.datatype.boolean(),
    waterSlides: nameAndRandomDescriptions([
      'Twisted Tornado',
      'Spiral Splash',
      'Raging Rapids',
      'Turbo Tube',
      'Freefall Falls',
      'Whirlwind Whiz',
      'Aqua Vortex',
      'Splash Canyon',
      'Typhoon Twist',
      'Rocket Racer'
    ])
  };
};
