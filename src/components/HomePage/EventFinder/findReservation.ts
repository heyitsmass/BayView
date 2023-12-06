"use server";

import {
  CuisineTypes,
  Dining,
  Flight,
  Hotel,
  MealType,
  TEventQuery,
  TReservation
} from "@/types/Event";
import { TDiningQuery, TFlightQuery, THotelQuery } from "@/types/query";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { getRandom } from "./utils";

export const findReservation = async ({
  ...props
}: TEventQuery<"Reservation">): Promise<TReservation[] | null> => {
  const { type: mode, params } = props;
  switch (mode) {
    case "Dining":
      return findDining(params as TDiningQuery);
    case "Hotel":
      return findHotel(params as THotelQuery);
    case "Flight":
      return findFlight(params as TFlightQuery);
    default:
      return null;
  }
};

const diners = [
  "The Hungry Fox",
  "Savor and Spice",
  "Taste of Tuscany",
  "Mama Mia's Kitchen",
  "Fusion Bistro",
  "The Rustic Table",
  "Harborview Grill",
  "Culinary Delights",
  "The Golden Spoon",
  "Urban Flavors",
  "Café Soleil",
  "Bella Vista Trattoria",
  "Gourmet Garden",
  "The Secret Ingredient",
  "Flamingo Lounge",
  "Fresh and Savory",
  "Sushi Heaven",
  "The Twisted Fork",
  "Riverside Café",
  "The Cozy Corner"
];

const findDining = async ({
  ...params
}: TDiningQuery): Promise<Dining[]> => {
  const { date, priceRange, partySize, mealType, cuisineType, restaurant } =
    params;

  let price = priceRange === 0?  9999 : priceRange; 

  const getResult = () => {
    return {
      name: restaurant || getRandom(diners),
      mealPeriodInfo: {
        name: mealType || getRandom(MealType),
        experience: faker.lorem.sentence(),
        price: faker.number.int({ min: 0, max: price }) * partySize,
        cuisine: cuisineType || getRandom(CuisineTypes)
      },
      priceRange: price < 40 ? "$" : price < 80 ? "$$" : "$$$",
      mealOffer: {
        id: faker.string.uuid(),
        time: faker.date
          .soon({
            refDate: date,
            days: 1
          })
          .toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          }),
        label: mealType
      }
    } as Dining;
  };

  return Array.from({ length: randomInt(18) }, getResult).sort((a, b) =>
    a.mealOffer.time.localeCompare(b.mealOffer.time)
  );
};

const cabinTypes = [
  "Single",
  "Double",
  "Triple",
  "Quad",
  "Queen",
  "King",
  "Suite"
];

const hotels = [
  "Grand Hyatt",
  "Marriott Marquis",
  "Hilton Garden Inn",
  "Four Seasons",
  "Ritz-Carlton",
  "Sheraton",
  "InterContinental",
  "Waldorf Astoria",
  "Fairmont",
  "Hyatt Regency",
  "Omni Hotels & Resorts",
  "Westin",
  "JW Marriott",
  "Radisson Blu",
  "Mandarin Oriental",
  "Park Hyatt",
  "St. Regis",
  "Loews Hotels",
  "Ace Hotel",
  "Kimpton Hotels & Restaurants"
];

const findHotel = async ({ ...params }: THotelQuery): Promise<Hotel[]> => {
  const {
    checkIn,
    checkOut,
    roomCount,
    partySize,
    cabinType,
    priceRange,
    ageRange
  } = params;

  const getResult = () => {
    return {
      name: getRandom(hotels),
      cabinType: cabinType || getRandom(cabinTypes),
      roomNumber: faker.number.int({ min: 1, max: 9999 }),
      roomCount: faker.number.int({ min: roomCount, max: 5 }),
      price:
        faker.number.int({
          min: 0,
          max: priceRange === 0?  9999 : priceRange
        }) *
        roomCount *
        partySize,
      checkIn: faker.date.soon({
        refDate: checkIn,
        days: 1
      }),
      checkOut: faker.date.soon({
        refDate: checkOut,
        days: 1
      })
    } as Hotel;
  };

  return Array.from({ length: roomCount }, getResult).sort(
    (a, b) => a.price - b.price
  );
};

const findFlight = async ({
  ...params
}: TFlightQuery): Promise<Flight[]> => {
  const {
    departingFrom,
    arrivingTo,
    departureDate,
    returnDate,
    cabinType
  } = params;
  return [] as Flight[];
};
