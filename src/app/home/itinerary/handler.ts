"use server";

import {
  AmusementParkModel,
  AquariumModel,
  BikingModel,
  ConcertModel,
  DiningModel,
  FlightModel,
  GolfModel,
  HikingModel,
  HotelModel,
  MuseumModel,
  NightlifeModel,
  ParkModel,
  ShoppingModel,
  SpaModel,
  SportsModel,
  TheatreModel,
  WaterparkModel,
  ZooModel
} from "@/models/Event";
import {
  Activities,
  AmusementPark,
  Aquarium,
  Biking,
  Concert,
  Dining,
  EventTypes,
  Flight,
  Golf,
  Hiking,
  Hotel,
  MealPeriodInfo,
  MealTypes,
  Museum,
  Nightlife,
  Offer,
  Park,
  Reservable,
  Shopping,
  ShowTime,
  Spa,
  SportEvents,
  Sports,
  Theatre,
  Waterpark,
  Zoo
} from "@/types/Event";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { HydratedDocument } from "mongoose";

/**
 * Generate a random Sports event based on the type
 * @param event - The type of event to generate (must be Sports)
 * @param sport - The type of sport to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: "Sports",
  sport: SportEvents
): Promise<HydratedDocument<Sports>>;
/**
 * Generate a random (Non-Sports) event based on the type
 * @param event - The type of event to generate
 * @returns a Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: Exclude<EventTypes, "Sports">
): Promise<HydratedDocument<Reservable | Omit<Activities, "Sports">>>;
/**
 * Generate a random event based on the type
 * @param event - The type of event to generate
 * @param sport - Only used for Sports
 * @returns A Hydrated event prepared for the database
 */
export async function getRandomEvent(
  event: EventTypes,
  sport?: SportEvents
): Promise<HydratedDocument<Reservable | Activities>> {
  const modelTypes = {
    Hotel: HotelModel,
    Dining: DiningModel,
    Flight: FlightModel,
    Theatre: TheatreModel,
    Concert: ConcertModel,
    Museum: MuseumModel,
    Park: ParkModel,
    Zoo: ZooModel,
    Spa: SpaModel,
    Golf: GolfModel,
    Aquarium: AquariumModel,
    Hiking: HikingModel,
    Biking: BikingModel,
    Waterpark: WaterparkModel,
    AmusementPark: AmusementParkModel,
    Sports: SportsModel,
    Nightlife: NightlifeModel,
    Shopping: ShoppingModel
  };

  const data =
    event === "Sports" ? handleCall(event, sport!) : handleCall(event);

  return new modelTypes[event]({
    name: faker.lorem.words(),
    location: location(),
    description: faker.lorem.words(),
    ...data
  });
}

/**
 * Generate a random, Sports event based on the type
 * @param event - The type of event to generate (must be Sports)
 * @param sport - The type of sport to generate
 * @returns Returns the pure data for the event
 */
export function handleCall(event: "Sports", sport: SportEvents): Sports;
/**
 * Generate a random, Non-Sports event based on the type
 * @param event - The type of event to generate
 * @returns Returns the pure data for the event
 */
export function handleCall(
  event: Exclude<EventTypes, "Sports">
): Reservable | Omit<Activities, "Sports">;
/**
 * Generate a random event based on the type
 * @param event - The type of event to generate
 * @param sport - Only used for Sports
 * @returns Returns the pure data for the event
 */
export function handleCall(
  event: EventTypes,
  sport?: SportEvents
): Reservable | Activities {
  switch (event) {
    case "AmusementPark":
      return getAmusementPark();
    case "Aquarium":
      return getAquarium();
    case "Concert":
      return getConcert();
    case "Dining":
      return getDinner();
    case "Flight":
      return getFlight();
    case "Golf":
      return getGolf();
    case "Hotel":
      return getHotel();
    case "Museum":
      return getMuseum();
    case "Nightlife":
      return getNightlife();
    case "Park":
      return getPark();
    case "Shopping":
      return getShopping();
    case "Spa":
      return getSpa();
    case "Sports":
      return getSports(sport!);
    case "Theatre":
      return getTheatre();
    case "Waterpark":
      return getWaterpark();
    case "Zoo":
      return getZoo();
    case "Hiking":
      return getHiking();
    case "Biking":
      return getBiking();
    default:
      throw new Error(`Invalid event type: ${event}`);
  }
}

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
/** Generate a random waterpark activity  */
const getWaterpark = (): Waterpark => {
  return {
    attractions: nameAndRandomDescription([
      "Wave Pool",
      "Lazy River",
      "Water Slides",
      "Tidal Wave Bay",
      "Adventure River",
      "Splash Pad",
      "Family Raft Ride",
      "Drop Slide",
      "FlowRider",
      "Aquatic Play Structure"
    ]),
    admissionFee: faker.number.float({ min: 1, max: 100 }),
    openingHours: openingHours(),
    wavePool: faker.datatype.boolean(),
    lazyRiver: faker.datatype.boolean(),
    waterSlides: nameAndRandomDescription([
      "Twisted Tornado",
      "Spiral Splash",
      "Raging Rapids",
      "Turbo Tube",
      "Freefall Falls",
      "Whirlwind Whiz",
      "Aqua Vortex",
      "Splash Canyon",
      "Typhoon Twist",
      "Rocket Racer"
    ])
  };
};

