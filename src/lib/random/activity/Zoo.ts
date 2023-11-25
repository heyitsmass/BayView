import { faker } from "@faker-js/faker";
import {
  nameAndRandomDescription,
  nameAndRandomDescriptionWithTime,
  nameAndRandomDescriptions,
  nameAndRandomTime,
  openingHours,
  roundedFloat
} from "../utils";
import { Zoo } from "@/types/Event";

/** Generate a random zoo activity */
export const zoo = (): Zoo => {
  return {
    openingHours: openingHours(),
    animalExhibits: nameAndRandomDescriptions([
      "African Savannah",
      "Penguin Paradise",
      "Rainforest Adventure",
      "Arctic Wonderland",
      "Reptile House",
      "Australian Outback",
      "Tropical Butterfly Garden",
      "Ocean Explorer",
      "Nocturnal Creatures Habitat",
      "Asian Elephant Sanctuary"
    ]),
    admissionFee: roundedFloat(1, 100),
    feedingSchedule: nameAndRandomTime([
      "Lion Feeding",
      "Penguin Feeding",
      "Shark Feeding",
      "Elephant Feeding",
      "Seal Show and Feed",
      "Birds of Prey Feeding",
      "Giraffe Feeding Experience",
      "Reptile Feeding Time",
      "Koala Feeding Session",
      "Tropical Fish Feeding"
    ]),
    conservationPrograms: nameAndRandomDescriptions([
      "Wildlife Habitat Restoration",
      "Endangered Species Protection",
      "Ocean Cleanup Initiative",
      "Community Environmental Education",
      "Climate Change Awareness Campaign",
      "Rainforest Preservation Project",
      "Plastic Waste Reduction Program",
      "Coral Reef Conservation",
      "Sustainable Agriculture Advocacy",
      "Water Conservation Initiative"
    ]),
    interactiveExperiences: nameAndRandomDescriptionWithTime([
      "Animal Encounters",
      "Behind-the-Scenes Tours",
      "Hands-On Science Workshops",
      "Interactive Art Exhibits",
      "Virtual Reality Experiences",
      "Interactive Cooking Classes",
      "Meet-and-Greet with Characters",
      "Guided Nature Walks",
      "DIY Craft Stations",
      "Escape Room Challenges"
    ])
  };
};
