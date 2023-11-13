import { ShowTime } from '@/types/Event';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

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
 * - It is guarenteed the closing date will be in the future but the time is not guarenteed to be in order
 */
const openingHours = () => {
  return `${faker.date.soon().toLocaleTimeString('it-IT')} - ${faker.date
    .future()
    .toLocaleTimeString('it-IT')}`;
};

/**
 * Generate a random list of names and prices
 * @param names - The list of names to choose from
 * @returns - Returns a list of names and prices
 */
const nameAndRandomPrice = (names: string[]) => {
  const experiences = [] as {
    name: string;
    price: number;
  }[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    experiences.push({
      name: names[randomInt(0, names.length)],
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
const nameAndRandomDescription = (names: string[]) => {
  const facilities = [] as {
    name: string;
    description: string;
  }[];

  for (let i = 0; i < randomInt(1, 5); i++) {
    facilities.push({
      name: names[randomInt(0, names.length)],
      description: faker.lorem.words()
    });
  }

  return facilities;
};

/**
 * Generate a random list of names, times, and descriptions
 * - There is no guarantee that the times will be in order
 * @param names - The list of names to choose from
 * @returns - Returns a list of names, times, and descriptions
 */
const nameAndRandomDescriptionWithTime = (names: string[]) => {
  const experiences = [] as {
    name: string;
    time: string;
    description: string;
  }[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    experiences.push({
      name: names[randomInt(0, names.length)],
      time: faker.date.soon().toLocaleTimeString('it-IT'),
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
const nameAndRandomTime = (names: string[]) => {
  const experiences = [] as {
    name: string;
    time: string;
  }[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    experiences.push({
      name: names[randomInt(0, names.length)],
      time: faker.date.soon().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
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
const showTimes = (): ShowTime[] => {
  const times = [] as any[];

  for (let i = 0; i < randomInt(1, 5); i++) {
    times.push({
      date: faker.date.soon(),
      time: faker.date.soon().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  }

  return times;
};

/***
 * Generate a random list of words
 * @param words - The list of words to choose from
 * @returns Returns a random list of words
 */
const randomWordList = (words: string[]) => {
  const points = [] as string[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    points.push(words[randomInt(0, words.length)]);
  }

  return points;
};

/**
 * Generate a random name, description, date, and time
 * @param names - The list of names to choose from
 */
const nameDescriptionDateTime = (names: string[]) => {
  const experiences = [] as {
    name: string;
    description: string;
    date: Date;
    time: string;
  }[];

  for (let i = 0; i < randomInt(1, 10); i++) {
    experiences.push({
      name: names[randomInt(0, names.length)],
      description: faker.lorem.words(),
      date: faker.date.soon(),
      time: faker.date.soon().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
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
const wordFromList = (words: string[]) => {
  return words[randomInt(0, words.length)];
};

export {
  location,
  date,
  openingHours,
  nameAndRandomPrice,
  nameAndRandomDescription,
  nameAndRandomDescriptionWithTime,
  nameAndRandomTime,
  showTimes,
  randomWordList,
  nameDescriptionDateTime,
  wordFromList
};
