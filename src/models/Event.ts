import {
  Activity,
  AmusementPark,
  Aquarium,
  Biking,
  Concert,
  Dining,
  Event,
  Flight,
  Golf,
  Hiking,
  Hotel,
  Museum,
  Nightlife,
  Park,
  Reservation,
  Shopping,
  Spa,
  Sports,
  Theatre,
  Waterpark,
  Zoo
} from '@/types/Event';

import mongoose, { Schema } from 'mongoose';

export const eventSchema = new Schema<Event>({
  name: String,
  date: Date,
  time: String || undefined,
  location: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  description: String
});

const reservationSchema = new Schema<Reservation<any>>({
  ...eventSchema.obj
});

const activitySchema = new Schema<Activity<any>>({
  ...eventSchema.obj
});

const EventModel =
  mongoose.models.Event || mongoose.model<Event>('Event', eventSchema);

const hotelSchema = new Schema<Reservation<Hotel>>({
  ...reservationSchema.obj,
  checkIn: Date,
  checkOut: Date,
  roomNumber: String || Number
});


const helperSchema = { 
  name: String,
  description: String,
  _id: false
};
const flightSchema = new Schema<Reservation<Flight>>({
  ...reservationSchema.obj,
  airport: {
    type: helperSchema,
    default: {}
  },
  airline: {
    type: helperSchema,
    default: {}
  },
  departureTime: Date,
  arrivalTime: Date,
  flightNumber: String,
  reservationNumber: String,
  seats: {
    type: [
      {
        row: Number,
        seat: String,
        _id: false
      }
    ],
    default: []
  },
  gate: String
});

const diningSchema = new Schema<Reservation<Dining>>({
  ...reservationSchema.obj,
  mealPeriodInfo: {
    name: String,
    experience: String,
    priceLegend: String,
    primaryCuisineType: String,
    _id: false
  },
  priceRange: String,
  admissionRequired: Boolean,
  offers: {
    type: Map,
    of: [
      {
        offerId: String,
        time: String,
        label: String,
        _id: false
      }
    ],
    default: {}
  }
});

const HotelModel =
  EventModel.discriminators?.Hotel ||
  EventModel.discriminator<Reservation<Hotel>>('Hotel', hotelSchema);

const FlightModel =
  EventModel.discriminators?.Flight ||
  EventModel.discriminator<Reservation<Flight>>('Flight', flightSchema);

const DiningModel =
  EventModel.discriminators?.Dining ||
  EventModel.discriminator<Reservation<Dining>>('Dining', diningSchema);

const theatreSchema = new Schema<Activity<Theatre>>({
  ...activitySchema.obj,
  play: String,
  playwright: String, // Name of the playwright of the current play
  showTimes: {
    type: [
      {
        date: Date,
        time: String,
        _id: false
      }
    ],
    default: []
  }, // Schedule of show times for the play
  ticketPrice: Number, // Cost of a ticket for the theatre
  theatreRating: Number, // Rating of the theatre
  seatingCapacity: Number, // Maximum seating capacity of the theatre
  isSoldOut: Boolean, // Indicates whether the current play is sold out
  intervalDuration: String // Duration of the intermission between acts
});

const TheatreModel =
  EventModel.discriminators?.Theatre ||
  EventModel.discriminator<Activity<Theatre>>('Theatre', theatreSchema);

const concertSchema = new Schema<Activity<Concert>>({
  ...activitySchema.obj,
  artist: String, // Name of the performing artist or band
  venue: String, // Name of the concert venue
  venueRating: Number, // Rating of the concert venue
  date: Date, // Date and time of the concert
  ticketPrice: Number, // Cost of a ticket for the concert
  attendees: Number, // Number of people attending the concert
  setList: [String], // List of songs or pieces that will be performed
  isSoldOut: Boolean, // Indicates whether the concert is sold out
  departureLocation: String, // Location where the trip to the concert starts
  transportationMode: String // Mode of transportation (e.g., car, public transit)
});

const ConcertModel =
  EventModel.discriminators?.Concert ||
  EventModel.discriminator<Activity<Concert>>('Concert', concertSchema);

const museumSchema = new Schema<Activity<Museum>>({
  ...activitySchema.obj,
  exhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  admissionFee: Number,
  openingHours: String,
  specialEvents: {
    type: [
      {
        name: String,
        description: String,
        date: Date,
        time: String,
        _id: false
      }
    ],
    default: []
  }, // List of special events or exhibitions
  guidedTours: Boolean, // Indicates whether guided tours are available
  audioGuide: Boolean // Indicates whether audio guides are available
});

const MuseumModel =
  EventModel.discriminators?.Museum ||
  EventModel.discriminator<Activity<Museum>>('Museum', museumSchema);

const parkSchema = new Schema<Activity<Park>>({
  ...activitySchema.obj,
  activities: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // List of activities available in the park (e.g., hiking, biking, swimming)
  openingHours: String,
  facilities: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // List of facilities available in the park (e.g., picnic areas, playgrounds)
  naturalFeatures: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  }, // Features like lakes, trails, etc.
  wildlife: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  } // Types of wildlife commonly found in the park
  // ... (other park-specific properties)
});

const ParkModel =
  EventModel.discriminators?.Park ||
  EventModel.discriminator<Activity<Park>>('Park', parkSchema);

