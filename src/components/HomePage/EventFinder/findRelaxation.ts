import { Museum, Park, Spa, TEventQuery, TRelaxation } from "@/types/Event";
import { TMuseumQuery, TParkQuery, TSpaQuery } from "@/types/query";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { getRandom, openingHours, randomList, roundedFloat } from "./utils";

export const findRelaxation = async ({
  ...props
}: TEventQuery<"Relaxation">): Promise<TRelaxation[] | null> => {
  const { type: mode, params } = props;

  switch (mode) {
    case "Spa":
      return findSpa(params as TSpaQuery);
    case "Museum":
      return findMuseum(params as TMuseumQuery);
    case "Park":
      return findPark(params as TParkQuery);
    default:
      return null;
  }
};

const spas = [
  "Serenity Spa Retreat",
  "Tranquil Oasis Wellness Center",
  "Blissful Escapes Spa",
  "Elysian Fields Spa & Resort",
  "Harmony Haven Spa",
  "Zenith Wellness Spa",
  "Pure Indulgence Day Spa",
  "Heavenly Retreat Spa",
  "Radiant Tranquility Spa",
  "Aqua Serene Spa",
  "Revitalize Wellness Spa",
  "Relaxation Haven Spa",
  "Soothing Waters Spa",
  "Essence of Calmness Spa",
  "Sanctuary Spa and Salon",
  "Inner Harmony Spa",
  "The Zen Den Spa",
  "Nature's Rejuvenation Spa",
  "Tranquility Time Spa",
  "Celestial Serenity Spa"
];

const packages = [
  "Relaxation Retreat",
  "Couples Bliss Package",
  "Detox and Renewal",
  "Pampering Paradise",
  "Tranquil Tranformation",
  "Holistic Harmony",
  "Aromatherapy Delight",
  "Skin Rejuvenation Escape",
  "Stress-Free Serenity",
  "Wellness Wonderland"
];

const wellnessClasses = [
  "Yoga Basics",
  "Meditation and Mindfulness",
  "Pilates Fusion",
  "Tai Chi for Beginners",
  "Holistic Nutrition Workshop",
  "Stress Reduction Seminar",
  "Zumba Fitness Party",
  "Guided Nature Walk",
  "Breathing Techniques Workshop",
  "Mind-Body Connection Class"
];

const services = [
  "Swedish Massage",
  "Deep Tissue Massage",
  "Hot Stone Therapy",
  "Aromatherapy Massage",
  "Facial Rejuvenation",
  "Body Scrub and Wrap",
  "Manicure and Pedicure",
  "Couples Massage",
  "Reflexology",
  "Hydrotherapy"
];

const findSpa = async ({ ...params }: TSpaQuery): Promise<Spa[]> => {
  const { date, priceRange, partySize, service, spaPackage, spa } = params;

  return Array.from({ length: randomInt(1, 18) }, () => {
    return {
      date: faker.date.soon({
        refDate: date,
        days: 1
      }),
      spaName: spa || getRandom(spas),
      spaRating: roundedFloat(1, 5),
      bookingPolicy: "24 hours",
      openingHours: openingHours(),
      spaPackage: {
        name: spaPackage || getRandom(packages),
        price: roundedFloat(1, parseInt(priceRange))
      },
      service: {
        name: service || getRandom(services),
        price: roundedFloat(1, parseInt(priceRange))
      },
      wellnessClass: {
        name: getRandom(wellnessClasses),
        price: roundedFloat(1, parseInt(priceRange))
      }
    } as Spa;
  }).sort((a, b) => a.date.valueOf() - b.date.valueOf()) as Spa[];
};

const museums = [
  "Smithsonian Institution",
  "Louvre Museum",
  "British Museum",
  "The Metropolitan Museum of Art",
  "State Hermitage Museum",
  "Vatican Museums",
  "National Gallery of Art",
  "Musée d'Orsay",
  "Uffizi Gallery",
  "Rijksmuseum",
  "Prado Museum",
  "Acropolis Museum",
  "Museum of Modern Art (MoMA)",
  "Guggenheim Museum",
  "National Museum of Natural History",
  "Tate Modern",
  "National Museum of China",
  "National Museum of Korea",
  "Art Institute of Chicago",
  "Tokyo National Museum"
];

const exhibits = [
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
];

const specialEvents = [
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
];

const findMuseum = async ({
  ...params
}: TMuseumQuery): Promise<Museum[]> => {
  const { date, priceRange, partySize, museum, ageRange, exhibit } = params;

  return Array.from({ length: randomInt(1, 18) }, () => {
    return {
      museum: museum || getRandom(museums),
      ageRange: ageRange || randomInt(1, 18),
      admissionFee: roundedFloat(1, parseInt(priceRange)),
      openingHours: openingHours(),
      exhibit: {
        name: exhibit || getRandom(exhibits),
        description: faker.lorem.words(),
        date: faker.date.soon({
          refDate: date,
          days: 1
        })
      },
      specialEvent: {
        name: getRandom(specialEvents),
        description: faker.lorem.words(),
        date: faker.date.soon({
          refDate: date,
          days: 1
        })
      },
      guidedTours: faker.datatype.boolean(),
      audioGuide: faker.datatype.boolean()
    } as Museum;
  }).sort((a, b) =>
    exhibit
      ? a.exhibit.date.valueOf() - b.exhibit.date.valueOf()
      : a.specialEvent.date.valueOf() - b.specialEvent.date.valueOf()
  ) as Museum[];
};

const parks = [
  "Yellowstone National Park",
  "Yosemite National Park",
  "Grand Canyon National Park",
  "Glacier National Park",
  "Zion National Park",
  "Grand Teton National Park",
  "Bryce Canyon National Park",
  "Arches National Park",
  "Rocky Mountain National Park",
  "Sequoia National Park",
  "Acadia National Park",
  "Olympic National Park",
  "Canyonlands National Park",
  "Death Valley National Park",
  "Joshua Tree National Park",
  "Great Smoky Mountains National Park",
  "Denali National Park",
  "Badlands National Park",
  "Mount Rainier National Park",
  "Redwood National Park"
];

const facilites = [
  "Visitor Center",
  "Picnic Area",
  "Playground",
  "Outdoor Theater",
  "Observation Deck",
  "Botanical Garden",
  "Amphitheater",
  "Camping Grounds",
  "Information Kiosk",
  "Restrooms"
];

const activities = [
  "Hiking",
  "Biking",
  "Picnicking",
  "Bird Watching",
  "Boating",
  "Fishing",
  "Camping",
  "Stargazing",
  "Photography",
  "Nature Walks"
];

const features = [
  "Waterfall",
  "Mountain Range",
  "Lake",
  "Forest",
  "Canyon",
  "Meadow",
  "River",
  "Valley",
  "Cliff",
  "Desert Oasis"
];

const wildlife = [
  "White-Tailed Deer",
  "Red Fox",
  "Bald Eagle",
  "Eastern Gray Squirrel",
  "Butterflies (Various Species)",
  "Great Blue Heron",
  "Black Bear",
  "Monarch Butterfly",
  "Eastern Chipmunk",
  "Gray Wolf"
];

const findPark = async ({ ...params }: TParkQuery): Promise<Park[]> => {
  return Array.from({ length: randomInt(1, 18) }, () => ({
    parkName: getRandom(parks),
    openingHours: openingHours(),
    facilities: randomList(facilites),
    activities: randomList(activities),
    naturalFeatures: randomList(features),
    wildlife: randomList(wildlife)
  })).sort((a, b) => {
    return a.parkName.localeCompare(b.parkName);
  }) as Park[];
};