/** Generate a random amusement park activity. */
const getAmusementPark = (): AmusementPark => {
  const rides = [
    "Roller Coaster",
    "Ferris Wheel",
    "Carousel",
    "Drop Tower",
    "Haunted Mansion",
    "Spinning Teacups",
    "Log Flume",
    "Bumper Cars",
    "Swing Ride",
    "Water Coaster"
  ];

  const rollerCoasters = [
    "Thunderbolt",
    "Twisted Cyclone",
    "Velocity Vortex",
    "Gravity Grinder",
    "Screaming Serpent",
    "Thrill Thunder",
    "Inferno Insanity",
    "Dragon's Roar",
    "Galactic G-Force",
    "Viper Venom"
  ];

  const themedAreas = [
    "Adventureland",
    "Fantasy Kingdom",
    "Sci-Fi Galaxy",
    "Wild West Frontier",
    "Enchanted Forest",
    "Pirate's Cove",
    "Dinosaur Discovery Zone",
    "Superhero City",
    "Futuristic Metropolis",
    "Magical Wonderland"
  ];

  const waterRides = [
    "Log Flume",
    "River Rapids",
    "Water Coaster",
    "Water Slide",
    "Water Flume",
    "Water Rapids",
    "Water Chute",
    "Water Shoot",
    "Waterfall",
    "Water Jet"
  ];

  const heightRestrictions = (names: string[]) => {
    const restrictions = {} as any;

    for (let i = 0; i < randomInt(1, 10); i++) {
      restrictions[names[randomInt(0, names.length)]] = faker.number.int({
        min: 40,
        max: 90
      });
    }

    return restrictions;
  };

  return {
    rides: randomWordList(rides),
    admissionFee: faker.number.float({ min: 1, max: 100 }),
    openingHours: openingHours(),
    rollerCoasters: randomWordList(rollerCoasters),
    themedAreas: randomWordList(themedAreas),
    waterRides: randomWordList(waterRides),
    heightRestrictions: heightRestrictions([
      ...rides,
      ...rollerCoasters,
      ...waterRides,
      ...themedAreas
    ])
  };
};

/** Generate a random sports event
 * @param event - The type of sport to generate
 */
