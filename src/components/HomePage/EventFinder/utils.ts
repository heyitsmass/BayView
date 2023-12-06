'use server';
import { faker } from "@faker-js/faker";

import { ShowTime, TDifficultyType } from "@/types/Event";

const randomList = <T>(arr: readonly T[] | T[]): T[] => {
  const seen = [] as T[];

  const getResult = () => {
    const value = getRandom(arr);
    if (seen.includes(value)) return getResult();
    seen.push(value);
    return value;
  };

  return Array.from({ length: faker.number.int({min:1, max:arr.length - 1})}, getResult);
};

function coinFlip<T>(a: T, b: T) {
  return Math.random() < 0.5 ? a : b;
}

/** Get a random value from the provided list
 * @param arr - The list of values to choose from
 * @returns Returns a random value from the provided list or the value provided upon coin flip
 */

function getRandom<T>(arr: readonly T[] | T[], value?: T) {
  const getValue = () => arr[Math.floor(Math.random() * arr.length)];

  if (value) {
    return coinFlip(value, getValue());
  }

  return getValue();
}

const getNumberSimilarTo = (value: number) => {
  const min = value - 5 >= 0 ? value - 5 : 0;
  const max = value + 5;

  return faker.number.int({
    min,
    max
  });
};

/**
 * Generate a random street, city, state, and zip code for a location
 * @returns Returns a random location
 */
const location = () => {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode()
  };
};

type DateOptions = {
  days?: number | undefined;
  refDate?: string | number | Date | undefined;
};

/**
 * Generate a random from and to date
 * - It is guarenteed for the from date to be in the future
 * @param options - The options for the date
 * @returns Returns a random from and to date
 */
const date = (options?: DateOptions) => {
  return {
    dateTo: faker.date.soon(),
    dateFrom: faker.date.future(options)
  };
};

/**
 * Generate a random opening hours string
 */
const openingHours = (option?: "Day" | "Night") => {
  const closeTimes = [
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM"
  ];

  const openTimes = [
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM"
  ];

  if (option === "Day") {
    const dayTimes = openTimes.slice(0, 4);
    const nightTimes = closeTimes.slice(8, 16);

    return `${getRandom(dayTimes)} - ${getRandom(nightTimes)}`;
  } else if (option === "Night") {
    const dayTimes = openTimes.slice(
      openTimes.length - 4,
      openTimes.length
    );
    const nightTimes = closeTimes.slice(8, closeTimes.length);

    return `${getRandom(nightTimes)} - ${getRandom(dayTimes)}`;
  }

  return `${openTimes[faker.number.int({max:openTimes.length})]} - ${
    closeTimes[faker.number.int({max:closeTimes.length})]
  }`;
};

/**
 * Generate a random list of names and prices
 * @param names - The list of names to choose from
 * @returns - Returns a list of names and prices
 */
const nameAndRandomPrice = (names: readonly string[] | string[]) => {
  const experiences = [] as {
    name: string;
    price: number;
  }[];

  for (let i = 0; i < faker.number.int({min:1, max:10}); i++) {
    experiences.push({
      name: names[faker.number.int({min:0, max:names.length})],
      price: faker.number.float({ min: 1, max: 100 })
    });
  }

  return experiences;
};

/**
 * Generate a random list of names and descriptions
 * @param names - The list of names to choose from
 * @returns - Returns a list of names and descriptions
 */
const nameAndRandomDescriptions = (names: readonly string[] | string[]) => {
  const facilities = [] as {
    name: string;
    description: string;
  }[];

  for (let i = 0; i < faker.number.int({min:1, max:5}); i++) {
    facilities.push({
      name: names[faker.number.int({min:0, max:names.length})],
      description: faker.lorem.words()
    });
  }

  return facilities;
};

const nameAndRandomDescription = (names: readonly string[] | string[]) => {
  return {
    name: names[faker.number.int({min:0, max:names.length})],
    description: faker.lorem.words()
  };
};

/**
 * Generate a random list of names, times, and descriptions
 * - There is no guarantee that the times will be in order
 * @param names - The list of names to choose from
 * @returns - Returns a list of names, times, and descriptions
 */
