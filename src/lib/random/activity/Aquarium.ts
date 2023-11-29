import { Aquarium } from '@/types/Event';
import { nameAndRandomDescription, nameAndRandomDescriptions, openingHours, roundedFloat, showTimes } from '../utils';
import { faker } from '@faker-js/faker';

/** Generate a random aquarium activity */
export const aquarium = (): Aquarium => {
  const exhibits = nameAndRandomDescriptions([
    'Coral Reef Exploration',
    'Amazon Rainforest Tank',
    'Penguin Habitat',
    'Shark Lagoon',
    'Jellyfish Gallery',
    'Seahorse Sanctuary',
    'Tropical Rainforest Display',
    'Kelp Forest Exhibit',
    'Deep Sea Wonders',
    'Touch Pool Experience'
  ]);
  return {
    exhibits,
    admissionFee: roundedFloat(0, 100),
    openingHours: openingHours(),
    underwaterTunnel: faker.datatype.boolean(),
    touchPools: faker.datatype.boolean(),
    showSchedule: showTimes()
  };
};