const getSports = (event: SportEvents): Sports => {
  const teams = {
    Football: [
      "Real Madrid",
      "Barcelona",
      "Manchester United",
      "Liverpool",
      "Bayern Munich",
      "Paris Saint-Germain",
      "Juventus",
      "AC Milan",
      "Chelsea",
      "Arsenal",
      "Manchester City",
      "Borussia Dortmund",
      "Inter Milan",
      "Atletico Madrid",
      "Ajax",
      "Roma",
      "Tottenham Hotspur",
      "PSV Eindhoven",
      "Sevilla",
      "Boca Juniors",
      "River Plate",
      "Santos FC",
      "Palmeiras",
      "Flamengo",
      "Cruzeiro",
      "Gremio",
      "FC Barcelona (Women's)",
      "Olympique Lyonnais (Women's)",
      "North Carolina Courage (NWSL)",
      "Portland Thorns FC (NWSL)"
    ],
    Baseball: [
      "New York Yankees",
      "Boston Red Sox",
      "Los Angeles Dodgers",
      "Chicago Cubs",
      "San Francisco Giants",
      "St. Louis Cardinals",
      "Houston Astros",
      "New York Mets",
      "Atlanta Braves",
      "Texas Rangers",
      "Philadelphia Phillies",
      "Detroit Tigers",
      "Oakland Athletics",
      "Washington Nationals",
      "Cleveland Guardians",
      "Chicago White Sox",
      "Toronto Blue Jays",
      "Seattle Mariners",
      "Minnesota Twins",
      "Milwaukee Brewers",
      "Cincinnati Reds",
      "Arizona Diamondbacks",
      "San Diego Padres",
      "Baltimore Orioles",
      "Pittsburgh Pirates",
      "Kansas City Royals",
      "Colorado Rockies",
      "Miami Marlins",
      "Tampa Bay Rays"
    ],
    Basketball: [
      "Los Angeles Lakers",
      "Chicago Bulls",
      "Golden State Warriors",
      "Miami Heat",
      "Boston Celtics",
      "Toronto Raptors",
      "Houston Rockets",
      "Philadelphia 76ers",
      "Dallas Mavericks",
      "Brooklyn Nets",
      "San Antonio Spurs",
      "Denver Nuggets",
      "Portland Trail Blazers",
      "Utah Jazz",
      "Milwaukee Bucks",
      "Atlanta Hawks",
      "New York Knicks",
      "Indiana Pacers",
      "Oklahoma City Thunder",
      "Phoenix Suns",
      "Orlando Magic",
      "Minnesota Timberwolves",
      "Charlotte Hornets",
      "Detroit Pistons",
      "Sacramento Kings",
      "Washington Wizards",
      "Cleveland Cavaliers",
      "Memphis Grizzlies",
      "New Orleans Pelicans",
      "Los Angeles Clippers"
    ],
    Hockey: [
      "Anaheim Ducks",
      "Arizona Coyotes",
      "Boston Bruins",
      "Buffalo Sabres",
      "Calgary Flames",
      "Carolina Hurricanes",
      "Chicago Blackhawks",
      "Colorado Avalanche",
      "Columbus Blue Jackets",
      "Dallas Stars",
      "Detroit Red Wings",
      "Edmonton Oilers",
      "Florida Panthers",
      "Los Angeles Kings",
      "Minnesota Wild",
      "Montreal Canadiens",
      "Nashville Predators",
      "New Jersey Devils",
      "New York Islanders",
      "New York Rangers",
      "Ottawa Senators",
      "Philadelphia Flyers",
      "Pittsburgh Penguins",
      "San Jose Sharks",
      "Seattle Kraken",
      "St. Louis Blues",
      "Tampa Bay Lightning",
      "Toronto Maple Leafs",
      "Vancouver Canucks",
      "Vegas Golden Knights",
      "Washington Capitals",
      "Winnipeg Jets"
    ],
    Soccer: [
      "Manchester United",
      "Real Madrid",
      "FC Barcelona",
      "Bayern Munich",
      "Liverpool",
      "Paris Saint-Germain",
      "Juventus",
      "Chelsea",
      "AC Milan",
      "Ajax",
      "Borussia Dortmund",
      "Atletico Madrid",
      "Inter Milan",
      "Arsenal",
      "Manchester City",
      "Tottenham Hotspur",
      "FC Porto",
      "AS Roma",
      "Napoli",
      "Benfica",
      "Sporting CP",
      "River Plate",
      "Boca Juniors",
      "Sao Paulo FC",
      "Flamengo",
      "Cruzeiro",
      "Palmeiras",
      "Barcelona SC",
      "Fluminense",
      "Vasco da Gama",
      "Ajax",
      "PSV Eindhoven",
      "Feyenoord",
      "Galatasaray",
      "Besiktas",
      "Fenerbahce",
      "Celtic",
      "Rangers",
      "Anderlecht",
      "Club Brugge",
      "Shakhtar Donetsk",
      "Zenit Saint Petersburg",
      "CSKA Moscow",
      "Bayer Leverkusen",
      "Schalke 04",
      "Olympique Marseille",
      "Lyon",
      "AS Monaco",
      "Porto",
      "Sporting Lisbon",
      "Benfica",
      "Sevilla FC",
      "Valencia CF",
      "Villarreal CF",
      "Real Betis",
      "Athletic Bilbao",
      "Leicester City",
      "West Ham United",
      "Leeds United",
      "Everton",
      "Wolverhampton Wanderers",
      "Crystal Palace",
      "Newcastle United",
      "Southampton",
      "Brighton & Hove Albion",
      "Aston Villa",
      "Burnley",
      "Watford",
      "Brentford"
    ],
    Tennis: [
      "Roger Federer",
      "Rafael Nadal",
      "Novak Djokovic",
      "Serena Williams",
      "Ashleigh Barty",
      "Simona Halep",
      "Naomi Osaka",
      "Dominic Thiem",
      "Stefanos Tsitsipas",
      "Daniil Medvedev",
      "Bianca Andreescu",
      "Karolina Pliskova",
      "Alexander Zverev",
      "Petra Kvitova",
      "Andrey Rublev",
      "Garbine Muguruza",
      "Andy Murray",
      "Venus Williams",
      "Kei Nishikori",
      "Victoria Azarenka",
      "Diego Schwartzman",
      "Elina Svitolina",
      "Gael Monfils",
      "Aryna Sabalenka",
      "Fabio Fognini",
      "Johanna Konta",
      "Stan Wawrinka",
      "Karolina Muchova",
      "Matteo Berrettini",
      "Anett Kontaveit",
      "David Goffin",
      "Belinda Bencic",
      "Felix Auger-Aliassime",
      "Kiki Bertens",
      "Alex de Minaur",
      "Sofia Kenin",
      "Denis Shapovalov",
      "Angelique Kerber",
      "Grigor Dimitrov",
      "Marketa Vondrousova",
      "Pablo Carreno Busta",
      "Jelena Ostapenko",
      "Casper Ruud",
      "Cori Gauff",
      "Hubert Hurkacz",
      "Madison Keys",
      "Cristian Garin",
      "Donna Vekic",
      "John Isner",
      "Dayana Yastremska",
      "Karen Khachanov",
      "Caroline Wozniacki",
      "Nick Kyrgios"
    ]
  };

  const teamsBySport = (sport: SportEvents) => {
    return teams[sport];
  };

  const team = (sport: SportEvents) => {
    return teamsBySport(sport)[randomInt(0, teamsBySport(sport).length)];
  };

  const events = {
    Football: [
      "World Cup Final",
      "Champions League Final",
      "Super Bowl",
      "FIFA Club World Cup",
      "UEFA Europa League Final",
      "Copa America Final",
      "AFC Asian Cup Final",
      "CAF Africa Cup of Nations Final",
      "CONCACAF Gold Cup Final",
      "Premier League Derby",
      "El Clasico",
      "Copa Libertadores Final",
      "Bundesliga Top Match",
      "Serie A Showdown",
      "CAF Champions League Final",
      "MLS Cup Final",
      "FA Cup Final",
      "Coppa Italia Final",
      "DFB-Pokal Final",
      "La Liga Clash",
      "EFL Cup Final",
      "Copa del Rey Final",
      "FIFA U-20 World Cup Final",
      "FIFA Women's World Cup Final",
      "Olympic Football Final",
      "AFC U-23 Championship Final",
      "CONCACAF Nations League Final",
      "FIFA U-17 World Cup Final",
      "Women's Champions League Final",
      "FIFA Beach Soccer World Cup Final"
    ],
    Baseball: [
      "Opening Day",
      "Home Run Derby",
      "All-Star Game",
      "World Series",
      "Spring Training",
      "Playoffs",
      "Wildcard Game",
      "League Championship Series (ALCS/NLCS)",
      "World Baseball Classic",
      "Hall of Fame Induction Ceremony",
      "Perfect Game",
      "No-Hitter",
      "Triple Play",
      "Grand Slam",
      "Rivalry Game",
      "Doubleheader",
      "Walk-off Win",
      "Extra-Inning Game",
      "Pitcher's Duel",
      "Baseball Winter Meetings"
    ],
    Basketball: [
      "NBA Finals",
      "NCAA March Madness",
      "FIBA Basketball World Cup",
      "NBA All-Star Weekend",
      "EuroLeague Final Four",
      "WNBA Finals",
      "Olympic Basketball Tournament",
      "NBA Draft",
      "NCAA Men's Final Four",
      "NCAA Women's Final Four",
      "FIBA Continental Cup",
      "NBA Summer League",
      "WNBA All-Star Game",
      "NBA Opening Night",
      "NBA Christmas Day Games",
      "FIBA Asia Cup",
      "NBA Global Games",
      "WNBA Draft",
      "NBA Playoffs",
      "WNBA Regular Season"
    ],
    Hockey: [
      "Stanley Cup Finals",
      "All-Star Game",
      "Winter Classic",
      "World Championships",
      "Preseason Tournaments",
      "Playoff Series",
      "Outdoor Showcase",
      "International Friendlies",
      "College Hockey Championships",
      "Youth Hockey Tournament"
    ],
    Soccer: [
      "FIFA World Cup",
      "UEFA Champions League Final",
      "Copa America",
      "Premier League Matchday",
      "La Liga El Clasico",
      "Bundesliga Derby",
      "Serie A Showdown",
      "CAF Champions League Final",
      "CONCACAF Gold Cup",
      "AFC Champions League Quarterfinals",
      "MLS All-Star Game",
      "FIFA Women's World Cup",
      "Copa Libertadores Final",
      "UEFA Europa League Final",
      "Confederations Cup",
      "EFL Championship Playoff Final",
      "Supercoppa Italiana",
      "FIFA Club World Cup",
      "CONCACAF Nations League Finals",
      "AFC Asian Cup Final"
    ],
    Tennis: [
      "Australian Open",
      "French Open (Roland Garros)",
      "Wimbledon",
      "US Open",
      "ATP Tour Finals",
      "WTA Finals",
      "Indian Wells Masters",
      "Miami Open",
      "Monte-Carlo Masters",
      "Madrid Open",
      "Italian Open",
      "Rogers Cup",
      "Cincinnati Masters",
      "Shanghai Masters",
      "Paris Masters",
      "Fed Cup",
      "Davis Cup",
      "Hopman Cup",
      "Brisbane International",
      "Sydney International",
      "Hobart International",
      "Adelaide International",
      "Kooyong Classic",
      "Mexican Open",
      "Dubai Tennis Championships",
      "Qatar Open",
      "BNP Paribas Open",
      "Miami Open",
      "Volvo Car Open",
      "Porsche Tennis Grand Prix",
      "Mutua Madrid Open",
      "Internazionali BNL d'Italia",
      "Nature Valley Classic (Birmingham)",
      "Eastbourne International",
      "Wimbledon",
      "Swiss Open Gstaad"
    ]
  };

  return {
    type: event,
    event: events[event][randomInt(0, events[event].length)],
    teams: [team(event), team(event)],
    ticketPrice: faker.number.float({ min: 1, max: 100 }),
    stadiumName: wordFromList([
      "Grand Slam Arena",
      "Victory Stadium",
      "Epic Sports Arena",
      "Spectra Stadium",
      "Unity Arena",
      "Champion Park",
      "Dynamic Dome",
      "Ultimate Coliseum",
      "Elevation Field",
      "Pinnacle Arena",
      "Harmony Stadium",
      "Summit Sports Complex",
      "Elite Arena",
      "Majestic Stadium",
      "Apex Pavilion",
      "Unity Center",
      "Triumph Arena",
      "Prime Stadium",
      "Pantheon Park",
      "Vortex Stadium",
      "Ascend Arena",
      "Infinity Field",
      "Legacy Stadium",
      "Sovereign Sports Center",
      "Crown Arena",
      "Panorama Park",
      "Ecliptic Stadium",
      "Momentum Arena",
      "Emperor Field",
      "Rising Sun Stadium",
      "Supreme Sports Complex",
      "Elysium Arena",
      "Summit Park",
      "Legacy Dome",
      "Serenity Stadium",
      "Empire Arena",
      "Harmony Park",
      "Tranquil Pavilion",
      "Legacy Field"
    ]),
    stadiumCapacity: faker.number.int({ min: 100, max: 1000 }),
    broadcastingChannels: randomWordList([
      "ABC",
      "NBC",
      "CBS",
      "FOX",
      "ESPN",
      "BBC",
      "CNN",
      "HBO",
      "MTV",
      "Discovery Channel",
      "National Geographic",
      "Cartoon Network",
      "Disney Channel",
      "History Channel",
      "TNT",
      "TBS",
      "CNBC",
      "Al Jazeera",
      "Sky Sports",
      "Star Sports",
      "MTV",
      "VH1",
      "Comedy Central",
      "Lifetime",
      "Food Network",
      "HGTV",
      "Netflix",
      "Hulu",
      "Amazon Prime Video",
      "Apple TV+",
      "Disney+",
      "BBC One",
      "FOX News",
      "Bravo",
      "A&E",
      "Syfy",
      "National Public Radio (NPR)",
      "The Weather Channel",
      "MTV",
      "E! Entertainment",
      "Travel Channel",
      "Animal Planet",
      "MTV",
      "BBC World News",
      "Sky News",
      "Fox Sports",
      "ESPN2",
      "USA Network",
      "Nickelodeon",
      "MTV",
      "C-SPAN",
      "PBS",
      "TLC"
    ])
  };
};

