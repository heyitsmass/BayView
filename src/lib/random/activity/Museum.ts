import { faker } from "@faker-js/faker";
import { nameAndRandomDescription, nameDescriptionDateTime, openingHours } from "../utils";
import { Museum } from "@/types/Event";

/** Generate a random museum activity */
export const museum = (): Museum => {
  return {
    exhibits: nameAndRandomDescription([
      "Ancient Civilizations",
      "Modern Art Masterpieces",
      "Dinosaur Discovery",
      "Interactive Science Lab",
      "Space Exploration Gallery",
      "Historical Innovations",
      "World Cultures Showcase",
      "Natural History Wonders",
      "Famous Paintings Collection",
      "Technology Through the Ages"
    ]),
    admissionFee: faker.number.float({ min: 1, max: 100 }),
    openingHours: openingHours(),
    specialEvents: nameDescriptionDateTime([
      "Artists' Night",
      "Science Discovery Day",
      "Family Fun Festival",
      "Historical Lecture Series",
      "Live Art Demonstration",
      "Cultural Heritage Day",
      "Night at the Museum",
      "Fossil Digging Workshop",
      "Gallery Tour with Curator",
      "Innovation Symposium"
    ]),
    guidedTours: faker.datatype.boolean(),
    audioGuide: faker.datatype.boolean()
  };
};
