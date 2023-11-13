  AquariumModel,
  ConcertModel,
  FlightModel,
  HotelModel,
  MuseumModel,
  ParkModel,
  SportsModel,
  TheatreModel,
  WaterparkModel,
  ZooModel
  Aquarium,
  Concert,
  Flight,
  Hotel,
  Museum,
  Park,
  SportEvents,
  Sports,
  Theatre,
  Waterpark,
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
    Waterpark: WaterparkModel,
    AmusementPark: AmusementParkModel,
    Sports: SportsModel,
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
    case "Hotel":
      return getHotel();
    case "Museum":
      return getMuseum();
    case "Park":
      return getPark();
    case "Sports":
      return getSports(sport!);
    case "Theatre":
      return getTheatre();
    case "Waterpark":
      return getWaterpark();
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