/** Generate a random night life event. */
const getNightlife = (): Nightlife => {
  return {
    venue: faker.company.name(),
    type: wordFromList([
      "Nightclub",
      "Lounge",
      "Bar",
      "Pub",
      "Karaoke Bar",
      "Wine Bar",
      "Sports Bar",
      "Dance Club",
      "Jazz Club",
      "Comedy Club",
      "Irish Pub",
      "Cocktail Bar",
      "Live Music Venue",
      "Rooftop Bar",
      "Speakeasy",
      "Beer Garden",
      "Hookah Lounge",
      "Casino",
      "Billiards Hall",
      "Brewery",
      "Cabaret",
      "Gastropub",
      "Salsa Club",
      "Piano Bar",
      "Tiki Bar",
      "Country Bar",
      "Electronic Dance Club (EDM)",
      "Latin Club",
      "Rhythm and Blues (R&B) Venue",
      "Reggae Club",
      "Hip Hop Club",
      "Alternative Music Venue",
      "Folk Music Venue",
      "Indie Rock Venue",
      "K-pop Club",
      "Arcade Bar",
      "Themed Nightclub",
      "Upscale Lounge",
      "Dive Bar",
      "Biker Bar",
      "Gay Bar",
      "Lesbian Bar",
      "Craft Cocktail Bar",
      "Late-Night Diner",
      "Outdoor Beer Garden",
      "Soul Music Venue",
      "Funk Club",
      "Discotheque",
      "Tapas Bar",
      "Gin Bar",
      "Vodka Bar",
      "Sake Bar",
      "Whiskey Bar",
      "Rum Bar",
      "Tequila Bar",
      "Cigar Lounge",
      "Kareoke Lounge",
      "Happy Hour Spot",
      "Rave",
      "Electronic Music Festival",
      "After-Hours Club",
      "VIP Club"
    ]),
    openingHours: openingHours(),
    dressCode: wordFromList([
      "Casual Chic",
      "Smart Casual",
      "Cocktail Attire",
      "Business Casual",
      "Dress to Impress",
      "Upscale Casual",
      "Glamorous Evening Wear",
      "Beach Elegant",
      "Creative Black Tie",
      "Vintage Glam",
      "Fashion Forward",
      "Bohemian Chic",
      "Urban Sophistication",
      "Resort Casual",
      "Funky and Eclectic",
      "White Party Attire",
      "High Fashion",
      "Red Carpet Ready",
      "Laid-Back Lounge Wear",
      "Retro Revival",
      "Tropical Vibes",
      "Edgy Street Style",
      "Athleisure Elegance",
      "Formal Funk",
      "Eclectic Mix and Match",
      "City Sleek",
      "Dapper and Dashing",
      "Gothic Glam",
      "Festival Fashion",
      "Island Vibes",
      "Denim and Diamonds",
      "Artistic Expression",
      "Vintage Hollywood Glam",
      "Safari Chic",
      "Rock and Roll Rebel",
      "Boho Beauty",
      "Country Club Casual",
      "Disco Fever Flashback",
      "Preppy and Polished",
      "Chic Safari",
      "Euro Glam",
      "Trendy and Tailored",
      "Modern Minimalism",
      "Classic Hollywood Glam",
      "Grunge Glam",
      "Exotic Elegance",
      "Poolside Chic",
      "Rustic Charm",
      "Chic Lounge Attire",
      "Futuristic Fashion",
      "Wild West Whimsy",
      "Avant-Garde Edge",
      "Island Luxe",
      "Chic Safari",
      "Urban Jungle",
      "Floral Finesse",
      "Neon Nights",
      "Sleek and Sexy",
      "Artsy and Eclectic",
      "Nomadic Elegance",
      "Bohemian Rhapsody",
      "Cruise Chic",
      "Glam Rock",
      "Quirky and Colorful",
      "Riviera Chic",
      "Sophisticated Streetwear",
      "Tropical Glam",
      "Wine Country Casual",
      "Asian Fusion",
      "Retro Futurism",
      "Casual Glam",
      "Tech-Savvy Style",
      "Steampunk Soiree",
      "Glow in the Dark",
      "Whimsical Wonderland"
    ]),
    ageRestriction: faker.number.int({ min: 16, max: 21 }),
    coverCharge: faker.number.float({ min: 1, max: 100 }),
    livePerformances: faker.datatype.boolean(),
    music: randomWordList([
      "Electronic Dance Music (EDM)",
      "Hip-Hop/Rap",
      "Pop",
      "Rock",
      "R&B",
      "Reggae",
      "Latin",
      "Country",
      "Jazz",
      "Blues",
      "Funk",
      "Soul",
      "House",
      "Techno",
      "Trance",
      "Dubstep",
      "Indie",
      "Alternative",
      "Metal",
      "Classical",
      "Disco",
      "Salsa",
      "Bachata",
      "Merengue",
      "K-Pop",
      "Folk",
      "Gospel",
      "Swing",
      "Ambient",
      "Chillout",
      "Reggaeton",
      "Bluegrass",
      "Fusion",
      "Psychedelic",
      "Jungle",
      "Ska",
      "Grime",
      "Hardcore",
      "Country Rock",
      "Fusion Jazz",
      "Trap",
      "Samba",
      "Acoustic",
      "Instrumental",
      "Electropop",
      "Dub",
      "Garage",
      "Big Band",
      "Synthwave",
      "Deep House",
      "Progressive Rock",
      "Nu Disco",
      "Ambient House",
      "Tropical House",
      "Dub Techno",
      "Folk Rock",
      "Trip-Hop",
      "Nu Jazz",
      "Afrobeat",
      "Surf Rock",
      "Rockabilly",
      "Soul Jazz",
      "World Music",
      "Drum and Bass",
      "Hardstyle",
      "Electro Swing",
      "Grunge",
      "Post-Punk",
      "New Wave",
      "Garage Rock",
      "Hard Rock",
      "Punk Rock",
      "Post-Rock",
      "Latin Jazz",
      "Boogie",
      "Future Bass",
      "Trap Soul",
      "Ambient Pop",
      "Post-Disco",
      "Future House",
      "Dream Pop",
      "Minimal Techno",
      "Glitch Hop",
      "Kizomba",
      "Zouk",
      "Electro Pop",
      "Post-Metal",
      "Shoegaze",
      "Vaporwave",
      "Industrial",
      "NeoSoul",
      "New Age",
      "IDM (Intelligent Dance Music)",
      "Post-Hardcore"
    ]),
    drinks: randomWordList([
      "Classic Cocktails",
      "Craft Cocktails",
      "Beer Selections",
      "Wine Varieties",
      "Mocktails",
      "Shots and Shooters",
      "Signature Drinks",
      "Frozen Cocktails",
      "Margaritas",
      "Whiskey and Bourbon",
      "Vodka Creations",
      "Rum Cocktails",
      "Tequila Specials",
      "Gin Mixes",
      "Martini Menu",
      "Champagne and Sparkling",
      "Non-Alcoholic Beverages",
      "Ciders and Coolers",
      "Sours and Fizzes",
      "Tropical Libations",
      "Coffee and Espresso Drinks",
      "Irish Drinks",
      "Sake Selections",
      "Local Favorites",
      "House Specials",
      "Infused Spirits",
      "Refreshing Coolers",
      "Cucumber Coolers",
      "Ginger Infusions",
      "Fruity Blends",
      "Spicy Margaritas",
      "Floral Elixirs",
      "Herb-Infused Cocktails",
      "Citrus Delights",
      "Seasonal Specials",
      "Berry Bliss",
      "Coconut Creations",
      "Tiki Cocktails",
      "Smokey Infusions",
      "Prohibition-era Cocktails",
      "Mexican Mixology",
      "Japanese Highballs",
      "Dessert Cocktails",
      "Candy-Inspired Creations",
      "Bourbon Smash",
      "Heritage Classics",
      "Elevated Gin and Tonics",
      "Modern Mixes",
      "Sparkling Sangrias",
      "Aperitifs and Digestifs",
      "Local Distillery Showcases",
      "Aged Spirits",
      "Eco-Friendly Cocktails",
      "Bespoke Creations",
      "Barrel-Aged Cocktails",
      "Artisanal Spirits",
      "Low-ABV Options"
    ]),
    food: randomWordList([
      "Crispy Chicken Wings",
      "Cheese and Charcuterie Board",
      "Mozzarella Sticks",
      "Loaded Nachos",
      "Sliders (Beef, Chicken, or Veggie)",
      "Spinach Artichoke Dip",
      "Bruschetta",
      "Buffalo Chicken Dip",
      "Quesadillas",
      "Truffle Fries",
      "Spring Rolls",
      "Tacos (Various Fillings)",
      "Shrimp Cocktail",
      "Caprese Skewers",
      "Mini Tacos",
      "Calamari",
      "Hummus Platter",
      "Chicken Satay",
      "Poutine",
      "Garlic Parmesan Fries",
      "Deviled Eggs",
      "Stuffed Jalapeños",
      "Pulled Pork Sliders",
      "Gourmet Pizza Slices",
      "Chips and Salsa",
      "Crab Cakes",
      "Vegetable Spring Rolls",
      "Sushi Rolls",
      "Cheese Quesadillas",
      "Brussels Sprouts with Balsamic Glaze",
      "BBQ Bacon Wrapped Shrimp",
      "Shrimp Tacos",
      "Pita and Dips",
      "Tater Tots",
      "Meatballs",
      "Stuffed Mushrooms",
      "Chicken Tenders",
      "Fried Pickles",
      "BBQ Chicken Flatbread",
      "Mini Corn Dogs",
      "Avocado Toast",
      "Chili Cheese Fries",
      "Edamame",
      "Gourmet Mac and Cheese",
      "Steak Skewers",
      "Garlic Bread",
      "Dumplings",
      "Ceviche",
      "Potato Skins",
      "Cheese Fries",
      "Pulled Chicken Sliders",
      "Onion Rings",
      "Bacon-wrapped Dates",
      "Tuna Tartare",
      "Garlic Knots",
      "Fried Ravioli",
      "Stuffed Bell Peppers"
    ]),
    atmosphere: wordFromList([
      "Energetic Dance Floor",
      "Chill Lounge Vibes",
      "Live Music Intimacy",
      "Rooftop Serenity",
      "Karaoke Fun Zone",
      "Cozy Jazz Corner",
      "EDM Excitement",
      "Hip-Hop Hangout",
      "Salsa and Latin Heat",
      "Casual Pub Comfort",
      "Retro Arcade Nostalgia",
      "Speakeasy Sophistication",
      "Electronic Beats Haven",
      "Rustic Country Bar",
      "Artistic Bohemian Retreat",
      "Cocktail Connoisseur's Den",
      "Beachfront Relaxation",
      "Rustic Tavern Charm",
      "Clubhouse Party Vibes",
      "Swanky Lounge Luxe"
    ])
  };
};

