import { Golf } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { randomDifficulty, roundedFloat } from "../utils";

/** Generate a random golf activity.  */
export const golf = (): Golf => {
  const teeTime = () => {
    const date = faker.date.soon();

    return {
      date,
      time: date.toLocaleTimeString("it-IT", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
      price: roundedFloat(1, 100)
    };
  };

  const teeTimes = () => {
    const times = [] as any[];

    for (let i = 0; i < randomInt(1, 24); i++) {
      times.push(teeTime());
    }

    return times;
  };

  const holes = () => {
    const bool = faker.datatype.boolean();

    return bool ? 18 : 9;
  };

  return {
    course: faker.lorem.words(),
    courseDifficulty: randomDifficulty(),
    courseDescription: faker.lorem.words(),
    golfLessons: faker.datatype.boolean(),
    golfCartRental: faker.datatype.boolean(),
    golfClubRental: faker.datatype.boolean(),
    teeTimes: teeTimes(),
    holes: holes()
  };
};
