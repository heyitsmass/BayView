  Flight,
  Hotel,
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

    _id: false
const HotelModel =
  EventModel.discriminators?.Hotel ||
  EventModel.discriminator<Reservation<Hotel>>('Hotel', hotelSchema);

const FlightModel =
  EventModel.discriminators?.Flight ||
  EventModel.discriminator<Reservation<Flight>>('Flight', flightSchema);


const Events =
  mongoose.models?.Events || mongoose.model("Events", eventSchema);

const Flights =
  Events.discriminators?.Flight ||
  Events.discriminator<Flight>("Flight", flightSchema);

const Hotels =
  Events.discriminators?.Hotel ||
  Events.discriminator<Hotel>("Hotel", hotelSchema);

const Reservations =
  Events.discriminators?.Reservation ||
  Events.discriminator<Reservation>("Reservation", reservationSchema);

  FlightModel,