/** Generate a random shopping activity. */
const getShopping = (): Shopping => {
  const storeNames = [
    "Fashion Fusion",
    "Tech Haven",
    "Cosmic Trends",
    "Sole Sensation",
    "Gourmet Delights",
    "Style Symphony",
    "Gadget Galaxy",
    "Vogue Vault",
    "Urban Charm",
    "Electro Elegance",
    "Chic Boutique",
    "Gourmet Glory",
    "Luxe Lane",
    "Dazzle Den",
    "Savor Square",
    "Urban Outfits",
    "Tech Terrace",
    "Glitter Galleria",
    "Foodie Fiesta",
    "Elegance Emporium",
    "Sleek Styles",
    "Smart Select",
    "Gourmet Grove",
    "Trendy Trinkets",
    "Flavor Fusion",
    "Epic Elegance",
    "Gadget Garden",
    "Charm City",
    "Gourmet Gateway",
    "Style Sanctuary",
    "Electro Essence",
    "Trend Trance",
    "Gastronomy Grove",
    "Couture Corner",
    "Tech Treasure",
    "Chic Chicane",
    "Gourmet Galore",
    "Urban Utopia",
    "Vivid Vogue",
    "Taste Trail",
    "Epicurean Enclave"
  ];

  const stores = randomWordList(storeNames);

  const customerReviews = () => {
    const names = [
      "John Doe",
      "Jane Doe",
      "John Smith",
      "Jane Smith",
      "James Smith",
      "James Doe",
      "Michael Smith",
      "Michael Doe",
      "Robert Smith",
      "Robert Doe",
      "William Smith",
      "William Doe",
      "David Smith",
      "David Doe",
      "Richard Smith",
      "Richard Doe",
      "Joseph Smith",
      "Joseph Doe",
      "Thomas Smith",
      "Thomas Doe",
      "Charles Smith",
      "Charles Doe",
      "Christopher Smith",
      "Christopher Doe",
      "Daniel Smith",
      "Daniel Doe",
      "Matthew Smith",
      "Matthew Doe",
      "Anthony Smith",
      "Anthony Doe",
      "Donald Smith",
      "Donald Doe",
      "Mark Smith",
      "Mark Doe",
      "Paul Smith",
      "Paul Doe",
      "Steven Smith",
      "Steven Doe",
      "Andrew Smith",
      "Andrew Doe",
      "Kenneth Smith",
      "Kenneth Doe",
      "Joshua Smith",
      "Joshua Doe",
      "Kevin Smith",
      "Kevin Doe",
      "Brian Smith",
      "Brian Doe",
      "George Smith",
      "George Doe",
      "Edward Smith",
      "Edward Doe",
      "Ronald Smith",
      "Ronald Doe",
      "Timothy Smith",
      "Timothy Doe",
      "Jason Smith",
      "Jason Doe",
      "Jeffrey Smith",
      "Jeffrey Doe",
      "Ryan Smith",
      "Ryan Doe",
      "Jacob Smith",
      "Jacob Doe",
      "Gary Smith",
      "Gary Doe",
      "Nicholas Smith",
      "Nicholas Doe",
      "Eric Smith",
      "Eric Doe",
      "Jonathan Smith",
      "Jonathan Doe",
      "Stephen Smith",
      "Stephen Doe",
      "Larry Smith",
      "Larry Doe",
      "Justin Smith",
      "Justin Doe",
      "Scott Smith",
      "Scott Doe",
      "Brandon Smith",
      "Brandon Doe",
      "Frank Smith",
      "Frank Doe",
      "Benjamin Smith",
      "Benjamin Doe",
      "Gregory Smith",
      "Gregory Doe",
      "Samuel Smith",
      "Samuel Doe",
      "Raymond Smith"
    ];
    const reviews = {} as any;

    for (let i = 0; i < randomInt(1, 20); i++) {
      reviews[names[randomInt(0, names.length)]] = {
        store: stores[randomInt(0, stores.length)],
        rating: faker.number.float({ min: 1, max: 5 }),
        comment: faker.lorem.words()
      };
    }

    return reviews;
  };

  return {
    mall: faker.company.name(),
    stores,
    openingHours: openingHours(),
    salesAndDeals: nameAndRandomDescription([
      "Buy One, Get One Free",
      "Clearance Sale",
      "Flash Sale",
      "Limited-Time Offers",
      "Doorbuster Deals",
      "Discount Bonanza",
      "Seasonal Specials",
      "Bundle and Save",
      "Early Bird Discounts",
      "Weekend Blowout",
      "Midnight Madness Sale",
      "Holiday Extravaganza",
      "Exclusive Online Deals",
      "Student Discounts",
      "Senior Citizen Savings",
      "Cashback Rewards",
      "Refer a Friend Discounts",
      "Loyalty Program Benefits",
      "Daily Deals",
      "Cyber Monday Bargains",
      "Black Friday Spectacular",
      "Warehouse Clearance",
      "Last Chance Savings",
      "BOGO 50% Off",
      "Member-Only Discounts",
      "Anniversary Sale",
      "App-Only Offers",
      "Free Shipping on Orders Over $50",
      "Gift with Purchase",
      "Price Drop Alerts",
      "Email Subscriber Exclusives",
      "VIP Preview Sales",
      "Outlet Store Discounts",
      "Savings Spectacle",
      "Major Markdowns",
      "Bundle Bash",
      "Clearance Countdown",
      "Mega Discounts Marathon",
      "Buy More, Save More",
      "Open-Box Specials",
      "End-of-Season Clearance",
      "New Customer Welcome Discounts",
      "Daily Steals",
      "Online Only Deals",
      "BOGO 30% Off",
      "Reward Points Redemption",
      "Summer Savings Spree",
      "Autumn Harvest Deals",
      "Winter Wonderland Discounts",
      "Spring Fling Savings",
      "Deal of the Day",
      "Extra 20% Off Sale Items",
      "Sizzling Hot Offers",
      "Mobile App Madness",
      "In-Store Exclusive Deals",
      "Frequent Shopper Rewards",
      "Coupon Extravaganza",
      "Secret Sale for Subscribers",
      "Buy Now, Pay Later Options",
      "Digital Download Discounts",
      "Limited Quantity Deals",
      "Apparel Clearance",
      "Tech Tuesday Discounts",
      "Home Essentials Sale",
      "Sports and Outdoor Deals",
      "Beauty Bonanza",
      "Healthy Living Discounts",
      "Entertainment Extravaganza",
      "Travel and Adventure Savings",
      "Pet Paradise Deals",
      "Gourmet Delights Discounts",
      "Kids' Corner Savings",
      "DIY and Home Improvement Offers",
      "Bookworm Bargains",
      "Gaming Galore Discounts",
      "Fashion Forward Sale",
      "Fitness and Wellness Deals",
      "Car Enthusiast Specials",
      "Electronics Expo Discounts"
    ]),
    diningOptions: nameAndRandomDescription([
      "Bistro Bliss",
      "Gourmet Grains",
      "Culinary Canvas",
      "Savory Spice Lounge",
      "The Olive Branch",
      "Flavors of Fusion",
      "Street Food Haven",
      "Pasta Paradise",
      "Ethnic Eats Express",
      "The Grill Spot",
      "Sweet Treats Delight",
      "Healthful Harvest",
      "Brews and Bites",
      "Global Gourmet Hub",
      "Sizzling Sushi Shack",
      "Vegetarian Visions",
      "Mouthwatering Munchies",
      "Deli Delight",
      "Crispy Crust Pizzeria",
      "Fresh and Fast Fare",
      "Wok Wonders",
      "Bakery Bliss",
      "Tasty Tandoor",
      "Seafood Sensations",
      "Grains and Greens Galore",
      "Munchies Corner",
      "The Cheesecake Haven",
      "Smoothie Sanctuary",
      "Juice Joint",
      "Wrap and Roll",
      "Taco Temptations",
      "Noodle Nirvana",
      "Healthy Harvest Bowl",
      "Burger Bistro",
      "Sweet Sensations Bakery",
      "Fruit Fusion",
      "Cheesy Delights",
      "Crepes and Coffee Corner",
      "Sip and Savor Lounge",
      "Bagel Bliss",
      "Candy Carnival",
      "Doughnut Delights",
      "Yogurt Yum",
      "Gelato Grove",
      "Bubble Tea Boutique",
      "Gourmet Gelateria",
      "Chocolate Delights",
      "Dessert Dreamland"
    ]),
    customerReviews: customerReviews(),
    shoppingBudget: faker.number.float({ min: 1, max: 10000 })
  };
};

