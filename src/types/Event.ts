import { Offer as DuffelOffer } from "@duffel/api/types";
import { TActivityQuery } from "./query";

export type TLocationType = {
  /** */
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
};

export type Event<T = Activities | Reservable> = {
  date: Date;
  name: string;
  location: TLocationType;
  description?: string;
  picture_url: string;
  party: string[];
} & T;

export type TFlightOffer = {
  id: string;
  offer: DuffelOffer & {
    total_duration: number;
  };
};
export interface Flight {
  departingFlight: TFlightOffer;
  returnFlight: TFlightOffer;
}

export const CabinType = [
  "Single",
  "Double",
  "Triple",
  "Quad",
  "Queen",
  "King",
  "Suite"
] as const;

export type TCabinType = (typeof CabinType)[number];

export interface Hotel {
  cabinType: string;
  roomCount: number;
  price: number;
  checkIn: Date;
  checkOut: Date;
  roomNumber: string | number;
}

export const MealType = ["Breakfast", "Lunch", "Dinner"] as const;

export type MealTypes = (typeof MealType)[number];
export interface Offer<T extends MealTypes = MealTypes> {
  id: string;
  time: string;
  label: T;
}

export interface MealPeriodInfo {
  name: string;
  experience: string;
  price: number;
  cuisine: string;
}

export interface Dining {
  mealPeriodInfo: MealPeriodInfo;
  priceRange: string;
  mealOffer: Offer;
}

export type Reservable = Hotel | Flight | Dining;

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

export const ReservationType = [
  "Hotel", //reservation
  "Flight", //reservation
  "Dining" //reservation
] as const;

export type TReservationType = (typeof ReservationType)[number];
export type TReservation = Hotel | Flight | Dining;

export const EntertainmentType = [
  "Theatre", //entertainment
  "Concert", //entertainment
  "Sports", //entertainment
  "Nightlife", //entertainment
  "Shopping" //entertainment
] as const;

export type TEntertainmentType = (typeof EntertainmentType)[number];
export type TEntertainment =
  | Theatre
  | Concert
  | Sports
  | Nightlife
  | Shopping;
export const RelaxationType = [
  "Spa", //Relaxation
  "Museum", //Relaxation
  "Park" //Relaxation
] as const;

export type TRelaxationType = (typeof RelaxationType)[number];
export type TRelaxation = Spa | Museum | Park;
export const OutdoorType = [
  "Golf", //Outdoor
  "Hiking", //Outdoor
  "Biking" //Outdoor
] as const;

export type TOutdoorType = (typeof OutdoorType)[number];
export type TOutdoor = Golf | Hiking | Biking;
export const ExperienceType = [
  "Zoo", //Experience
  "Aquarium", //Experience
  "Waterpark", //Experience
  "AmusementPark" //Experience
] as const;

export type TExperienceType = (typeof ExperienceType)[number];
export type TExperience = Zoo | Aquarium | Waterpark | AmusementPark;

const EventType = [
  ...RelaxationType,
  ...OutdoorType,
  ...ExperienceType,
  ...EntertainmentType,
  ...ReservationType
] as const;

export type TEventType = (typeof EventType)[number];
export type TEvent =
  | TEntertainment
  | TExperience
  | TRelaxation
  | TOutdoor
  | TReservation;

export const ActivityGroup = [
  "Relaxation",
  "Outdoor",
  "Experience",
  "Entertainment",
  "Reservation"
] as const;

export type TActivityGroup = (typeof ActivityGroup)[number];

export type TActivitySubType<T extends TActivityGroup> = T extends "Sports"
  ? TSportEvent
  : undefined;

export type TEventQuery<
  G extends TActivityGroup = TActivityGroup,
  T extends TEventType = TEventType
> = {
  activity: G;
  subtype?: T extends "Sports" ? TSportEvent : undefined;
} & TActivityQuery<G, T>;

const TerrainType = [
  "Gravel",
  "Dirt",
  "Paved",
  "Rocky",
  "Sandy",
  "Wet"
] as const;

export type TTerrainType = (typeof TerrainType)[number];

export const CuisineTypes = [
  "American",
  "Chinese",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Mexican",
  "Spanish",
  "Thai",
  "Vietnamese"
] as const;

export type TCuisineType = (typeof CuisineTypes)[number];

export type Activity<T extends Activities = Activities> = Event & T;

export type ShowTime = {
  date: Date;
  time: string;
};

export const TheatreSeatType = [
  "Orchestra",
  "Mezzanine",
  "Balcony",
  "Box",
  "Loge",
  "Dress Circle",
  "Pit",
  "Gallery"
] as const;

export type TTheatreSeatType = (typeof TheatreSeatType)[number];
export interface Theatre {
  venue: string; // Name of the theatre
  play: string; // Name of the play currently running
  playwright: string; // Name of the playwright of the current play
  showTimes: ShowTime[]; // Schedule of show times for the play
  ticketPrice: number; // Cost of a ticket for the theatre
  theatreRating: number; // Rating of the theatre
  seatType: TTheatreSeatType; // Type of seat (e.g., orchestra, mezzanine)
  intervalDuration: string; // Duration of the intermission between acts
}

