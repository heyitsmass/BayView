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

export type MealTypes = "breakfast" | "lunch" | "dinner";
export interface Offer<T extends MealTypes = MealTypes> {
  offerId: string;
  time: string;
  label: T;
}

export interface MealPeriodInfo {
  name: string;
  experience: string;
  priceLegend: string;
  primaryCuisineType: string;
}

export interface Dining {
  mealPeriodInfo: MealPeriodInfo;
  priceRange: string;
  admissionRequired: boolean;
  offers: {
    [x: string]: Offer[];
  };
}

export type Reservable = Hotel | Flight | Dining;

export type Reservation<T extends Reservable = Reservable> = Event & T;

export type Activities =
  | Theatre
export type ShowTime = {
  date: Date;
  time: string;
};
export interface Theatre {
  play: string; // Name of the play currently running
  playwright: string; // Name of the playwright of the current play
  showTimes: ShowTime[]; // Schedule of show times for the play
  ticketPrice: number; // Cost of a ticket for the theatre
  theatreRating: number; // Rating of the theatre
  seatingCapacity: number; // Maximum seating capacity of the theatre
  isSoldOut: boolean; // Indicates whether the current play is sold out
  intervalDuration: string; // Duration of the intermission between acts
}

