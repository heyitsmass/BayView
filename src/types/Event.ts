export interface Event {
  eventType: string;
  date: Date;
  name: string;
  time: string;
  location: string;
  description?: string;
}

export type Airport = {
  name: string;
  iataCode: string;
};

export type Airline = {
  name: string;
  iataCode: string;
};

type AirlineSeat = {
  row: number;
  seat: string;
};
export interface Flight {
  airport: Airport;
  airline: Airline;
  departureTime: Date;
  arrivalTime: Date;
  flightNumber: number;
  reservationNumber: string;
  seats: AirlineSeat[];
  gate: string;
}

export interface Hotel {
  checkIn: Date;
  checkOut: Date;
  roomNumber: string | number;
}
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
