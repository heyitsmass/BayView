import { Flight } from '@/types/Event';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

/** Generate a random flight. */
export const flight = (): Flight => {
  const seatOptions = ['A', 'B', 'C', 'D', 'E', 'F'];

  const seat = () => {
    return {
      row: faker.number.int({ min: 1, max: 20 }),
      seat: seatOptions[randomInt(0, seatOptions.length)]
    };
  };

  const gate = () => {
    const gates = [...seatOptions, 'G', 'H', 'I', 'J'];

    return (
      gates[randomInt(0, gates.length)] + faker.number.int({ min: 1, max: 20 })
    );
  };

  return {
    departureTime: faker.date.soon(),
    arrivalTime: faker.date.soon(),
    flightNumber: faker.number.int({ min: 100, max: 1200 }),
    airline: faker.airline.airline(),
    airport: faker.airline.airport(),
    reservationNumber: faker.airline.recordLocator(),
    gate: gate(),
    seats: [seat(), seat()]
  };
};