const zooSchema = new Schema<Activity<Zoo>>({
  ...activitySchema.obj,
  feedingSchedule: {
    type: [
      {
        name: String,
        time: String,
        _id: false
      }
    ],
    default: []
  },
  interactiveExperiences: {
    type: [
      {
        name: String,
        time: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  conservationPrograms: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  openingHours: String,
  animalExhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  admissionFee: Number
});

const ZooModel =
  EventModel.discriminators?.Zoo ||
  EventModel.discriminator<Activity<Zoo>>('Zoo', zooSchema);

const aquariumSchema = new Schema<Activity<Aquarium>>({
  ...activitySchema.obj,
  exhibits: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  admissionFee: Number,
  openingHours: String,
  underwaterTunnel: Boolean, // Indicates whether there's an underwater tunnel for visitors
  touchPools: Boolean, // Indicates whether there are touch pools for interactive experiences
  showSchedule: {
    type: [
      {
        date: Date,
        time: String,
        _id: false
      }
    ],
    default: []
  } // Schedule for shows and presentations
});

const AquariumModel =
  EventModel.discriminators?.Aquarium ||
  EventModel.discriminator<Activity<Aquarium>>('Aquarium', aquariumSchema);

const waterparkSchema = new Schema<Activity<Waterpark>>({
  ...activitySchema.obj,
  attractions: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  waterSlides: {
    type: [
      {
        name: String,
        description: String,
        _id: false
      }
    ],
    default: []
  },
  openingHours: String,
  admissionFee: Number,
  wavePool: Boolean, // Indicates whether there's a wave pool
  lazyRiver: Boolean // Indicates whether there's a lazy river
});

const WaterparkModel =
  EventModel.discriminators?.Waterpark ||
  EventModel.discriminator<Activity<Waterpark>>('Waterpark', waterparkSchema);

const sportsSchema = new Schema<Activity<Sports>>({
  ...activitySchema.obj,
  type: String,
  event: String,
  teams: [String],
  stadiumName: String,
  stadiumCapacity: Number,
  broadcastingChannels: [String]
});

const SportsModel =
  EventModel.discriminators?.Sports ||
  EventModel.discriminator<Activity<Sports>>('Sports', sportsSchema);

const nightlifeSchema = new Schema<Activity<Nightlife>>({
  ...activitySchema.obj,
  venue: String,
  type: String,
  openingHours: String,
  dressCode: String,
  ageRestriction: Number,
  coverCharge: Number,
  livePerformances: Boolean,
  music: [String],
  drinks: [String],
  food: [String],
  atmosphere: String
});

const NightlifeModel =
  EventModel.discriminators?.Nightlife ||
  EventModel.discriminator<Activity<Nightlife>>('Nightlife', nightlifeSchema);

const shoppingSchema = new Schema<Activity<Shopping>>({
  ...activitySchema.obj,
  mall: String,
  stores: [String],
  openingHours: String,
  salesAndDeals: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false
      }
    ],
    default: []
  },
  diningOptions: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false
      }
    ],
    default: []
  },
  customerReviews: {
    type: Map,
    of: {
      store: String,
      comment: String,
      rating: Number,
      _id: false
    },
    default: {}
  },
  shoppingBudget: Number
});

const ShoppingModel =
  EventModel.discriminators?.Shopping ||
  EventModel.discriminator<Activity<Shopping>>('Shopping', shoppingSchema);

const spaSchema = new Schema<Activity<Spa>>({
  ...activitySchema.obj,
  spaRating: Number,
  services: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  openingHours: String,
  spaPackages: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  wellnessClasses: {
    type: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  bookingPolicy: String
});

const SpaModel =
  EventModel.discriminators?.Spa ||
  EventModel.discriminator<Activity<Spa>>('Spa', spaSchema);

const golfSchema = new Schema<Activity<Golf>>({
  ...activitySchema.obj,
  course: String,
  holes: Number,
  teeTimes: {
    type: [
      {
        date: Date,
        time: String,
        price: Number,
        _id: false
      }
    ],
    default: []
  },
  golfCartRental: Boolean,
  golfClubRental: Boolean,
  golfLessons: Boolean,
  courseDescription: String,
  courseDifficulty: String
});

const GolfModel =
  EventModel.discriminators?.Golf ||
  EventModel.discriminator<Activity<Golf>>('Golf', golfSchema);

const hikingSchema = new Schema<Activity<Hiking>>({
  ...activitySchema.obj,
  trail: String,
  difficulty: String,
  length: Number,
  rating: Number,
  distance: Number,
  startingPoint: String,
  elevationGain: Number,
  recommendedGear: [String],
  pointsOfInterest: [String],
  campingOptions: Boolean
});

const HikingModel =
  EventModel.discriminators?.Hiking ||
  EventModel.discriminator<Activity<Hiking>>('Hiking', hikingSchema);

const bikingSchema = new Schema<Activity<Biking>>({
  ...activitySchema.obj,
  ...hikingSchema.obj
});

const BikingModel =
  EventModel.discriminators?.Biking ||
  EventModel.discriminator<Activity<Biking>>('Biking', bikingSchema);

const amusementParkSchema = new Schema<Activity<AmusementPark>>({
  rides: [String],
  admissionFee: Number,
  openingHours: String,
  rollerCoasters: [String],
  themedAreas: [String],
  waterRides: [String],
  heightRestrictions: {
    type: Map,
    of: Number,
    default: {}
  }
});

const AmusementParkModel =
  EventModel.discriminators?.AmusementPark ||
  EventModel.discriminator<Activity<AmusementPark>>(
    'AmusementPark',
    amusementParkSchema
  );

export {
  AmusementParkModel,
  AquariumModel,
  BikingModel,
  ConcertModel,
  DiningModel,
  EventModel,
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
