import { Theatre } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { roundedFloat, showTimes } from "../utils";

/** Generate a random thetre show. */
export const theatre = (): Theatre => {
  return {
    play: faker.lorem.words(),
    playwright: faker.person.firstName(),
    showTimes: showTimes(),
    ticketPrice: roundedFloat(1, 100),
    theatreRating: roundedFloat(1, 5),
    seatingCapacity: faker.number.int({ min: 1, max: 1000 }),
    isSoldOut: faker.datatype.boolean(),
    intervalDuration: `${faker.number.int({
      min: 1,
      max: 10
    })} minutes`
  };
};
