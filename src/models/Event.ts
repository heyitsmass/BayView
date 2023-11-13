  Concert,
  Dining,
  Flight,
  Hotel,
  Museum,
  Park,
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

  ConcertModel,
  DiningModel,
  FlightModel,
  MuseumModel,
  ParkModel,
  TheatreModel,
