'use server';

import { handleCall } from '@/lib/random/handleCall';
import { location } from '@/lib/random/utils';
import {
  AmusementParkModel,
  AquariumModel,
  BikingModel,
  ConcertModel,
  DiningModel,
  FlightModel,
  GolfModel,
  HikingModel,
  HotelModel,
  MuseumModel,
  NightlifeModel,
  ParkModel,
  ShoppingModel,
  SpaModel,
  SportsModel,
  TheatreModel,
  WaterparkModel,
  ZooModel
} from '@/models';
import {
  Activities,
  EventTypes,
  Reservable,
  SportEvents,
  Sports
} from '@/types/Event';
import { faker } from '@faker-js/faker';
import { HydratedDocument } from 'mongoose';

/**
 * Generate a random Sports event based on the type
 * @param event - The type of event to generate (must be Sports)
 * @param sport - The type of sport to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: 'Sports',
  sport: SportEvents
): Promise<HydratedDocument<Sports>>;
/**
 * Generate a random (Non-Sports) event based on the type
 * @param event - The type of event to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: Exclude<EventTypes, 'Sports'>
): Promise<HydratedDocument<Reservable | Omit<Activities, 'Sports'>>>;
/**
 * Generate a random event based on the type
 * @param event - The type of event to generate
 * @param sport - Only used for Sports
 * @returns A Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: EventTypes,
  sport?: SportEvents
): Promise<HydratedDocument<Reservable | Activities>> {
  const modelTypes = {
    Hotel: HotelModel,
    Dining: DiningModel,
    Flight: FlightModel,
    Theatre: TheatreModel,
    Concert: ConcertModel,
    Museum: MuseumModel,
    Park: ParkModel,
    Zoo: ZooModel,
    Spa: SpaModel,
    Golf: GolfModel,
    Aquarium: AquariumModel,
    Hiking: HikingModel,
    Biking: BikingModel,
    Waterpark: WaterparkModel,
    AmusementPark: AmusementParkModel,
    Sports: SportsModel,
    Nightlife: NightlifeModel,
    Shopping: ShoppingModel
  };

  const data =
    event === 'Sports' ? handleCall(event, sport!) : handleCall(event);

  return new modelTypes[event]({
    name: faker.lorem.words(),
    location: location(),
    description: faker.lorem.words(),
    ...data
  });
}
