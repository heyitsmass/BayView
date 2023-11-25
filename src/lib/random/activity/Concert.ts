import { Concert } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomWordList, roundedFloat } from "../utils";

/** Generate a random concert event. */
export const concert = (): Concert => {
  return {
    artist: faker.person.firstName(),
    venue: faker.company.name(),
    date: faker.date.soon(),
    ticketPrice: roundedFloat(1, 100),
    setList: randomWordList([
      "Opening Act",
      "Hit Song Medley",
      "Acoustic Interlude",
      "Fan Favorites",
      "Collaboration with Special Guest",
      "New Releases Showcase",
      "Instrumental Jam Session",
      "Crowd Sing-Along Moment",
      "Encore Performance",
      "Introduction",
      "Hit Song 1",
      "Fan Favorite 1",
      "Energetic Anthem",
      "Ballad Moment",
      "Crowd Interaction",
      "Throwback Hit",
      "Encore Performance"
    ]),
    venueRating: roundedFloat(1, 5),
    attendees: faker.number.int({ min: 1, max: 1000 }),
    isSoldOut: faker.datatype.boolean(),
    departureLocation: faker.location.streetAddress(),
    transportationMode: faker.lorem.word()
  };
};
