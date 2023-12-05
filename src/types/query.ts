import {
  MealTypes,
  TActivityGroup,
  TCabinType,
  TCuisineType,
  TDifficultyType,
  TEntertainmentType,
  TEventType,
  TExperienceType,
  TMallType,
  TOutdoorType,
  TRelaxationType,
  TReservationType,
  TSportEvent,
  TTerrainType
} from "./Event";

/** Flight */

export type TFlightQuery = {
  departingFrom: string;
  arrivingTo: string;
  departureDate: Date;
  returnDate: Date;
  cabinType: string;
  passengerCount: number;
};

/** Hotel */

export type THotelQuery = {
  checkIn: Date;
  checkOut: Date;
  cabinType?: TCabinType;
  partySize: number;
  roomCount: number;
  priceRange: number;
  ageRange?: number;
};

/** Dining */

export type TDiningQuery = {
  /** The date of the reservation */
  date: Date;
  /** The price range to search for */
  priceRange: number;
  /** The party size */
  partySize: number;
  /** The type of meal to search for */
  mealType: MealTypes;
  /** The cuisine type to search for */
  cuisineType?: TCuisineType;
  /** The specific restaurant to search for */
  restaurant?: string;
};

/** Experience */

export type TZooQuery = {
  date: Date;
  priceRange: number;
  partySize: number;
  exhibit?: string;
  experience?: string;
};

export type TAquariumQuery = {
  date: Date;
  priceRange: number;
  exhibit?: string;
  experience?: string;
};

export const Rides = [
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
] as const;

export const RollerCoasters = [
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
] as const;

export const themedAreas = [
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
] as const;

export const WaterRides = [
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
] as const;

export type TWaterParkQuery = {
  date: Date;
  priceRange: number;
  partySize: number;
  waterPark?: string;
  attraction?: string;
  waterslide?: string;
};

export type TAmusementParkQuery = {
  date: Date;
  priceRange: number;
  partySize: number;
  amusementPark?: string;
  attraction?: string;
  waterride?: string;
};

/** Entertainment */

export type TTheatreQuery = {
  date: Date;
  priceRange: string;
  partySize: number;
  seatType: string;
  play?: string;
  playwright?: number;
};

export type TConcertQuery = {
  date: Date;
  artist?: string;
  priceRange: string;
  partySize: number;
  seatType: string;
};

export type TSportsQuery<T extends TSportEvent> = {
  date: Date;
  priceRange: string;
  partySize: number;
  seatType: string;
  team?: string;
  sport?: T;
};

export type TNightlifeQuery = {
  date: Date;
  dressCode: string;
  priceRange: string;
  partySize: number;
  atmosphere: string;
  club?: string;
};

export type TShoppingQuery = {
  location?: string;
  priceRange: string;
  mallType: TMallType;
};
/** Relaxation */

export type TSpaQuery = {
  date: Date;
  priceRange: string;
  partySize: number;
  spa?: string;
  service?: string;
  spaPackage?: string;
};

export type TMuseumQuery = {
  date: Date;
  priceRange: string;
  partySize: number;
  museum?: string;
  ageRange?: number;
  exhibit?: string;
};

export type TParkQuery = {
  // finds local parks
};

/** Outdoor */

export type TGolfQuery = {
  date: Date;
  priceRange: string;
  partySize: number;
  difficulty: TDifficultyType;
  course?: string;
  holes: 9 | 18;
};

export type THikingQuery = {
  difficulty: TDifficultyType;
  trail?: string;
  length: number;
  elevationGain: number;
  terrain?: TTerrainType;
};

export type TBikingQuery = THikingQuery;

export type TOutdoorQuery<T extends TOutdoorType> = T extends "Golf"
  ? TGolfQuery
  : T extends "Hiking"
  ? THikingQuery
  : T extends "Biking"
  ? TBikingQuery
  : never;

export type TExperienceQuery<T extends TExperienceType> =
  T extends "Zoo"
    ? TZooQuery
    : T extends "Aquarium"
    ? TAquariumQuery
    : T extends "Waterpark"
    ? TWaterParkQuery
    : T extends "AmusementPark"
    ? TAmusementParkQuery
    : never;

export type TEntertainmentQuery<
  Q extends TEntertainmentType,
  T extends TSportEvent
> = Q extends "Theatre"
  ? TTheatreQuery
  : Q extends "Concert"
  ? TConcertQuery
  : Q extends "Sports"
  ? TSportsQuery<T>
  : Q extends "Nightlife"
  ? TNightlifeQuery
  : Q extends "Shopping"
  ? TShoppingQuery
  : never;

export type TRelaxationQuery<T extends TRelaxationType> =
  T extends "Spa"
    ? TSpaQuery
    : T extends "Museum"
    ? TMuseumQuery
    : T extends "Park"
    ? TParkQuery
    : never;

export type TReservationQuery<T extends TReservationType> =
  T extends "Dining"
    ? TDiningQuery
    : T extends "Hotel"
    ? THotelQuery
    : T extends "Flight"
    ? TFlightQuery
    : never;

type TActivityMap<T extends TActivityGroup> = T extends "Reservation"
  ? TReservationType
  : T extends "Experience"
  ? TExperienceType
  : T extends "Entertainment"
  ? TEntertainmentType
  : T extends "Relaxation"
  ? TRelaxationType
  : T extends "Outdoor"
  ? TOutdoorType
  : never;

export type TActivityQuery<
  G extends TActivityGroup,
  T extends TEventType
> = {
  type: TActivityMap<G>;
  params: G extends "Reservation"
    ? TReservationQuery<TReservationType>
    : G extends "Experience"
    ? TExperienceQuery<TExperienceType>
    : G extends "Entertainment"
    ? TEntertainmentQuery<TEntertainmentType, TSportEvent>
    : G extends "Relaxation"
    ? TRelaxationQuery<TRelaxationType>
    : G extends "Outdoor"
    ? TOutdoorQuery<TOutdoorType>
    : never;
};
