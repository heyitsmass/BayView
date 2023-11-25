import { Flight } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";

/** Generate a random flight. */
export const flight = (): Flight => {
  const seatOptions = ["A", "B", "C", "D", "E", "F"];

  const seat = () => {
    return {
      row: faker.number.int({ min: 1, max: 20 }),
      seat: seatOptions[randomInt(0, seatOptions.length)],
    };
  };

  const gate = () => {
    const gates = [...seatOptions, "G", "H", "I", "J"];

    return (
      gates[randomInt(0, gates.length)] +
      faker.number.int({ min: 1, max: 20 })
    );
  };

  const UpgradeTypes = [
    "Economy",
    "Premium Economy",
    "Business Class",
    "First Class",
  ];

  const partySize = faker.number.int({ min: 1, max: 4 });

  const seats = Array(partySize).fill(0).map(seat);

  const departureTime = faker.date.soon();
  return {
    departureTime,
    arrivalTime: faker.date.soon({
      days: 2,
      refDate: departureTime.toLocaleDateString(),
    }),
    flightNumber: faker.number.int({ min: 100, max: 1200 }),
    airline: faker.airline.airline(),
    airport: faker.airline.airport(),
    currentPrice: faker.number.int({ min: 100, max: 200 }) * partySize,
    currentUpgrade: UpgradeTypes[0],
    reservationNumber: faker.airline.recordLocator(),
    gate: gate(),
    seats,
  };
};