const nameAndRandomDescriptionWithTime = (
  names: readonly string[] | string[]
) => {
  const experiences = [] as {
    name: string;
    time: string;
    description: string;
  }[];

  for (let i = 0; i < faker.number.int({min:1, max:10}); i++) {
    experiences.push({
      name: names[faker.number.int({min:0, max:names.length})],
      time: faker.date.soon().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
      description: faker.lorem.words()
    });
  }

  return experiences;
};
/**
 * Generate a random list of names and times
 * - There is no guarantee that the times will be in order
 * @param names - The list of names to choose from
 */
const nameAndRandomTime = (names: readonly string[] | string[]) => {
  const experiences = [] as {
    name: string;
    time: string;
  }[];

  for (let i = 0; i < faker.number.int({min:1, max:10}); i++) {
    experiences.push({
      name: names[faker.number.int({min:0, max:names.length})],
      time: faker.date.soon().toLocaleTimeString("it-IT", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    });
  }
  return experiences;
};

/**
 * Generate a random list of show times
 * - There is no guarantee that the show times will be in order
 * @returns Returns a list of show times
 */
const showTimes = ({
  refDate
}: {
  refDate?: string | number | Date | undefined;
}): ShowTime[] => {
  const times = [] as any[];

  for (let i = 0; i < faker.number.int({min:1, max:5}); i++) {
    const date = faker.date.soon({
      refDate,
      days: 1
    });
    const time = date.toLocaleTimeString("it-IT", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    times.push({ date, time });
  }

  return times.sort(
    (a, b) => a.date.valueOf() - b.date.valueOf()
  ) as ShowTime[];
};

/***
 * Generate a random list of words
 * @param words - The list of words to choose from
 * @returns Returns a random list of words
 */
const randomWordList = (words: readonly string[] | string[]) => {
  const points = [] as string[];

  for (let i = 0; i < faker.number.int({min:1, max:10}); i++) {
    points.push(words[faker.number.int({min:0, max:words.length})]);
  }

  return points;
};

/**
 * Generate a random name, description, date, and time
 * @param names - The list of names to choose from
 */
const nameDescriptionDateTime = (names: readonly string[] | string[]) => {
  const experiences = [] as {
    name: string;
    description: string;
    date: Date;
    time: string;
  }[];

  for (let i = 0; i < faker.number.int({min:1, max:10}); i++) {
    experiences.push({
      name: names[faker.number.int({min:0, max:names.length})],
      description: faker.lorem.words(),
      date: faker.date.soon(),
      time: faker.date.soon().toLocaleTimeString("it-IT", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    });
  }

  return experiences;
};

/**
 * Get a random word from a list
 * @param words - The list of words to choose from
 * @returns A random word from the list
 */
const wordFromList = (words: readonly string[] | string[]) =>
  words[faker.number.int({min:0, max:words.length})];

const difficulty = [
  "Easy",
  "Moderate",
  "Difficult",
  "Extreme",
  "Expert"
] as TDifficultyType[];

const randomDifficulty = (): TDifficultyType =>
  difficulty[faker.number.int({max:difficulty.length})];

const roundedFloat = (min: number, max: number, precision: number = 2) =>
  Number(faker.number.float({ min, max }).toFixed(precision));

const duration = (
  options?:
    | {
        days?: number | undefined;
        refDate?: string | number | Date | undefined;
      }
    | undefined
) => {
  const duration = faker.date.soon(options).getTime() - Date.now();
  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);
  return `${hours}h ${minutes}m`;
};
export {
  date,
  duration,
  location,
  nameAndRandomDescription,
  nameAndRandomDescriptionWithTime,
  nameAndRandomDescriptions,
  nameAndRandomPrice,
  nameAndRandomTime,
  nameDescriptionDateTime,
  openingHours,
  randomDifficulty,
  randomWordList,
  roundedFloat,
  showTimes,
  wordFromList,
  getNumberSimilarTo,
  getRandom,
  randomList
};