/** Generate a random spa activity.  */
const getSpa = (): Spa => {
  return {
    spaPackages: nameAndRandomPrice([
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
    ]),
    wellnessClasses: nameAndRandomPrice([
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
    ]),
    services: nameAndRandomPrice([
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
    ]),
    spaRating: faker.number.float({ min: 1, max: 5 }),
    bookingPolicy: faker.lorem.words(),
    openingHours: openingHours()
  };
};

/** Generate a random golf activity.  */
const getGolf = (): Golf => {
  const teeTime = () => {
    const date = faker.date.soon();

    return {
      date,
      time: date.toLocaleTimeString("it-IT"),
      price: faker.number.float({ min: 1, max: 100 })
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
    courseDifficulty: faker.lorem.word(),
    courseDescription: faker.lorem.words(),
    golfLessons: faker.datatype.boolean(),
    golfCartRental: faker.datatype.boolean(),
    golfClubRental: faker.datatype.boolean(),
    teeTimes: teeTimes(),
    holes: holes()
  };
};

/**
 * Generate a random hiking event
 * @param gear - List of gear to choose from
 * @param poi - List of points of interest to choose from
 */
const getHiking = (gear?: string[], poi?: string[]): Hiking => {
  return {
    trail: faker.lorem.words(),
    length: faker.number.int({ min: 1, max: 20 }),
    difficulty: faker.lorem.word(),
    distance: faker.number.float({ min: 1, max: 20 }),
    elevationGain: faker.number.float({ min: 1, max: 20 }),
    startingPoint: faker.location.streetAddress(),
    rating: faker.number.float({ min: 1, max: 5 }),
    recommendedGear: randomWordList(
      gear || [
        "Hiking Boots",
        "Backpack",
        "Trekking Poles",
        "Water Bottle",
        "Weather-Appropriate Clothing",
        "Sunscreen",
        "Hat",
        "Sunglasses",
        "Map and Compass",
        "First Aid Kit",
        "Snacks",
        "Headlamp or Flashlight",
        "Multi-tool or Knife",
        "Emergency Whistle",
        "Rain Gear",
        "Insect Repellent"
      ]
    ),
    pointsOfInterest: randomWordList(
      poi || [
        "Scenic Overlook",
        "Waterfall",
        "Wildflower Meadow",
        "Mountain Summit",
        "Alpine Lake",
        "Cave or Rock Formation",
        "Historical Site",
        "Old Growth Forest",
        "Canyon Viewpoint",
        "Wildlife Observation Spot"
      ]
    ),
    campingOptions: faker.datatype.boolean()
  };
};

/**
 * Generate a random biking event
 */
const getBiking = (): Biking => {
  return {
    ...getHiking(
      [
        "Helmet",
        "Bike",
        "Cycling Shorts",
        "Cycling Jersey",
        "Gloves",
        "Cycling Shoes",
        "Water Bottle and Cage",
        "Sunglasses",
        "Bike Repair Kit",
        "Bike Pump",
        "Multi-tool",
        "Bike Lights",
        "Reflective Gear",
        "Cycling Computer",
        "Bike Lock",
        "Backpack"
      ],
      [
        "Scenic Viewpoint",
        "Mountain Summit",
        "Lake or Reservoir",
        "Historic Landmark",
        "Wildlife Observation Area",
        "Cycling Trailhead",
        "Picnic Spot",
        "Bike-Friendly Cafe",
        "Bike Repair Station",
        "Art Installation or Sculpture"
      ]
    )
  };
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
 * - It is guarenteed the closing date will be in the future but the time is not guarenteed to be in order
 */
const openingHours = () => {
  return `${faker.date.soon().toLocaleTimeString("it-IT")} - ${faker.date
    .future()
    .toLocaleTimeString("it-IT")}`;
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
      time: faker.date.soon().toLocaleTimeString("it-IT"),
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
      time: faker.date.soon().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit"
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
      time: faker.date.soon().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit"
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
      time: faker.date.soon().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit"
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