export interface Concert {
  artist: string; // Name of the performing artist or band
  venue: string; // Name of the concert venue
  concert: string; // Name of the concert
  venueRating: number; // Rating of the concert venue
  date: Date; // Date and time of the concert
  ticketPrice: number; // Cost of a ticket for the concert
  attendees: number; // Number of people attending the concert
  setList: string[]; // List of songs or pieces that will be performed
  seatType: TSeatType; // Type of seat (e.g., general admission, reserved seating)
}

type Exhibit = {
  name: string;
  description: string;
  date: Date;
};

type SpecialEvent = {
  name: string;
  description: string;
  date: Date;
};
export interface Museum {
  museum: string;
  exhibit: Exhibit;
  admissionFee: number;
  openingHours: string;
  specialEvent: SpecialEvent; // List of special events or exhibitions
  guidedTours: boolean; // Indicates whether guided tours are available
  audioGuide: boolean; // Indicates whether audio guides are available
  // ... (other museum-specific properties)
}

export interface Park {
  parkName: string;
  activities: string[];
  openingHours: string;
  facilities: string[]; // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: string[]; // Features like lakes, trails, etc.
  wildlife: string[]; // Types of wildlife commonly found in the park
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

export interface Zoo {
  zoo: string;
  exhibit: Exhibit;
  admissionFee: number;
  openingHours: string;
  feedingSchedule: FeedingSchedule; // Schedule for animal feeding sessions
  interactiveExperience: InteractiveExperience; // Interactive activities for visitors
  // ... (other zoo-specific properties)
}

export interface Aquarium {
  aquarium: string;
  exhibit: Exhibit;
  admissionFee: number;
  openingHours: string;
  underwaterTunnel: boolean; // Indicates whether there's an underwater tunnel for visitors
  touchPools: boolean; // Indicates whether there are touch pools for interactive experiences
  showSchedule: ShowTime; // Schedule for shows and presentations
  interactiveExperience: InteractiveExperience; // Interactive activities for visitors
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
  parkName: string;
  attractions: string[];
  mainAttraction: WaterparkAttraction; // Main attraction of the waterpark
  admissionFee: number;
  openingHours: string;
  wavePool: boolean; // Indicates whether there's a wave pool
  lazyRiver: boolean; // Indicates whether there's a lazy river
  waterSlides: string[]; // Different types of water slides available
  mainWaterslide: Waterslide; // Main waterslide of the waterpark
  // ... (other waterpark-specific properties)
}

export interface AmusementPark {
  parkName: string;
  rides: string[];
  admissionFee: number;
  openingHours: string;
  rollerCoaster: string; // Different types of roller coasters available
  heightRestriction: Record<string, number>; // Height restrictions for certain rides
  waterRide: string;
  // ... (other amusement park-specific properties)
}

export const SeatType = [
  "GA",
  "Reserved",
  "Standing",
  "VIP",
  "Box",
  "Premium",
  "Accessible"
];

export type TSeatType = (typeof SeatType)[number];

export interface Sports<T extends TSportEvent = TSportEvent> {
  type: T;
  event: string;
  teams: string[];
  stadiumName: string;
  ticketPrice: number;
  seatType: TSeatType;
  broadcastingChannels: string[]; // TV channels broadcasting the event
  // ... (other sports-specific properties)
}

const SportEvent = [
  "Football",
  "Baseball",
  "Basketball",
  "Hockey",
  "Soccer",
  "Tennis"
] as const;

export type TSportEvent = (typeof SportEvent)[number];

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
  discount: string;
};

export type Review = {
  store: string;
  comment: string;
  rating: number;
};

export const MallType = [
  "Regional Mall",
  "Super-Regional Mall",
  "Outlet Mall",
  "Lifestyle Center",
  "Strip Mall/Plaza",
  "Power Center",
  "Specialty Mall",
  "Fashion Mall",
  "Entertainment Center",
  "Mixed-Use Development"
] as const;

export type TMallType = (typeof MallType)[number];

export interface Shopping {
  mall: string;
  store: string;
  openingHours: string;
  kind: TMallType;
  sale: Sale; // Information about ongoing sales or deals
  deal: Deal; // Information about ongoing sales or deals
  customerReviews: {
    [x: string]: Review;
  }; // Customer reviews for the mall or specific stores
  shoppingBudget?: number; // Maximum amount of money to spend on shopping
  // ... (other shopping-specific properties)
}

type SpaPackage = {
  name: string;
  price: number;
};

type WellnessClass = SpaPackage;
type Service = SpaPackage;
export interface Spa {
  date: Date;
  spaName: string;
  spaRating: number;
  service: Service;
  openingHours: string;
  spaPackage: SpaPackage; // Different spa packages offered
  wellnessClass: WellnessClass; // Classes or workshops related to wellness
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
  teeTime: TeeTime;
  golfCartRental: boolean; // Indicates whether golf carts are available for rent
  golfClubRental: boolean; // Indicates whether golf clubs are available for rent
  golfLessons: boolean; // Indicates whether golf lessons are offered
  courseDifficulty: string; // Difficulty level of the golf course
  courseDescription: string; // Description of the golf course

  // ... (other golf-specific properties)
}

export const GolfHoles = ["9", "18"] as const;

export const Difficulty = [
  "Easy",
  "Moderate",
  "Difficult",
  "Extreme",
  "Expert"
] as const;

export type TDifficultyType = (typeof Difficulty)[number];

export interface Hiking {
  trail: string; // Name of the hiking trail
  difficulty: TDifficultyType; // Difficulty level of the trail (e.g., easy, moderate, difficult)
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
