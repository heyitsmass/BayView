  AquariumModel,
  ConcertModel,
  FlightModel,
  HotelModel,
  MuseumModel,
  ParkModel,
  TheatreModel,
  ZooModel
  Aquarium,
  Concert,
  Flight,
  Hotel,
  Museum,
  Park,
  Theatre,
  Zoo
    Hotel: HotelModel,
    Dining: DiningModel,
    Flight: FlightModel,
    Theatre: TheatreModel,
    Concert: ConcertModel,
    Museum: MuseumModel,
    Park: ParkModel,
    Zoo: ZooModel,
    Aquarium: AquariumModel,
    case "Aquarium":
      return getAquarium();
    case "Concert":
      return getConcert();
    case "Dining":
      return getDinner();
    case "Flight":
      return getFlight();
    case "Hotel":
      return getHotel();
    case "Museum":
      return getMuseum();
    case "Park":
      return getPark();
    case "Theatre":
      return getTheatre();
    case "Zoo":
      return getZoo();

/** Generate a random flight. */
const getFlight = (): Flight => {
  const seatOptions = ["A", "B", "C", "D", "E", "F"];

  const seat = () => {
    return {
      row: faker.number.int({ min: 1, max: 20 }),
      seat: seatOptions[randomInt(0, seatOptions.length)]
    };
  };

  const gate = () => {
    const gates = [...seatOptions, "G", "H", "I", "J"];

    return (
      gates[randomInt(0, gates.length)] +
      faker.number.int({ min: 1, max: 20 })
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

/** Generate a random hotel reservation. */
const getHotel = (): Hotel => {
  const { dateTo, dateFrom } = date({ days: 7 });

  const roomNumber = () => faker.number.int({ min: 100, max: 1200 });

  return {
    checkIn: dateTo,
    checkOut: dateFrom,
    roomNumber: roomNumber()
  };
};
/** Generate a random dining activity.  */
const getDinner = (): Dining => {
  const offer = () => {
    const _date = faker.date.soon();

    return {
      key: _date.toLocaleDateString("it-IT"),
      value: {
        offerId: faker.string.uuid(),
        time: _date.toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        label: ["breakfast", "lunch", "dinner"][
          randomInt(0, 3)
        ] as MealTypes
      }
    } as {
      key: string;
      value: Offer;
    };
  };

  const offers = () => {
    const { key } = offer();

    const values = [] as any[];

    for (let i = 0; i < randomInt(1, 15); i++) {
      const { value } = offer();

      values.push(value);
    }

    return {
      key,
      values
    } as {
      key: string;
      values: Offer[];
    };
  };

  const priceLegend = () => {
    let res = "$";
    for (let i = 0; i < randomInt(0, 3); i++) {
      res += "$";
    }
    return res;
  };

  const mealPeriodInfo = () => {
    const cuisineTypes = [
      "italian",
      "chinese",
      "french",
      "japenese",
      "american",
      "mexican",
      "indian",
      "thai",
      "greek"
    ];

    return {
      _type: faker.lorem.word(),
      name: faker.lorem.word(),
      experience: faker.lorem.words(),
      priceLegend: priceLegend(),
      primaryCuisineType: cuisineTypes[randomInt(0, cuisineTypes.length)]
    } as MealPeriodInfo;
  };

  const { key, values } = offers();

  return {
    priceRange: priceLegend(),
    mealPeriodInfo: mealPeriodInfo(),
    admissionRequired: faker.datatype.boolean(),
    offers: {
      [key]: values
    }
  };
};

/** Generate a random thetre show. */
const getTheatre = (): Theatre => {
  return {
    play: faker.lorem.words(),
    playwright: faker.person.firstName(),
    showTimes: showTimes(),
    ticketPrice: faker.number.float({ min: 1, max: 100 }),
    theatreRating: faker.number.float({ min: 1, max: 5 }),
    seatingCapacity: faker.number.int({ min: 1, max: 1000 }),
    isSoldOut: faker.datatype.boolean(),
    intervalDuration: `${faker.number.int({
      min: 1,
      max: 10
    })} minutes`
  };
};
/** Generate a random concert event. */
const getConcert = (): Concert => {
  return {
    artist: faker.person.firstName(),
    venue: faker.company.name(),
    date: faker.date.soon(),
    ticketPrice: faker.number.float({ min: 1, max: 100 }),
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
    venueRating: faker.number.float({ min: 1, max: 5 }),
    attendees: faker.number.int({ min: 1, max: 1000 }),
    isSoldOut: faker.datatype.boolean(),
    departureLocation: faker.location.streetAddress(),
    transportationMode: faker.lorem.word()
  };
};
/** Generate a random museum activity */
const getMuseum = (): Museum => {
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

/** Generate a random park activity */
const getPark = (): Park => {
  return {
    openingHours: openingHours(),
    facilities: nameAndRandomDescription([
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
    ]),
    activities: nameAndRandomDescription([
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
    ]),
    naturalFeatures: nameAndRandomDescription([
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
    ]),
    wildlife: nameAndRandomDescription([
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
    ])
  };
};

/** Generate a random zoo activity */
const getZoo = (): Zoo => {
  return {
    openingHours: openingHours(),
    animalExhibits: nameAndRandomDescription([
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
    admissionFee: faker.number.float({ min: 1, max: 100 }),
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
    conservationPrograms: nameAndRandomDescription([
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

/** Generate a random aquarium activity */
const getAquarium = (): Aquarium => {
  const exhibits = nameAndRandomDescription([
    "Coral Reef Exploration",
    "Amazon Rainforest Tank",
    "Penguin Habitat",
    "Shark Lagoon",
    "Jellyfish Gallery",
    "Seahorse Sanctuary",
    "Tropical Rainforest Display",
    "Kelp Forest Exhibit",
    "Deep Sea Wonders",
    "Touch Pool Experience"
  ]);
  return {
    exhibits,
    admissionFee: faker.number.float({ min: 1, max: 100 }),
    openingHours: openingHours(),
    underwaterTunnel: faker.datatype.boolean(),
    touchPools: faker.datatype.boolean(),
    showSchedule: showTimes()
  };
};
