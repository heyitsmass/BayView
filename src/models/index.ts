import { AmusementParkModel } from "./Event/Activity/AmusementPark";

import { AquariumModel } from "./Event/Activity/Aquarium";

import { BikingModel } from "./Event/Activity/Biking";

import { ConcertModel } from "./Event/Activity/Concert";

import { DiningModel } from "./Event/Reservation/Dining";

import { FlightModel } from "./Event/Reservation/Flight";

import { GolfModel } from "./Event/Activity/Golf";

import { HikingModel } from "./Event/Activity/Hiking";

import { HotelModel } from "./Event/Reservation/Hotel";

import { MuseumModel } from "./Event/Activity/Museum";

import { NightlifeModel } from "./Event/Activity/Nightlife";

import { ParkModel } from "./Event/Activity/Park";

import { ShoppingModel } from "./Event/Activity/Shopping";

import { SpaModel } from "./Event/Activity/Spa";

import { SportsModel } from "./Event/Activity/Sports";

import { TheatreModel } from "./Event/Activity/Theatre";

import { WaterparkModel } from "./Event/Activity/Waterpark";

import { ZooModel } from "./Event/Activity/Zoo";

const models = {
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

export {
  models,
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
};
