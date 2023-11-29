export type Location = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type Event<T = Activities | Reservable> = {
  date: Date;
  name: string;
  time?: string;
  location: Location;
  description?: string;
  picture_url: string;
  partySize: number;
} & T;

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
  currentUpgrade: string;
  currentPrice: number;
  reservationNumber: string;
  seats: AirlineSeat[];
  gate: string;
}

export interface Hotel {
  cabinType: {
    name: string;
    description: string;
  };
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
  | Concert
  | Museum
  | Park
  | Zoo
  | Aquarium
  | Waterpark
  | AmusementPark
  | Sports
  | Nightlife
  | Shopping
  | Spa
  | Golf
  | Hiking
  | Biking;

export type EventTypes =
  | "Hotel"
  | "Flight"
  | "Dining"
  | "Theatre"
  | "Concert"
  | "Museum"
  | "Park"
  | "Zoo"
  | "Aquarium"
  | "Waterpark"
  | "AmusementPark"
  | "Sports"
  | "Nightlife"
  | "Shopping"
  | "Spa"
  | "Golf"
  | "Hiking"
  | "Biking";

export type Activity<T extends Activities = Activities> = Event & T;

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

export interface Concert {
  artist: string; // Name of the performing artist or band
  venue: string; // Name of the concert venue
  venueRating: number; // Rating of the concert venue
  date: Date; // Date and time of the concert
  ticketPrice: number; // Cost of a ticket for the concert
  attendees: number; // Number of people attending the concert
  setList: string[]; // List of songs or pieces that will be performed
  isSoldOut: boolean; // Indicates whether the concert is sold out
  departureLocation: string; // Location where the trip to the concert starts
  transportationMode: string; // Mode of transportation (e.g., car, public transit)
}

type Exhibit = {
  name: string;
  description: string;
};

type SpecialEvent = {
  name: string;
  description: string;
  date: Date;
  time: string;
};
export interface Museum {
  exhibits: Exhibit[];
  admissionFee: number;
  openingHours: string;
  specialEvents: SpecialEvent[]; // List of special events or exhibitions
  guidedTours: boolean; // Indicates whether guided tours are available
  audioGuide: boolean; // Indicates whether audio guides are available
  // ... (other museum-specific properties)
}

type Wildlife = {
  name: string;
  description: string;
};

type NaturalFeature = {
  name: string;
  description: string;
};

type Facility = {
  name: string;
  description: string;
};

export interface Park {
  activities: {
    name: string;
    description: string;
  }[];
  openingHours: string;
  facilities: Facility[]; // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: NaturalFeature[]; // Features like lakes, trails, etc.
  wildlife: Wildlife[]; // Types of wildlife commonly found in the park
  // ... (other park-specific properties)
}

type FeedingSchedule = {
  name: string;
  time: string;
};

type InteractiveExperience = {
  name: string;
  time: string;
  description: string;
};

type ConvservationProgram = {
  name: string;
  description: string;
};

export interface Zoo {
  animalExhibits: Exhibit[];
  admissionFee: number;
  openingHours: string;
  feedingSchedule: FeedingSchedule[]; // Schedule for animal feeding sessions
  interactiveExperiences: InteractiveExperience[]; // Interactive activities for visitors
  conservationPrograms: ConvservationProgram[]; // Information about zoo's conservation programs
  // ... (other zoo-specific properties)
}

export interface Aquarium {
  exhibits: Exhibit[];
  admissionFee: number;
  openingHours: string;
  underwaterTunnel: boolean; // Indicates whether there's an underwater tunnel for visitors
  touchPools: boolean; // Indicates whether there are touch pools for interactive experiences
  showSchedule: ShowTime[]; // Schedule for shows and presentations
  // ... (other aquarium-specific properties)
}

type WaterparkAttraction = {
  name: string;
  description: string;
};

type Waterslide = {
  name: string;
  description: string;
};

export interface Waterpark {
  attractions: WaterparkAttraction[];
  admissionFee: number;
  openingHours: string;
  wavePool: boolean; // Indicates whether there's a wave pool
  lazyRiver: boolean; // Indicates whether there's a lazy river
  waterSlides: Waterslide[]; // Different types of water slides available
  // ... (other waterpark-specific properties)
}

export interface AmusementPark {
  rides: string[];
  admissionFee: number;
  openingHours: string;
  rollerCoasters: string[]; // Different types of roller coasters available
  themedAreas: string[]; // Themed sections within the amusement park
  heightRestrictions: Record<string, number>; // Height restrictions for certain rides
  waterRides: string[];
  // ... (other amusement park-specific properties)
}

export interface Sports<T extends SportEvents = SportEvents> {
  type: T;
  event: string;
  teams: string[];
  stadiumName: string;
  ticketPrice: number;
  stadiumCapacity: number; // Capacity of the sports stadium
  broadcastingChannels: string[]; // TV channels broadcasting the event
  // ... (other sports-specific properties)
}

export type SportEvents =
  | "Football"
  | "Baseball"
  | "Basketball"
  | "Hockey"
  | "Soccer"
  | "Tennis";

export interface Nightlife {
  venue: string;
  type: string;
  openingHours: string;
  dressCode: string;
  ageRestriction: number; // Minimum age required for entry
  livePerformances: boolean; // Indicates whether there are live performances
  coverCharge: number; // Cover charge for entry
  music: string[]; // Types of music played at the venue
  drinks: string[]; // Types of drinks available at the venue
  food: string[]; // Types of food available at the venue
  atmosphere: string; // Atmosphere of the venue (e.g., casual, upscale)

