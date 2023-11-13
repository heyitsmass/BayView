import {
  Activities,
  EventTypes,
  Reservable,
  SportEvents,
  Sports
} from '@/types/Event';
import random from '.';

/**
 * Generate a random, Sports event based on the type
 * @param event - The type of event to generate (must be Sports)
 * @param sport - The type of sport to generate
 * @returns Returns the pure data for the event
 */
export function handleCall(event: 'Sports', sport: SportEvents): Sports;
/**
 * Generate a random, Non-Sports event based on the type
 * @param event - The type of event to generate
 * @returns Returns the pure data for the event
 */
export function handleCall(
  event: Exclude<EventTypes, 'Sports'>
): Reservable | Omit<Activities, 'Sports'>;
/**
 * Generate a random event based on the type
 * @param event - The type of event to generate
 * @param sport - Only used for Sports
 * @returns Returns the pure data for the event
 */
export function handleCall(
  event: EventTypes,
  sport?: SportEvents
): Reservable | Activities {
  switch (event) {
    case 'AmusementPark':
      return random.activity.amusementPark();
    case 'Aquarium':
      return random.activity.aquarium();
    case 'Concert':
      return random.activity.concert();
    case 'Dining':
      return random.reservation.dining();
    case 'Flight':
      return random.reservation.flight();
    case 'Golf':
      return random.activity.golf();
    case 'Hotel':
      return random.reservation.hotel();
    case 'Museum':
      return random.activity.museum();
    case 'Nightlife':
      return random.activity.nightlife();
    case 'Park':
      return random.activity.park();
    case 'Shopping':
      return random.activity.shopping();
    case 'Spa':
      return random.activity.spa();
    case 'Sports':
      return random.activity.sports(sport!);
    case 'Theatre':
      return random.activity.theatre();
    case 'Waterpark':
      return random.activity.waterpark();
    case 'Zoo':
      return random.activity.zoo();
    case 'Hiking':
      return random.activity.hiking();
    case 'Biking':
      return random.activity.biking();
    default:
      throw new Error(`Invalid event type: ${event}`);
  }
}
