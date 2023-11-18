import { Hotel } from '@/types/Event';
import { date } from '../utils';
import { faker } from '@faker-js/faker';

/** Generate a random hotel reservation. */
export const hotel = (): Hotel => {
  const { dateTo, dateFrom } = date({ days: 7 });

  const roomNumber = () => faker.number.int({ min: 100, max: 1200 });

  return {
    checkIn: dateTo,
    checkOut: dateFrom,
    roomNumber: roomNumber()
  };
};
