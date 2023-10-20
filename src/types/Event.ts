export interface Event {
  eventType: string;
  date: Date;
  name: string;
  time: string;
  location: string;
  description?: string;
}

export interface Flight extends Event {
  airline: string;
  flightNumber: string;
  gate: string;
}

export interface Hotel extends Event {
  hotelName: string;
  roomNumber: string;
}

export interface Reservation<T extends Hotel | Flight = Hotel | Flight>
  extends Event {
  reservationName: string;
  reservationType: string; //hotel, flight, restaurant, etc...
  reservationNumber?: string;
  reservationData: T;
}

export type ActivityTypes =
  | "attraction"
  | "fireworks"
  | "restaurant"
  | "entertainment";

export interface Activity extends Event {
  activityName: string;
  activityType: ActivityTypes; //attraction, fireworks, restaurant, entertainment
  activitySubtype: string; //indoor, outdoor, waterpark, etc...
}
