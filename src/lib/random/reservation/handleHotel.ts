"use server";

import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";

type CabinTypes = "Standard" | "Deluxe" | "Suite" | "Presidential";

const adultOptions = [] as string[];

const childOptions = [] as string[];

const cabinOptions = {
  Standard: [],
  Deluxe: [],
  Suite: [],
  Presidential: [],
} as {
  [key in CabinTypes]: string[];
};

const types = Object.keys(cabinOptions) as CabinTypes[];

const getOption = (
  partySize: number,
  checkIn: Date,
  checkOut: Date,
  isAdult: boolean = true,
  cabinType: CabinTypes = types[randomInt(types.length)]
): HotelOption => {
  /** Generates a max party size at minimum == partySize and max greater than party size + 6 */
  const maxPartySize = faker.number.int({
    min: partySize,
    max: partySize + randomInt(1, 6),
  });

  const date = {
    checkIn: faker.date.soon({ days: 1, refDate: checkIn }),
    checkOut: faker.date.soon({
      days: (checkIn.valueOf() - checkOut.valueOf()) / 1000 / 60 / 60 / 24,
      refDate: checkOut,
    }),
  };

  const option = cabinOptions[cabinType!].filter((option) =>
    isAdult ? adultOptions.includes(option) : childOptions.includes(option)
  )[0];

  const reservationNumber = faker.airline.recordLocator();

  return {
    cabinType,
    maxPartySize,
    checkIn: date.checkIn,
    checkOut: date.checkOut,
    roomNumber: option,
    reservationNumber,
  } as HotelOption;
};

type HotelOption = {
  cabinType: CabinTypes;
  maxPartySize: number;
  checkIn: Date;
  checkOut: Date;
  roomNumber: string;
  reservationNumber: string;
};

export const handleHotel = async (
  partySize: number,
  checkIn: Date,
  checkOut: Date,
  isAdult: boolean = true,
  cabinType?: CabinTypes
) => {
  const options = [] as HotelOption[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    options.push(
      getOption(partySize, checkIn, checkOut, isAdult, cabinType)
    );
  }
  return options;
};