  // ... (other nightlife-specific properties)
}

type Deal = {
  name: string;
  description: string;
};

type Sale = Deal & {
  date: Date;
};

type Review = {
  store: string;
  comment: string;
  rating: number;
};

type DiningOptions = {
  name: string;
  description: string;
};
export interface Shopping {
  mall: string;
  stores: string[];
  openingHours: string;
  salesAndDeals: (Deal | Sale)[]; // Information about ongoing sales or deals
  diningOptions: DiningOptions[]; // Restaurants or food courts in the mall
  customerReviews: {
    [x: string]: Review;
  }; // Customer reviews for the mall or specific stores
  shoppingBudget: number; // Maximum amount of money to spend on shopping
  // ... (other shopping-specific properties)
}

type SpaPackage = {
  name: string;
  price: number;
};

type WellnessClass = SpaPackage;
type Service = SpaPackage;
export interface Spa {
  spaRating: number;
  services: Service[];
  openingHours: string;
  spaPackages: SpaPackage[]; // Different spa packages offered
  wellnessClasses: WellnessClass[]; // Classes or workshops related to wellness
  bookingPolicy: string; // Information about booking policies
  // ... (other spa-specific properties)
}

type TeeTime = {
  date: Date;
  time: string;
  price: number;
};
export interface Golf {
  course: string;
  holes: number;
  teeTimes: TeeTime[];
  golfCartRental: boolean; // Indicates whether golf carts are available for rent
  golfClubRental: boolean; // Indicates whether golf clubs are available for rent
  golfLessons: boolean; // Indicates whether golf lessons are offered
  courseDifficulty: string; // Difficulty level of the golf course
  courseDescription: string; // Description of the golf course
  // ... (other golf-specific properties)
}

export type Difficulty =
  | "Easy"
  | "Moderate"
  | "Difficult"
  | "Extreme"
  | "Expert";

export interface Hiking {
  trail: string; // Name of the hiking trail
  difficulty: Difficulty; // Difficulty level of the trail (e.g., easy, moderate, difficult)
  length: number; // Length of the hiking trail in kilometers
  rating: number; // Rating of the hiking trail
  distance: number; // Length of the hiking trail in kilometers
  startingPoint: string; // Starting point or trailhead of the hiking route
  elevationGain: number; // Total elevation gain on the hiking trail
  recommendedGear: string[]; // Recommended gear for hiking (e.g., hiking boots, backpack)
  pointsOfInterest: string[]; // Notable points of interest along the hiking trail
  campingOptions: boolean; // Indicates whether there are camping options along the trail
  // ... (other hiking-specific properties)
}

export interface Biking extends Hiking {}
