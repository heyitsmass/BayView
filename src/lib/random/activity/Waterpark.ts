import { Waterpark } from '@/types/Event';
import { nameAndRandomDescription, openingHours } from '../utils';
import { faker } from '@faker-js/faker';

/** Generate a random waterpark activity  */
export const waterpark = (): Waterpark => {
  return {
    attractions: nameAndRandomDescription([
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
    admissionFee: faker.number.float({ min: 1, max: 100 }),
    openingHours: openingHours(),
    wavePool: faker.datatype.boolean(),
    lazyRiver: faker.datatype.boolean(),
    waterSlides: nameAndRandomDescription([
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
